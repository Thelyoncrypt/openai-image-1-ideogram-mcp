# Ideogram MCP Server Installation Guide

![Ideogram MCP](https://img.shields.io/badge/Ideogram-MCP%20Server-purple?style=for-the-badge)
![AI Image Generation](https://img.shields.io/badge/AI-Image%20Generation-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)

## 📋 Overview

The Ideogram MCP Server provides AI image generation capabilities through the Model Context Protocol, enabling seamless integration with AI assistants like Claude Desktop, Agent Zero, and other MCP-compatible platforms. This guide covers the complete installation and setup process.

## 🔧 Prerequisites

### System Requirements
- **Node.js**: Version 18+ required
- **npm**: Package manager (comes with Node.js)
- **Operating System**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **RAM**: 2GB minimum, 4GB recommended
- **Internet**: Required for API calls and package installation

### Required API Keys
- **Ideogram API Key**: Get from [ideogram.ai/api](https://ideogram.ai/api)
- **OpenAI API Key** (Optional): For enhanced features - get from [platform.openai.com](https://platform.openai.com)

### Supported Platforms
- **Agent Zero**: Docker-based AI development platform
- **Claude Desktop**: Anthropic's desktop application
- **Windsurf IDE**: Agentic IDE with MCP support
- **Custom MCP Clients**: Any MCP-compatible application

## 📦 Installation Methods

### Method 1: NPM Package Installation (Recommended)

#### Global Installation
```bash
# Install the Ideogram MCP server globally
npm install -g @lyoncrypt/openai-image-1-ideogram-mcp

# Verify installation
npx @lyoncrypt/openai-image-1-ideogram-mcp --version
```

#### Test Installation
```bash
# Test with your API key
IDEOGRAM_API_KEY=your_api_key_here npx @lyoncrypt/openai-image-1-ideogram-mcp

# Should start the MCP server (use Ctrl+C to stop)
```

### Method 2: Local Development Installation

#### Clone and Build
```bash
# Clone the repository
git clone https://github.com/Thelyoncrypt/openai-image-1-ideogram-mcp.git
cd openai-image-1-ideogram-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Test local build
IDEOGRAM_API_KEY=your_api_key_here node dist/index.js
```

## ⚙️ Platform-Specific Setup

### Agent Zero Integration

#### Configuration File
Create or update `/path/to/agent-zero/work_dir/mcp.json`:

```json
{
  "mcpServers": {
    "ideogram-mcp": {
      "command": "npx",
      "args": ["-y", "@lyoncrypt/openai-image-1-ideogram-mcp@latest"],
      "env": {
        "IDEOGRAM_API_KEY": "your_ideogram_api_key_here",
        "OPENAI_API_KEY": "your_openai_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

#### Docker Integration
```bash
# Restart Agent Zero to load the MCP server
docker restart agent-zero

# Check logs to verify loading
docker logs agent-zero --tail 20 | grep -i "ideogram\|tools updated"
```

### Claude Desktop Integration

#### Configuration File Location
```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json

# Linux
~/.config/Claude/claude_desktop_config.json
```

#### Configuration Content
```json
{
  "mcpServers": {
    "ideogram-mcp": {
      "command": "npx",
      "args": ["-y", "@lyoncrypt/openai-image-1-ideogram-mcp@latest"],
      "env": {
        "IDEOGRAM_API_KEY": "your_ideogram_api_key_here",
        "OPENAI_API_KEY": "your_openai_api_key_here"
      }
    }
  }
}
```

#### Restart Claude Desktop
```bash
# macOS
killall Claude && open -a Claude

# Windows
taskkill /f /im Claude.exe && start Claude

# Linux
pkill claude && claude-desktop
```

### Windsurf IDE Integration

#### MCP Configuration
Add to Windsurf MCP settings:

```json
{
  "mcp": {
    "enabled": true,
    "servers": [
      {
        "name": "ideogram-mcp",
        "command": "npx @lyoncrypt/openai-image-1-ideogram-mcp",
        "env": {
          "IDEOGRAM_API_KEY": "your_ideogram_api_key_here",
          "OPENAI_API_KEY": "your_openai_api_key_here"
        }
      }
    ]
  }
}
```

### Custom MCP Client Integration

#### Basic MCP Client Setup
```javascript
// Example MCP client integration
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'npx',
  args: ['-y', '@lyoncrypt/openai-image-1-ideogram-mcp@latest'],
  env: {
    IDEOGRAM_API_KEY: 'your_api_key_here'
  }
});

const client = new Client({
  name: 'ideogram-client',
  version: '1.0.0'
}, {
  capabilities: {}
});

await client.connect(transport);
```

## 🎯 Available Features

### Image Generation Tool
The MCP server provides a `generate_image` tool with the following capabilities:

#### Basic Usage
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "A beautiful sunset over mountains",
    "aspect_ratio": "16x9",
    "model": "V_2"
  }
}
```

#### Advanced Features
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "Professional headshot of a business person",
    "aspect_ratio": "1x1",
    "model": "V_2",
    "magic_prompt": "AUTO",
    "style_type": "REALISTIC",
    "rendering_speed": "QUALITY",
    "num_images": 4,
    "negative_prompt": "blurry, low quality",
    "seed": 12345
  }
}
```

### Supported Parameters
- **prompt**: Text description of the image (required)
- **aspect_ratio**: 15 options including 1x1, 16x9, 4x3, etc.
- **model**: V_2, V_2_TURBO (default: V_2)
- **magic_prompt**: AUTO, ON, OFF (default: AUTO)
- **style_type**: AUTO, GENERAL, REALISTIC, DESIGN
- **rendering_speed**: TURBO, DEFAULT, QUALITY
- **num_images**: 1-8 images per request
- **negative_prompt**: What to avoid in the image
- **seed**: For reproducible generation
- **style_codes**: Array of 8-character style codes

## 🔧 Configuration Options

### Environment Variables
```bash
# Required
IDEOGRAM_API_KEY=your_ideogram_api_key_here

