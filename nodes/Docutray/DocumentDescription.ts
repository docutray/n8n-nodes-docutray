import { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Convert',
				value: 'convert',
				description: 'Extract text from document using OCR',
				action: 'Convert document to text',
				routing: {
					request: {
						method: 'POST',
						url: '/convert',
					},
				},
			},
			{
				name: 'Identify',
				value: 'identify',
				description: 'Identify document type from image',
				action: 'Identify document type',
				routing: {
					request: {
						method: 'POST',
						url: '/identify',
					},
				},
			},
		],
		default: 'convert',
	},
];

const convertOperation: INodeProperties[] = [
	{
		displayName: 'Input Method',
		name: 'inputMethod',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
			},
		},
		options: [
			{
				name: 'Binary Data',
				value: 'binaryData',
				description: 'Use binary data from previous node',
			},
			{
				name: 'Base64',
				value: 'base64',
				description: 'Provide Base64 encoded image',
			},
			{
				name: 'URL',
				value: 'url',
				description: 'Provide image URL',
			},
		],
		default: 'binaryData',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
				inputMethod: ['binaryData'],
			},
		},
		description: 'Name of the binary property which contains the image data',
	},
	{
		displayName: 'Base64 Image',
		name: 'imageBase64',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
				inputMethod: ['base64'],
			},
		},
		default: '',
		description: 'Base64 encoded image data',
	},
	{
		displayName: 'Image URL',
		name: 'imageUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
				inputMethod: ['url'],
			},
		},
		default: '',
		description: 'URL of the image to process',
	},
	{
		displayName: 'Document Type Code Name or ID',
		name: 'documentTypeCode',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDocumentTypes',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
			},
		},
		default: '',
		description: 'Choose from the list or enter a code manually. Choose from the list, or specify a code using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		hint: 'Select a document type from the dropdown or enter its code directly',
		placeholder: 'Select document type or enter code',
	},
	{
		displayName: 'Image Content Type',
		name: 'imageContentType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
				inputMethod: ['base64', 'url'],
			},
		},
		options: [
			{
				name: 'BMP',
				value: 'image/bmp',
			},
			{
				name: 'GIF',
				value: 'image/gif',
			},
			{
				name: 'JPEG',
				value: 'image/jpeg',
			},
			{
				name: 'PDF',
				value: 'application/pdf',
			},
			{
				name: 'PNG',
				value: 'image/png',
			},
			{
				name: 'WebP',
				value: 'image/webp',
			},
		],
		default: 'image/jpeg',
		description: 'Content type of the image',
	},
	{
		displayName: 'Document Metadata',
		name: 'documentMetadata',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
			},
		},
		default: '{}',
		description: 'Additional metadata for the document (JSON format)',
	},
];

const identifyOperation: INodeProperties[] = [
	{
		displayName: 'Input Method',
		name: 'inputMethod',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
			},
		},
		options: [
			{
				name: 'Binary Data',
				value: 'binaryData',
				description: 'Use binary data from previous node',
			},
			{
				name: 'Base64',
				value: 'base64',
				description: 'Provide Base64 encoded image',
			},
			{
				name: 'URL',
				value: 'url',
				description: 'Provide image URL',
			},
		],
		default: 'binaryData',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
				inputMethod: ['binaryData'],
			},
		},
		description: 'Name of the binary property which contains the image data',
	},
	{
		displayName: 'Base64 Image',
		name: 'imageBase64',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
				inputMethod: ['base64'],
			},
		},
		default: '',
		description: 'Base64 encoded image data',
	},
	{
		displayName: 'Image URL',
		name: 'imageUrl',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
				inputMethod: ['url'],
			},
		},
		default: '',
		description: 'URL of the image to process',
	},
	{
		displayName: 'Document Type Codes',
		name: 'documentTypeCodes',
		type: 'multiOptions',
		typeOptions: {
			loadOptionsMethod: 'getDocumentTypes',
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
			},
		},
		default: [],
		description: 'Choose from the list or enter codes manually. Choose from the list, or specify codes using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
		hint: 'Select one or more document types from the dropdown or enter codes directly',
		placeholder: 'Select document types or enter codes',
	},
	{
		displayName: 'Image Content Type',
		name: 'imageContentType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
				inputMethod: ['base64', 'url'],
			},
		},
		options: [
			{
				name: 'BMP',
				value: 'image/bmp',
			},
			{
				name: 'GIF',
				value: 'image/gif',
			},
			{
				name: 'JPEG',
				value: 'image/jpeg',
			},
			{
				name: 'PDF',
				value: 'application/pdf',
			},
			{
				name: 'PNG',
				value: 'image/png',
			},
			{
				name: 'WebP',
				value: 'image/webp',
			},
		],
		default: 'image/jpeg',
		description: 'Content type of the image',
	},
	{
		displayName: 'Document Metadata',
		name: 'documentMetadata',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
			},
		},
		default: '{}',
		description: 'Additional metadata for the document (JSON format)',
	},
];

export const documentFields: INodeProperties[] = [...convertOperation, ...identifyOperation];
