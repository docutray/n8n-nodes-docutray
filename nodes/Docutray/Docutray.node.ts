import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { Buffer } from 'buffer';
import { docutrayFields, docutrayOperations } from './DocutrayDescription';

export class Docutray implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Docutray',
		name: 'docutray',
		icon: 'file:docutray.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Process documents with Docutray OCR and identification services',
		defaults: {
			name: 'Docutray',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'docutrayApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.docutray.com/api',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Document',
						value: 'document',
					},
				],
				default: 'document',
			},
			...docutrayOperations,
			...docutrayFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const inputMethod = this.getNodeParameter('inputMethod', i) as string;

				let requestOptions: any = {
					method: 'POST',
					url: operation === 'convert' 
						? 'https://app.docutray.com/api/convert' 
						: 'https://app.docutray.com/api/identify',
					headers: {
						'Accept': 'application/json',
					},
				};

				// Handle different input methods with appropriate format
				if (inputMethod === 'binaryData') {
					// Use multipart/form-data for binary files
					const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
					const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);

					// Convert base64 string back to Buffer for proper binary handling
					const buffer = Buffer.from(binaryData.data, 'base64');
					
					const formData: any = {};
					formData.image = {
						value: buffer,
						options: {
							filename: binaryData.fileName || 'document.pdf',
							contentType: binaryData.mimeType,
						},
					};

					// Add operation-specific parameters to form data
					if (operation === 'convert') {
						const documentTypeCode = this.getNodeParameter('documentTypeCode', i) as string;
						formData.document_type_code = documentTypeCode;
					} else if (operation === 'identify') {
						const documentTypeOptionsParam = this.getNodeParameter('documentTypeOptions', i) as any;
						
						// Extract codes from the fixedCollection structure
						let optionsArray: string[] = [];
						if (documentTypeOptionsParam && documentTypeOptionsParam.values) {
							optionsArray = documentTypeOptionsParam.values.map((item: any) => item.code).filter((code: string) => code && code.trim());
						}
						
						// For formData, send as JSON string
						const jsonString = JSON.stringify(optionsArray);
						
						formData.document_type_code_options = jsonString;
						
						// Add image_content_type for identify operation
						formData.image_content_type = binaryData.mimeType;
					}

					// Add optional metadata
					const documentMetadata = this.getNodeParameter('documentMetadata', i, '{}') as string;
					if (documentMetadata && documentMetadata !== '{}') {
						try {
							// Parse and re-stringify to ensure valid JSON
							const parsedMetadata = JSON.parse(documentMetadata);
							const metadataString = JSON.stringify(parsedMetadata);
							formData.document_metadata = metadataString;
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Invalid JSON in document metadata');
						}
					}

					requestOptions.formData = formData;

				} else {
					// Use JSON for Base64 and URL methods
					const requestBody: any = {};

					if (inputMethod === 'base64') {
						const imageBase64 = this.getNodeParameter('imageBase64', i) as string;
						const imageContentType = this.getNodeParameter('imageContentType', i) as string;
						
						requestBody.image_base64 = imageBase64;
						requestBody.image_content_type = imageContentType;
						
					} else if (inputMethod === 'url') {
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;
						requestBody.image_url = imageUrl;
						
						// image_content_type is required for both convert and identify
						const imageContentType = this.getNodeParameter('imageContentType', i, 'application/pdf') as string;
						requestBody.image_content_type = imageContentType;
					}

					// Add common parameters for JSON requests
					if (operation === 'convert') {
						const documentTypeCode = this.getNodeParameter('documentTypeCode', i) as string;
						requestBody.document_type_code = documentTypeCode;
					} else if (operation === 'identify') {
						const documentTypeOptionsParam = this.getNodeParameter('documentTypeOptions', i) as any;
						
						// Extract codes from the fixedCollection structure
						let optionsArray: string[] = [];
						if (documentTypeOptionsParam && documentTypeOptionsParam.values) {
							optionsArray = documentTypeOptionsParam.values.map((item: any) => item.code).filter((code: string) => code && code.trim());
						}
						
						requestBody.document_type_code_options = optionsArray;
					}

					// Add optional metadata for JSON requests
					const documentMetadata = this.getNodeParameter('documentMetadata', i, '{}') as string;
					if (documentMetadata && documentMetadata !== '{}') {
						try {
							requestBody.document_metadata = JSON.parse(documentMetadata);
						} catch (error) {
							throw new NodeOperationError(this.getNode(), 'Invalid JSON in document metadata');
						}
					}

					requestOptions.body = requestBody;
					requestOptions.json = true;
				}

				// Make the API request
				const responseData = await this.helpers.requestWithAuthentication.call(
					this,
					'docutrayApi',
					requestOptions,
				);

				// Try to parse JSON if it's a string
				let parsedResponse = responseData;
				if (typeof responseData === 'string') {
					try {
						parsedResponse = JSON.parse(responseData);
					} catch (parseError) {
						// Keep as string if it fails to parse
						parsedResponse = responseData;
					}
				}

				returnData.push({
					json: parsedResponse,
					pairedItem: {
						item: i,
					},
				});

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}