# Optional
OPENAI_API_KEY=your_openai_api_key_here
MCP_LOG_LEVEL=info
DEBUG=ideogram-mcp:*
```

### Advanced Configuration
```json
{
  "mcpServers": {
    "ideogram-mcp": {
      "command": "npx",
      "args": ["-y", "@lyoncrypt/openai-image-1-ideogram-mcp@latest"],
      "env": {
        "IDEOGRAM_API_KEY": "your_key_here",
        "OPENAI_API_KEY": "your_openai_key_here",
        "MCP_LOG_LEVEL": "debug",
        "OUTPUT_DIR": "/path/to/save/images",
        "DEFAULT_MODEL": "V_2",
        "DEFAULT_ASPECT_RATIO": "16x9"
      },
      "timeout": 60000,
      "disabled": false,
      "autoApprove": ["generate_image"]
    }
  }
}
```

## ✅ Verification and Testing

### Test MCP Server
```bash
# Test server starts correctly
IDEOGRAM_API_KEY=your_key timeout 10 npx @lyoncrypt/openai-image-1-ideogram-mcp

# Should exit with code 124 (timeout) if working correctly
echo $?  # Should show 124
```

### Test Image Generation
Once integrated with your MCP client:

1. **Simple Test**: Ask to generate a basic image
   ```
   "Generate an image of a red apple"
   ```

2. **Advanced Test**: Use specific parameters
   ```
   "Generate a 16x9 realistic image of a sunset with high quality rendering"
   ```

3. **Style Test**: Use style codes or references
   ```
   "Generate an image using style code A1B2C3D4"
   ```

### Verify Integration
- **Agent Zero**: Check for "Tools updated. Found X tools" in logs
- **Claude Desktop**: Look for image generation tool in chat interface
- **Windsurf**: Verify MCP server appears in settings
- **Custom Client**: Test tool listing and execution

## 🔧 Troubleshooting

### Common Issues

#### Server Won't Start
```bash
# Check Node.js version
node --version  # Should be 18+

# Check package installation
npm list -g @lyoncrypt/openai-image-1-ideogram-mcp

# Reinstall if needed
npm uninstall -g @lyoncrypt/openai-image-1-ideogram-mcp
npm install -g @lyoncrypt/openai-image-1-ideogram-mcp
```

#### API Key Issues
```bash
# Test API key validity
curl -H "Api-Key: $IDEOGRAM_API_KEY" \
  https://api.ideogram.ai/manage/api/subscription

# Should return subscription information
```

#### MCP Connection Problems
```bash
# Enable debug logging
export MCP_LOG_LEVEL=debug
export DEBUG=ideogram-mcp:*

# Run with debug output
IDEOGRAM_API_KEY=your_key npx @lyoncrypt/openai-image-1-ideogram-mcp
```

#### Permission Errors
```bash
# Fix npm permissions (Linux/macOS)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Platform-Specific Issues

#### Agent Zero
```bash
# Check Docker container logs
docker logs agent-zero | grep -i ideogram

# Verify MCP configuration
docker exec agent-zero cat /root/mcp.json | jq .
```

#### Claude Desktop
```bash
# Check configuration file exists
ls -la ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Validate JSON syntax
jq . claude_desktop_config.json
```

## 🚀 Advanced Usage

### Custom Output Directory
```json
{
  "env": {
    "IDEOGRAM_API_KEY": "your_key",
    "OUTPUT_DIR": "/custom/path/for/images"
  }
}
```

### Batch Image Generation
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "Professional product photos",
    "num_images": 8,
    "aspect_ratio": "1x1",
    "rendering_speed": "QUALITY"
  }
}
```

### Style Reference System
```json
{
  "name": "generate_image",
  "arguments": {
    "prompt": "Portrait in this style",
    "style_codes": ["A1B2C3D4", "E5F6G7H8"],
    "style_type": "REALISTIC"
  }
}
```

## 🔗 Next Steps

1. **[MCP Configuration Guide](../configuration/mcp-setup.md)** - Advanced MCP setup
2. **[API Keys Management](../configuration/api-keys.md)** - Secure key management
3. **[Troubleshooting Guide](../troubleshooting/mcp-troubleshooting.md)** - Common issues

## 📞 Support

- **GitHub Repository**: [github.com/Thelyoncrypt/openai-image-1-ideogram-mcp](https://github.com/Thelyoncrypt/openai-image-1-ideogram-mcp)
- **Issues**: [GitHub Issues](https://github.com/Thelyoncrypt/openai-image-1-ideogram-mcp/issues)
- **Ideogram API**: [ideogram.ai/api-docs](https://ideogram.ai/api-docs)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
