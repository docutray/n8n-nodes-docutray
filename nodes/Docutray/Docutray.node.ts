import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';
import { docutrayFields, docutrayOperations, resourceSelector } from './DocutrayDescription';

export class Docutray implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Docutray',
		name: 'docutray',
		icon: 'file:docutray.svg',
		group: ['transform'],
		version: [1],
		defaultVersion: 1,
		subtitle: '={{$parameter["resource"]}} - {{$parameter["operation"]}}',
		description: 'Process documents and search knowledge bases with Docutray services',
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
		properties: [resourceSelector, ...docutrayOperations, ...docutrayFields],
	};

	methods = {
		loadOptions: {
			async getKnowledgeBases(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const returnData: INodePropertyOptions[] = [];

				try {
					const requestOptions = {
						method: 'GET' as const,
						url: 'https://app.docutray.com/api/knowledge-bases',
						headers: {
							Accept: 'application/json',
						},
						qs: {
							isActive: true,
							limit: 100,
						},
						json: true,
					};

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'docutrayApi',
						requestOptions,
					);

					const knowledgeBases = response.data || [];

					for (const kb of knowledgeBases) {
						const name = kb.name || kb.id;
						const description = kb.description ? ` - ${kb.description}` : '';
						const docCount = kb.documentCount ? ` (${kb.documentCount} docs)` : '';

						returnData.push({
							name: `${name}${description}${docCount}`,
							value: kb.id,
						});
					}

					returnData.sort((a, b) => a.name.localeCompare(b.name));
				} catch (error) {
					// Silently fail to allow manual input fallback
				}

				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				if (resource === 'knowledgeBase') {
					// Handle knowledge base search operation
					if (operation === 'search') {
						const knowledgeBaseId = this.getNodeParameter('knowledgeBaseId', i) as string;
						const query = this.getNodeParameter('query', i) as string;
						const limit = this.getNodeParameter('limit', i, 10) as number;
						const similarityThreshold = this.getNodeParameter(
							'similarityThreshold',
							i,
							0.7,
						) as number;
						const includeMetadata = this.getNodeParameter('includeMetadata', i, true) as boolean;

						const requestOptions: any = {
							method: 'POST',
							url: `https://app.docutray.com/api/knowledge-bases/${knowledgeBaseId}/search`,
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							body: {
								query,
								limit,
								similarityThreshold,
								includeMetadata,
							},
							json: true,
						};

						const responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'docutrayApi',
							requestOptions,
						);

						let parsedResponse = responseData;
						if (typeof responseData === 'string') {
							try {
								parsedResponse = JSON.parse(responseData);
							} catch (parseError) {
								parsedResponse = responseData;
							}
						}

						returnData.push({
							json: parsedResponse,
							pairedItem: {
								item: i,
							},
						});
					}
				} else if (resource === 'document') {
					// Handle document operations (convert/identify)
					const inputMethod = this.getNodeParameter('inputMethod', i) as string;

					const requestOptions: any = {
						method: 'POST',
						url:
							operation === 'convert'
								? 'https://app.docutray.com/api/convert'
								: 'https://app.docutray.com/api/identify',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
					};

					const requestBody: any = {};

					// Handle all input methods using JSON format
					if (inputMethod === 'binaryData') {
						// Binary data: convert to base64 and send as JSON
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);

						// Binary data in n8n is already stored as base64
						requestBody.image_base64 = binaryData.data;
						requestBody.image_content_type = binaryData.mimeType;
					} else if (inputMethod === 'base64') {
						const imageBase64 = this.getNodeParameter('imageBase64', i) as string;
						const imageContentType = this.getNodeParameter('imageContentType', i) as string;

						requestBody.image_base64 = imageBase64;
						requestBody.image_content_type = imageContentType;
					} else if (inputMethod === 'url') {
						const imageUrl = this.getNodeParameter('imageUrl', i) as string;
						requestBody.image_url = imageUrl;

						const imageContentType = this.getNodeParameter(
							'imageContentType',
							i,
							'application/pdf',
						) as string;
						requestBody.image_content_type = imageContentType;
					}

					// Add operation-specific parameters
					if (operation === 'convert') {
						const documentTypeCode = this.getNodeParameter('documentTypeCode', i) as string;
						requestBody.document_type_code = documentTypeCode;
					} else if (operation === 'identify') {
						const documentTypeOptionsParam = this.getNodeParameter('documentTypeOptions', i) as any;

						let optionsArray: string[] = [];
						if (documentTypeOptionsParam && documentTypeOptionsParam.values) {
							optionsArray = documentTypeOptionsParam.values
								.map((item: any) => item.code)
								.filter((code: string) => code && code.trim());
						}

						requestBody.document_type_code_options = optionsArray;
					}

					// Add document metadata if provided
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

					const responseData = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'docutrayApi',
						requestOptions,
					);

					let parsedResponse = responseData;
					if (typeof responseData === 'string') {
						try {
							parsedResponse = JSON.parse(responseData);
						} catch (parseError) {
							parsedResponse = responseData;
						}
					}

					returnData.push({
						json: parsedResponse,
						pairedItem: {
							item: i,
						},
					});
				}
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
