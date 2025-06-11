# Model Context Protocol (MCP) Setup Guide

![MCP](https://img.shields.io/badge/MCP-Model%20Context%20Protocol-blue?style=for-the-badge)
![Universal](https://img.shields.io/badge/Universal-Standard-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)

## 📋 Overview

Model Context Protocol (MCP) is an open standard that enables AI applications to securely connect to external data sources and tools. This guide covers comprehensive MCP setup for various platforms including Agent Zero, Claude Desktop, and custom implementations.

## 🔧 Prerequisites

### System Requirements
- **Node.js**: Version 18+ for running MCP servers
- **npm/yarn**: Package manager for installing MCP servers
- **Python**: Version 3.8+ (for Python-based MCP servers)
- **Git**: For cloning MCP server repositories

### Understanding MCP Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Client     │◄──►│   MCP Host      │◄──►│   MCP Server    │
│ (Claude, etc.)  │    │ (Claude Desktop)│    │ (Tools/Data)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📦 Core MCP Servers Installation

### Official MCP Servers

#### Filesystem Server
```bash
# Install filesystem access server
npm install -g @modelcontextprotocol/server-filesystem

# Test installation
npx @modelcontextprotocol/server-filesystem --help
```

#### Git Server
```bash
# Install Git integration server
npm install -g @modelcontextprotocol/server-git

# Test with a repository
npx @modelcontextprotocol/server-git --repository /path/to/repo
```

#### Database Servers
```bash
# SQLite server
npm install -g @modelcontextprotocol/server-sqlite

# PostgreSQL server
npm install -g @modelcontextprotocol/server-postgres

# Test SQLite server
npx @modelcontextprotocol/server-sqlite --db-path ./test.db
```

#### Web Browsing Server
```bash
# Browser automation server
npm install -g @modelcontextprotocol/server-puppeteer

# Test browser server
npx @modelcontextprotocol/server-puppeteer
```

### Third-Party MCP Servers

#### Ideogram Image Generation
```bash
# Install our custom Ideogram MCP server
npm install -g @lyoncrypt/openai-image-1-ideogram-mcp

# Test with API key
IDEOGRAM_API_KEY=your_key npx @lyoncrypt/openai-image-1-ideogram-mcp
```

#### GitHub Integration
```bash
# GitHub API server
npm install -g @modelcontextprotocol/server-github

# Test with token
GITHUB_TOKEN=your_token npx @modelcontextprotocol/server-github
```

## ⚙️ Platform-Specific Configuration

### Agent Zero MCP Setup

#### Configuration File Location
```bash
# Agent Zero MCP configuration
/path/to/agent-zero/work_dir/mcp.json
```

#### Basic Configuration
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/directory"],
      "env": {},
      "disabled": false,
      "autoApprove": []
    },
    "ideogram": {
      "command": "npx",
      "args": ["-y", "@lyoncrypt/openai-image-1-ideogram-mcp@latest"],
      "env": {
        "IDEOGRAM_API_KEY": "your_ideogram_api_key",
        "OPENAI_API_KEY": "your_openai_api_key"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

#### Advanced Agent Zero Configuration
```json
{
  "mcpServers": {
    "development-stack": {
      "command": "node",
      "args": ["/path/to/custom-dev-server.js"],
      "env": {
        "PROJECT_ROOT": "/workspace",
        "DATABASE_URL": "postgresql://localhost/dev",
        "API_ENVIRONMENT": "development"
      },
      "disabled": false,
      "autoApprove": ["read", "list"],
      "timeout": 30000
    }
  },
  "security": {
    "allowedCommands": ["read", "write", "execute"],
    "blockedPaths": ["/etc", "/root", "/home/other-users"],
    "requireConfirmation": true
  }
}
```

### Claude Desktop MCP Setup

#### Configuration File Locations
```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json

# Linux
~/.config/Claude/claude_desktop_config.json
```

#### Basic Claude Configuration
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/username/Documents"],
      "env": {}
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git", "--repository", "/Users/username/projects/myrepo"],
      "env": {}
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "/Users/username/data.db"],
      "env": {}
    }
  }
}
```

#### Production Claude Configuration
```json
{
  "mcpServers": {
    "secure-filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/safe/workspace"],
      "env": {
        "MCP_LOG_LEVEL": "info"
      }
    },
    "database-readonly": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_URL": "postgresql://readonly:password@localhost/production",
        "MCP_READONLY": "true"
      }
    }
  },
  "globalSettings": {
    "logLevel": "warn",
    "timeout": 30000,
    "maxConcurrentServers": 5
  }
}
```

### Windsurf MCP Integration
```json
{
  "mcp": {
    "enabled": true,
    "servers": [
      {
        "name": "filesystem",
        "command": "npx @modelcontextprotocol/server-filesystem",
        "args": ["/workspace"],
        "env": {}
      },
      {
        "name": "ideogram",
        "command": "npx @lyoncrypt/openai-image-1-ideogram-mcp",
        "env": {
          "IDEOGRAM_API_KEY": "your_key"
        }
      }
    ]
  }
}
```

## 🛠️ Custom MCP Server Development

### Basic MCP Server Structure
```javascript
// custom-mcp-server.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server(
  {
    name: 'custom-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Define tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'custom_tool',
        description: 'A custom tool for demonstration',
        inputSchema: {
          type: 'object',
          properties: {
            input: { type: 'string' }
          }
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;
  
  if (name === 'custom_tool') {
    return {
      content: [
        {
          type: 'text',
          text: `Processed: ${args.input}`
        }
      ]
    };
  }
  
  throw new Error(`Unknown tool: ${name}`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Python MCP Server Example
```python
# custom_mcp_server.py
import asyncio
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

app = Server("custom-python-server")

@app.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="python_tool",
            description="A Python-based MCP tool",
            inputSchema={
                "type": "object",
                "properties": {
                    "data": {"type": "string"}
                }
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    if name == "python_tool":
        result = f"Python processed: {arguments.get('data', '')}"
        return [TextContent(type="text", text=result)]
    
    raise ValueError(f"Unknown tool: {name}")

async def main():
    async with stdio_server() as streams:
        await app.run(*streams)

if __name__ == "__main__":
    asyncio.run(main())
```

## 🔒 Security Configuration

### Access Control
```json
{
  "mcpServers": {
    "restricted-filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/safe/directory"],
      "env": {},
      "security": {
        "allowedOperations": ["read", "list"],
        "blockedOperations": ["write", "delete"],
        "pathRestrictions": [
          "/safe/directory/**",
          "!/safe/directory/secrets/**"
        ]
      }
    }
  }
}
```

### Environment Variable Security
```bash
# Use environment files for sensitive data
# .env.mcp
IDEOGRAM_API_KEY=your_secret_key
DATABASE_PASSWORD=your_db_password
GITHUB_TOKEN=your_github_token

# Reference in configuration
{
  "mcpServers": {
    "secure-server": {
      "command": "npx",
      "args": ["-y", "your-mcp-server"],
      "envFile": ".env.mcp"
    }
  }
}
```

## 🔧 Troubleshooting

### Common Issues

#### Server Not Starting
```bash
# Check Node.js version
node --version  # Should be 18+

# Test server manually
npx @modelcontextprotocol/server-filesystem /test/path

# Check logs
tail -f ~/.mcp/logs/server.log
```

#### Permission Errors
```bash
# Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# Fix file permissions
chmod 644 claude_desktop_config.json
chmod 755 ~/.config/Claude/
```

#### Connection Timeouts
```json
{
  "mcpServers": {
    "slow-server": {
      "command": "npx",
      "args": ["-y", "your-server"],
      "timeout": 60000,
      "retries": 3,
      "env": {}
    }
  }
}
```

### Debugging Tools
```bash
# Enable debug logging
export MCP_LOG_LEVEL=debug

# Test MCP server communication
npx @modelcontextprotocol/inspector

# Validate configuration
jq . claude_desktop_config.json
```

## ✅ Verification

### Test MCP Setup
```bash
# Test individual servers
npx @modelcontextprotocol/server-filesystem /tmp --test

# Test configuration
mcp-validate-config claude_desktop_config.json

# Monitor server health
mcp-health-check --all
```

### Performance Monitoring
```bash
# Monitor MCP server performance
mcp-monitor --duration 5m --servers all

# Check resource usage
ps aux | grep mcp
netstat -an | grep mcp
```

## 🔗 Next Steps

1. **[Custom MCP Servers](./custom-mcp-servers.md)** - Build your own MCP servers
2. **[MCP Troubleshooting](../troubleshooting/mcp-troubleshooting.md)** - Common issues and solutions
3. **[Advanced MCP Patterns](./advanced-mcp.md)** - Complex MCP implementations

## 📞 Support

- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **GitHub Repository**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
- **Community Discord**: [MCP Community](https://discord.gg/mcp-community)
- **Specification**: [MCP Specification](https://spec.modelcontextprotocol.io)
