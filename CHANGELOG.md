# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.2] - 2025-10-20

### Changed
- Remove unnecessary @types/node from devDependencies (types provided by n8n-workflow peer dependency)

## [0.5.1] - 2025-10-13

### Changed
- Update Convert operation action label from "Convert document to text" to "Convert document to JSON" for accuracy

## [0.5.0] - 2025-10-10

### Added
- **Dynamic Document Type Selector**: API-powered dropdowns for document type selection
  - New `getDocumentTypes()` loadOptions method fetches available document types from `/api/document-types`
  - Convert operation: Single-select dropdown for `documentTypeCode` (replaces manual text input)
  - Identify operation: Multi-select dropdown for `documentTypeCodes` (replaces fixedCollection)
  - Displays only document type name for cleaner UX (codeType used as value)
  - Fetches all document types without filters (public, private, draft, published)
  - Maintains backward compatibility with manual code entry
  - Follows same pattern as existing Knowledge Base selector

### Changed
- Simplified execute method logic for Identify operation to handle multiOptions format
- Enhanced field descriptions with hints for better user guidance

## [0.4.4] - 2025-10-10

### Changed
- Refactor binary data uploads to use JSON/base64 format instead of multipart/form-data
- Eliminate external `form-data` library dependency (passes n8n Cloud verification)
- Unify all input methods (binaryData, base64, url) to use consistent JSON format
- Simplify codebase: 380 lines → 263 lines (-117 lines)

## [0.4.3] - 2025-10-10

### Fixed
- **Binary Data Upload Error**: Resolved HTTP 415 "Content-Type not supported" error for binary file uploads
  - Implemented workaround for n8n issue #18271 where `httpRequestWithAuthentication` doesn't properly handle multipart/form-data
  - Manually construct FormData using `form-data` library with `httpRequest` and manual authentication
  - Convert base64 to Buffer before sending binary data
  - Remove incorrect `image_content_type` field from binary uploads (only valid for JSON requests)
  - Add explicit `Content-Type: application/json` header for base64/URL methods

### Added
- **n8n Development Documentation**: Comprehensive reference guide to n8n DeepWiki (https://deepwiki.com/n8n-io/n8n)
  - Quick reference index for Core Architecture, Node Development, Helper Methods, Authentication
  - Known Issues & Workarounds section documenting n8n issue #18271
  - Guidelines for when to consult DeepWiki resources
- **Local Development Workflow**: Step-by-step guide for local development
  - npm link setup for testing nodes locally
  - Watch mode compilation with `npm run dev`
  - n8n dev environment configuration with `N8N_DEV_RELOAD` and `N8N_LOG_LEVEL`

### Changed
- Code formatting improvements with Prettier
- Removed unused README_TEMPLATE.md file
- Synced package-lock.json with version 0.4.3

## [0.4.2] - 2025-10-08

### Fixed
- Replace deprecated `requestWithAuthentication` method with `httpRequestWithAuthentication`

## [0.4.1] - 2025-10-06

### Fixed
- Corrected package-lock.json version to match package.json version

## [0.4.0] - 2025-09-24

### Added
- n8n verification scanner tool to development workflow

### Changed
- Optimized SVG logo file size (42% reduction)

### Fixed
- Removed unwanted "Custom API Call" option from resource selector

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