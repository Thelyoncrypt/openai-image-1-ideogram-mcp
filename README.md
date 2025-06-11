# 🎨 Ideogram MCP Server v3.0

[![GitHub](https://img.shields.io/github/license/Thelyoncrypt/ideogram-mcp-server-v3)](https://github.com/Thelyoncrypt/ideogram-mcp-server-v3/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/@sunwood-ai-labs/ideogram-mcp-server-v3)](https://www.npmjs.com/package/@sunwood-ai-labs/ideogram-mcp-server-v3)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A Model Context Protocol (MCP) server for **Ideogram v3.0 API** with advanced features including Style References, Rendering Speed Control, and Enhanced Quality generation.

## ✨ Features

### 🚀 Ideogram v3.0 Support
- **Style References**: Upload up to 3 reference images or use style codes
- **Rendering Speed**: Choose between TURBO, DEFAULT, or QUALITY
- **Enhanced Realism**: Stunning photorealistic image generation
- **Creative Designs**: Professional-quality graphics and text rendering
- **Magic Prompt**: AI-enhanced prompt optimization

### 🎯 Key Capabilities
- Generate 1-8 images per request
- 15 aspect ratios (1x1, 16x9, 4x3, etc.)
- 69+ resolution options
- Style codes and random style selection
- Negative prompts for exclusions
- Seed control for reproducible results

## 🚀 Quick Start

### Installation

```bash
npm install @sunwood-ai-labs/ideogram-mcp-server-v3
```

### Claude Desktop Setup

Add to your Claude Desktop MCP configuration:

```json
{
  "mcpServers": {
    "ideogram-v3": {
      "command": "npx",
      "args": [
        "@sunwood-ai-labs/ideogram-mcp-server-v3"
      ],
      "env": {
        "IDEOGRAM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Environment Setup

```bash
export IDEOGRAM_API_KEY="your_ideogram_api_key"
```

## 🛠️ Tool Reference

### `generate_image`

Generate images using Ideogram v3.0 with advanced features.

#### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `prompt` | string | Image generation prompt (English recommended) | ✅ |
| `aspect_ratio` | string | Aspect ratio (1x1, 16x9, 4x3, etc.) | ❌ |
| `resolution` | string | Specific resolution (69 options available) | ❌ |
| `seed` | integer | Random seed (0-2147483647) | ❌ |
| `magic_prompt` | string | AUTO/ON/OFF - AI prompt enhancement | ❌ |
| `rendering_speed` | string | TURBO/DEFAULT/QUALITY | ❌ |
| `style_codes` | array | 8-character hex style codes | ❌ |
| `style_type` | string | AUTO/GENERAL/REALISTIC/DESIGN | ❌ |
| `style_reference` | object | Style reference configuration | ❌ |
| `negative_prompt` | string | What to exclude from image | ❌ |
| `num_images` | integer | Number of images (1-8) | ❌ |
| `output_dir` | string | Save directory (default: "docs") | ❌ |
| `base_filename` | string | Base filename | ❌ |
| `blur_mask` | boolean | Apply edge blur effect | ❌ |

#### Style Reference Object

```typescript
{
  urls?: string[];        // Up to 3 reference image URLs
  style_code?: string;    // 8-character style code
  random_style?: boolean; // Use random style from library
}
```

## 📝 Usage Examples

### Basic Generation

```typescript
{
  "prompt": "A beautiful sunset over mountains",
  "aspect_ratio": "16x9",
  "rendering_speed": "QUALITY"
}
```

### Advanced with Style Reference

```typescript
{
  "prompt": "Modern minimalist logo design",
  "style_reference": {
    "urls": ["https://example.com/ref1.jpg"],
    "random_style": false
  },
  "style_type": "DESIGN",
  "num_images": 4
}
```

### Professional Quality

```typescript
{
  "prompt": "Professional headshot photography",
  "rendering_speed": "QUALITY",
  "style_type": "REALISTIC",
  "negative_prompt": "blurry, low quality",
  "seed": 12345
}
```

## 🏗️ Development

### Prerequisites

- Node.js 18+
- TypeScript 5+
- Ideogram API key

### Setup

```bash
git clone https://github.com/Thelyoncrypt/ideogram-mcp-server-v3.git
cd ideogram-mcp-server-v3
npm install
```

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run watch
```

### Testing

```bash
npm test
```

## 📁 Project Structure

```
ideogram-mcp-server-v3/
├── src/
│   ├── types/
│   │   └── ideogram.ts      # Type definitions
│   ├── tools/
│   │   └── generate-image.ts # Main tool implementation
│   ├── utils/
│   │   └── validation.ts    # Utility functions
│   ├── ideogram-client.ts   # API client
│   ├── server.ts           # MCP server
│   └── index.ts            # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Supported Aspect Ratios

- Square: `1x1`
- Landscape: `16x9`, `4x3`, `21x9`, `3x2`, `5x4`, `3x1`, `2x1`
- Portrait: `9x16`, `3x4`, `9x21`, `2x3`, `4x5`, `1x3`, `1x2`

### Rendering Speeds

- **TURBO**: Fastest generation, good quality
- **DEFAULT**: Balanced speed and quality
- **QUALITY**: Highest quality, slower generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Ideogram v3.0 Documentation](https://developer.ideogram.ai/api-reference/api-reference/generate-v3)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/desktop)

## 🆕 What's New in v3.0

- **Style References**: Revolutionary style control with image references
- **Enhanced Quality**: Stunning realism and creative design capabilities
- **Rendering Speed Options**: Choose your speed/quality balance
- **Improved Text Rendering**: Professional typography in generated images
- **Better API Integration**: Full v3 endpoint support with all new features

---

Made with ❤️ for the AI creative community
