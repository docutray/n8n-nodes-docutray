# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-09-22

### Added
- **Knowledge Base Search**: RAG-based semantic search functionality
  - Natural language query support within knowledge bases
  - Configurable similarity threshold (0-1, default: 0.7)
  - Adjustable result limits (1-50, default: 50)
  - Optional metadata inclusion in search results
- **Dynamic Knowledge Base Selector**: Interactive dropdown for knowledge base selection
  - Displays knowledge base name, description, and document count
  - Automatic loading of available knowledge bases
  - Fallback to manual ID entry if API is unavailable
- **Unified Node Architecture**: Resource-based organization following Slack node pattern
  - Document Resource: Convert and Identify operations
  - Knowledge Base Resource: Search operation
  - Enhanced user experience with resource selector
- **Modular Description Files**: Organized code structure
  - `DocumentDescription.ts` for document operations
  - `KnowledgeBaseDescription.ts` for knowledge base operations
  - `DocutrayDescription.ts` as main combiner
- Enhanced subtitle display showing "Resource - Operation" format
- Added new keywords: knowledge-base, rag, semantic-search

### Changed
- Enhanced documentation for unified architecture
- Updated default limits for better performance (default: 50 results)
- Improved code organization with modular description files

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