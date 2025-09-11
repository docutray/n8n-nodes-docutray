# n8n-nodes-docutray

This is an n8n community node that provides seamless integration with [Docutray](https://docutray.com/), a powerful document processing and OCR service. It enables you to automate document text extraction and identification workflows directly within your n8n automations.

## Features

- **Document OCR**: Extract text from images and PDFs using advanced OCR technology
- **Document Type Identification**: Automatically identify document types with confidence scores
- **Multiple Input Methods**: Support for file uploads, Base64 encoded images, and image URLs
- **Wide Format Support**: JPEG, PNG, GIF, BMP, WebP, and PDF files (up to 100MB)

## Installation

Follow the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) to install this package in your n8n instance.

## Credentials

To use this node, you'll need a Docutray API key:

1. Sign up for a [Docutray account](https://docutray.com/)
2. Navigate to your API settings in the dashboard
3. Generate an API key
4. Configure the "Docutray API" credentials in n8n with your API key

## Available Operations

### Convert Operation
Extract text from documents using OCR technology.

**Supported Methods:**
- Upload file directly
- Provide Base64 encoded image
- Specify image URL for automatic download

**Parameters:**
- Document type code (required)
- Image content type (optional)
- Document metadata (optional)

### Identify Operation
Automatically identify document types from a list of options.

**Supported Methods:**
- Upload file directly
- Provide Base64 encoded image
- Specify image URL for automatic download

**Parameters:**
- Document type code options (array of possible document types)
- Document metadata (optional)

**Response includes:**
- Primary document type with confidence score
- Alternative document type suggestions

## Compatibility

This node has been tested with n8n version 1.94.0 and newer.

## Resources

- [Docutray API Documentation](https://docs.docutray.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Docutray Website](https://docutray.com/)

## License

[MIT](LICENSE.md)
