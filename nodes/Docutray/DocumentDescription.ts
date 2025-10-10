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
		displayName: 'Document Type Code',
		name: 'documentTypeCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['convert'],
			},
		},
		default: '',
		description: 'Document type code to specify the expected document format',
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
		displayName: 'Document Type Options',
		name: 'documentTypeOptions',
		type: 'fixedCollection',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['identify'],
			},
		},
		default: { values: [] },
		description: 'List of possible document type codes',
		options: [
			{
				name: 'values',
				displayName: 'Document Types',
				values: [
					{
						displayName: 'Document Type Code',
						name: 'code',
						type: 'string',
						default: '',
						required: true,
						description: 'Document type code (e.g., cartola_cc, cartola_tc)',
						placeholder: 'cartola_cc',
					},
				],
			},
		],
		typeOptions: {
			multipleValues: true,
		},
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
