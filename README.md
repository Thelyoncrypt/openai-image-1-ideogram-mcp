# OpenAI Image 1 Ideogram MCP

![MCP Banner](./MCP%20BANNER.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@lyoncrypt/openai-image-1-ideogram-mcp.svg)](https://www.npmjs.com/package/@lyoncrypt/openai-image-1-ideogram-mcp)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![GitHub Issues](https://img.shields.io/github/issues/Thelyoncrypt/openai-image-1-ideogram-mcp.svg)](https://github.com/Thelyoncrypt/openai-image-1-ideogram-mcp/issues)

## Overview

**OpenAI Image 1 Ideogram MCP** is an enterprise-grade Model Context Protocol (MCP) server that provides seamless integration with Ideogram's v3.0 API. This professional-grade solution enables advanced AI image generation capabilities with sophisticated style control, rendering optimization, and enhanced quality output for production environments.

Built with TypeScript and modern development practices, this MCP server offers robust error handling, comprehensive validation, and enterprise-ready features for organizations requiring reliable AI image generation services.

## Model Context Protocol (MCP) Integration

This server implements the **Model Context Protocol (MCP)** standard, enabling seamless integration with AI assistants and applications. MCP provides a standardized way for AI models to access external tools and services, making this Ideogram integration immediately compatible with:

- **Claude Desktop**: Direct integration through MCP configuration
- **Custom AI Applications**: Any MCP-compatible client
- **Development Environments**: Local and cloud-based AI development setups
- **Enterprise AI Platforms**: Scalable deployment across organizations

The MCP architecture ensures secure, reliable, and standardized communication between AI models and the Ideogram v3.0 API, providing enterprise-grade image generation capabilities with professional oversight and control.

## 📚 Complete Documentation Suite

This repository includes comprehensive documentation for setting up AI-powered development environments:

**🚀 [Complete Installation & Setup Guide](./docs/README.md)**

### Quick Links

- **[Agent Zero Installation](./docs/installation-guides/agent-zero.md)** - Docker-based AI development platform
- **[Cursor IDE Setup](./docs/installation-guides/cursor-ide.md)** - AI-powered code editor
- **[Windsurf IDE Installation](./docs/installation-guides/windsurf-ide.md)** - First agentic IDE
- **[Claude Desktop Setup](./docs/installation-guides/claude-desktop.md)** - MCP integration guide
- **[Augment Code Platform](./docs/installation-guides/augment-code.md)** - Advanced AI coding assistant
- **[MCP Configuration Guide](./docs/configuration/mcp-setup.md)** - Model Context Protocol setup
- **[API Keys Management](./docs/configuration/api-keys.md)** - Secure authentication setup
- **[Troubleshooting Guide](./docs/troubleshooting/installation-issues.md)** - Common issues and solutions

## Core Features

### Advanced Image Generation
- **Ideogram v3.0 Integration**: Full support for the latest Ideogram API with enhanced capabilities
- **Style Reference System**: Upload up to 3 reference images or utilize 8-character hexadecimal style codes
- **Rendering Optimization**: Configurable rendering speeds (TURBO, DEFAULT, QUALITY) for performance tuning
- **Enhanced Realism**: State-of-the-art photorealistic image generation with superior quality
- **Professional Graphics**: Enterprise-grade text rendering and creative design capabilities
- **Magic Prompt Enhancement**: AI-powered prompt optimization for improved results

### Production-Ready Capabilities
- **Batch Processing**: Generate 1-8 images per request for efficient workflows
- **Flexible Aspect Ratios**: Support for 15 standard aspect ratios including 1x1, 16x9, 4x3, and more
- **Resolution Control**: Access to 69+ resolution options for diverse output requirements
- **Style Management**: Advanced style code system with access to 4.3 billion preset styles
- **Content Filtering**: Negative prompt support for precise content exclusion
- **Reproducible Generation**: Seed-based control for consistent and repeatable results

## Installation & Setup

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Latest stable version
- **Ideogram API Key**: Obtain from [Ideogram API Management](https://ideogram.ai/manage-api)

### Package Installation

Install the package via npm:

```bash
npm install @lyoncrypt/openai-image-1-ideogram-mcp
```

### Claude Desktop Integration

Configure your Claude Desktop MCP settings by adding the following to your configuration file:

```json
{
  "mcpServers": {
    "openai-image-1-ideogram": {
      "command": "npx",
      "args": [
        "@lyoncrypt/openai-image-1-ideogram-mcp"
      ],
      "env": {
        "IDEOGRAM_API_KEY": "your_ideogram_api_key_here"
      }
    }
  }
}
```

### Environment Configuration

Set up your environment variables:

```bash
# Required: Ideogram API Key
export IDEOGRAM_API_KEY="your_ideogram_api_key"

# Optional: Custom output directory
export OUTPUT_DIR="./generated-images"

# Optional: Default filename prefix
export BASE_FILENAME="ai-generated-image"
```

## API Reference

### `generate_image`

The primary tool for generating high-quality images using Ideogram's v3.0 API with comprehensive parameter control.

#### Method Signature

```typescript
generate_image(parameters: GenerateImageParams): Promise<GenerationResult>
```

#### Parameters

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
| `prompt` | `string` | Primary image generation prompt (English recommended) | ✅ | - |
| `aspect_ratio` | `AspectRatio` | Image aspect ratio from supported options | ❌ | `1x1` |
| `resolution` | `string` | Specific resolution (see supported resolutions) | ❌ | Auto |
| `seed` | `integer` | Deterministic seed for reproducible results (0-2147483647) | ❌ | Random |
| `magic_prompt` | `MagicPrompt` | AI prompt enhancement: `AUTO`\|`ON`\|`OFF` | ❌ | `AUTO` |
| `rendering_speed` | `RenderingSpeed` | Quality vs speed: `TURBO`\|`DEFAULT`\|`QUALITY` | ❌ | `DEFAULT` |
| `style_codes` | `string[]` | Array of 8-character hexadecimal style codes | ❌ | `[]` |
| `style_type` | `StyleType` | Style category: `AUTO`\|`GENERAL`\|`REALISTIC`\|`DESIGN` | ❌ | `AUTO` |
| `style_reference` | `StyleReference` | Advanced style reference configuration | ❌ | `null` |
| `negative_prompt` | `string` | Content exclusion specifications | ❌ | `""` |
| `num_images` | `integer` | Batch size for generation (1-8) | ❌ | `1` |
| `output_dir` | `string` | Local storage directory path | ❌ | `"docs"` |
| `base_filename` | `string` | File naming prefix | ❌ | `"ideogram-image"` |
| `blur_mask` | `boolean` | Apply artistic edge blur effect | ❌ | `false` |

#### Style Reference Object

```typescript
{
  urls?: string[];        // Up to 3 reference image URLs
  style_code?: string;    // 8-character style code
  random_style?: boolean; // Use random style from library
}
```

## Implementation Examples

### Basic Image Generation

Standard image generation with quality optimization:

```json
{
  "prompt": "Professional corporate office environment with modern design elements",
  "aspect_ratio": "16x9",
  "rendering_speed": "QUALITY",
  "style_type": "REALISTIC"
}
```

### Advanced Style Reference Implementation

Utilizing style references for brand consistency:

```json
{
  "prompt": "Modern minimalist logo design for technology company",
  "style_reference": {
    "urls": ["https://example.com/brand-reference.jpg"],
    "random_style": false
  },
  "style_type": "DESIGN",
  "num_images": 4,
  "negative_prompt": "cluttered, busy, complex"
}
```

### Enterprise Batch Processing

High-volume generation with reproducible results:

```json
{
  "prompt": "Professional product photography for e-commerce catalog",
  "rendering_speed": "QUALITY",
  "style_type": "REALISTIC",
  "negative_prompt": "blurry, low resolution, amateur",
  "seed": 12345,
  "num_images": 8,
  "aspect_ratio": "1x1"
}
```

### Creative Design Workflow

Advanced creative generation with style codes:

```json
{
  "prompt": "Artistic poster design with typography and geometric elements",
  "style_codes": ["A1B2C3D4", "E5F6G7H8"],
  "style_type": "DESIGN",
  "magic_prompt": "ON",
  "rendering_speed": "QUALITY",
  "blur_mask": true
}
```

## Development Guide

### Development Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **TypeScript**: Version 5.0.0 or higher
- **Git**: Latest stable version
- **Ideogram API Key**: Valid API credentials

### Local Development Setup

Clone and configure the development environment:

```bash
git clone https://github.com/Thelyoncrypt/openai-image-1-ideogram-mcp.git
cd openai-image-1-ideogram-mcp
npm install
cp .env.example .env
# Configure your API key in .env file
```

### Build Process

Compile TypeScript to JavaScript:

```bash
npm run build
```

### Development Workflow

Enable watch mode for continuous compilation:

```bash
npm run watch
```

### Quality Assurance

Run the complete test suite:

```bash
npm test
npm run lint
```

## Project Architecture

```text
openai-image-1-ideogram-mcp/
├── src/                          # Source code directory
│   ├── types/
│   │   └── ideogram.ts          # TypeScript type definitions
│   ├── tools/
│   │   └── generate-image.ts    # Core image generation tool
│   ├── utils/
│   │   └── validation.ts        # Input validation utilities
│   ├── ideogram-client.ts       # Ideogram API client implementation
│   ├── server.ts               # MCP server configuration
│   └── index.ts                # Application entry point
├── dist/                        # Compiled JavaScript output
├── docs/                        # Generated images storage
├── package.json                 # Package configuration
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment template
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT license
├── CHANGELOG.md               # Version history
└── README.md                  # Project documentation
```

## Configuration Reference

### Supported Aspect Ratios

| Category | Ratios | Use Cases |
|----------|--------|-----------|
| **Square** | `1x1` | Social media posts, avatars, logos |
| **Landscape** | `16x9`, `4x3`, `21x9`, `3x2`, `5x4`, `3x1`, `2x1` | Presentations, banners, headers |
| **Portrait** | `9x16`, `3x4`, `9x21`, `2x3`, `4x5`, `1x3`, `1x2` | Mobile content, posters, stories |

### Rendering Performance Options

| Speed | Quality | Use Case | Typical Generation Time |
|-------|---------|----------|------------------------|
| **TURBO** | Good | Rapid prototyping, previews | ~5-10 seconds |
| **DEFAULT** | High | Standard production use | ~15-30 seconds |
| **QUALITY** | Premium | Final deliverables, print | ~30-60 seconds |

### Style Type Categories

- **AUTO**: Intelligent style selection based on prompt content
- **GENERAL**: Versatile style suitable for most applications
- **REALISTIC**: Photorealistic rendering for authentic imagery
- **DESIGN**: Optimized for graphics, logos, and creative designs

## Contributing

We welcome contributions from the community. Please follow our contribution guidelines:

### Development Process

1. **Fork** the repository to your GitHub account
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Implement** your changes with appropriate tests
5. **Commit** your changes (`git commit -m 'Add amazing feature'`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Submit** a Pull Request with detailed description

### Code Standards

- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use conventional commit messages
- Update documentation for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for complete details.

## Resources & Documentation

- **[Ideogram v3.0 API Documentation](https://developer.ideogram.ai/api-reference/api-reference/generate-v3)**
- **[Model Context Protocol Specification](https://modelcontextprotocol.io/)**
- **[Claude Desktop Integration Guide](https://claude.ai/desktop)**
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)**

## Release Notes

### Version 1.0.0 - Initial Release

**New Features:**
- Complete Ideogram v3.0 API integration
- Advanced style reference system with image upload support
- Configurable rendering speed optimization
- Enterprise-grade error handling and validation
- Professional TypeScript implementation with full type safety
- Comprehensive MCP server with robust tool definitions

**Technical Improvements:**
- Modern ES2022 TypeScript architecture
- Axios-based HTTP client with retry logic
- Comprehensive input validation and sanitization
- Modular design with separation of concerns
- Production-ready logging and monitoring hooks

---

**Developed by [Lyoncrypt](https://github.com/Thelyoncrypt)** | **Powered by Ideogram v3.0 API**
