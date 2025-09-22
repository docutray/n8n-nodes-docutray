import { INodeProperties } from 'n8n-workflow';

export const docutrayKnowledgeBaseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Search',
				value: 'search',
				description: 'Search knowledge base using RAG',
				action: 'Search knowledge base',
				routing: {
					request: {
						method: 'POST',
					},
				},
			},
		],
		default: 'search',
	},
];

export const docutrayKnowledgeBaseFields: INodeProperties[] = [
	{
		displayName: 'Knowledge Base ID',
		name: 'knowledgeBaseId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: '',
		description: 'Unique identifier of the knowledge base to search',
		placeholder: 'kb_abc123',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: '',
		description: 'Search query for the knowledge base (max 1000 characters)',
		placeholder: '¿Cómo configurar el sistema de autenticación?',
		typeOptions: {
			maxLength: 1000,
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Similarity Threshold',
		name: 'similarityThreshold',
		type: 'number',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: 0.7,
		description: 'Minimum similarity threshold for results (0-1)',
		typeOptions: {
			minValue: 0,
			maxValue: 1,
			numberStepSize: 0.01,
		},
	},
	{
		displayName: 'Include Metadata',
		name: 'includeMetadata',
		type: 'boolean',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: true,
		description: 'Whether to include metadata in search results',
	},
];