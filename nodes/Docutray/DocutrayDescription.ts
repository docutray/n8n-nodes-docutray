import { INodeProperties } from 'n8n-workflow';
import { documentOperations, documentFields } from './DocumentDescription';
import { knowledgeBaseOperations, knowledgeBaseFields } from './KnowledgeBaseDescription';

export const resourceSelector: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Document',
			value: 'document',
			description: 'Process documents with OCR and identification',
		},
		{
			name: 'Knowledge Base',
			value: 'knowledgeBase',
			description: 'Search knowledge bases using RAG technology',
		},
	],
	default: 'document',
};

export const docutrayOperations: INodeProperties[] = [
	...documentOperations,
	...knowledgeBaseOperations,
];

export const docutrayFields: INodeProperties[] = [
	...documentFields,
	...knowledgeBaseFields,
];