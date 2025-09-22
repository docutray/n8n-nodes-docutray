import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';
import { docutrayKnowledgeBaseFields, docutrayKnowledgeBaseOperations } from './DocutrayKnowledgeBaseDescription';

export class DocutrayKnowledgeBase implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Docutray Knowledge Base',
		name: 'docutrayKnowledgeBase',
		icon: 'file:docutray-kb.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Search knowledge bases using RAG technology with Docutray',
		defaults: {
			name: 'Docutray Knowledge Base',
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
			...docutrayKnowledgeBaseOperations,
			...docutrayKnowledgeBaseFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				if (operation === 'search') {
					const knowledgeBaseId = this.getNodeParameter('knowledgeBaseId', i) as string;
					const query = this.getNodeParameter('query', i) as string;
					const limit = this.getNodeParameter('limit', i, 10) as number;
					const similarityThreshold = this.getNodeParameter('similarityThreshold', i, 0.7) as number;
					const includeMetadata = this.getNodeParameter('includeMetadata', i, true) as boolean;

					const requestOptions: any = {
						method: 'POST',
						url: `https://app.docutray.com/api/knowledge/bases/${knowledgeBaseId}/search`,
						headers: {
							'Accept': 'application/json',
						},
						body: {
							query,
							limit,
							similarityThreshold,
							includeMetadata,
						},
						json: true,
					};

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