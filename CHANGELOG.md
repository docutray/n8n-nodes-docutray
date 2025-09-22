# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-09-22

### Added
- **Docutray Knowledge Base Node**: New independent node for RAG-based semantic search
  - Search within knowledge bases using natural language queries
  - Configurable similarity threshold (0-1, default: 0.7)
  - Adjustable result limits (1-50, default: 10)
  - Optional metadata inclusion in search results
  - Support for knowledge base ID specification
- Updated documentation with separate node sections
- Added new keywords: knowledge-base, rag, semantic-search

### Changed
- **BREAKING**: Refactored architecture into two specialized nodes
  - **Docutray**: Focused on document processing (Convert/Identify operations)
  - **Docutray Knowledge Base**: Dedicated to knowledge base search operations
- Updated package.json to register both nodes
- Enhanced documentation structure for multi-node architecture
- Improved separation of concerns following n8n best practices

## [0.1.0] - 2025-09-22

### Added
- Initial release of n8n-nodes-docutray
- **Convert Operation**: OCR text extraction from documents
  - Support for multiple input methods: binary data, Base64, and URL
  - Wide format support: JPEG, PNG, GIF, BMP, WebP, PDF (up to 100MB)
  - Document type code specification
  - Optional document metadata support
- **Identify Operation**: Document type identification
  - Multiple document type options support
  - Confidence scores for identification results
  - Alternative document type suggestions
- DocutrayApi credentials for Bearer token authentication
- Comprehensive documentation and usage examples
- TypeScript implementation following n8n community node standards