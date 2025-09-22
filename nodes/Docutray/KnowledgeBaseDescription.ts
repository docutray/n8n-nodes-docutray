import { INodeProperties } from 'n8n-workflow';

export const knowledgeBaseOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
			},
		},
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

export const knowledgeBaseFields: INodeProperties[] = [
	{
		displayName: 'Knowledge Base Name or ID',
		name: 'knowledgeBaseId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getKnowledgeBases',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
				operation: ['search'],
			},
		},
		default: '',
		description: 'Choose from the list or enter an ID manually. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		hint: 'Select a knowledge base from the dropdown or enter its ID directly',
		placeholder: 'Select knowledge base or enter ID',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['knowledgeBase'],
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
				resource: ['knowledgeBase'],
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
				resource: ['knowledgeBase'],
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
				resource: ['knowledgeBase'],
				operation: ['search'],
			},
		},
		default: true,
		description: 'Whether to include metadata in search results',
	},
];