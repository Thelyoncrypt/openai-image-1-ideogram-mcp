# Claude Desktop Installation Guide

![Claude Desktop](https://img.shields.io/badge/Claude-Desktop%20App-orange?style=for-the-badge)
![MCP Support](https://img.shields.io/badge/MCP-Supported-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)

## 📋 Overview

Claude Desktop is Anthropic's official desktop application that provides direct access to Claude AI with advanced features including Model Context Protocol (MCP) integration. This guide covers the complete installation and setup process, with special focus on MCP server configuration.

## 🔧 Prerequisites

### System Requirements

#### macOS
- **Version**: macOS 10.15 (Catalina) or later
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Internet**: Required for Claude API access

#### Windows
- **Version**: Windows 10 (64-bit) or Windows 11
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Internet**: Required for Claude API access

#### Linux
- **Distributions**: Ubuntu 18.04+, Debian 10+, Fedora 32+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Internet**: Required for Claude API access

### Required Accounts
- **Anthropic Account**: Free or Pro account for Claude access
- **Claude Pro** (Optional): For enhanced features and higher usage limits

### Prerequisites for MCP
- **Node.js**: Version 18+ for running MCP servers
- **npm**: For installing MCP server packages
- **Git**: For cloning MCP server repositories

## 📦 Installation Steps

### macOS Installation

#### Method 1: Direct Download
```bash
# Download from official website
curl -L https://claude.ai/download/mac -o claude-desktop.dmg

# Or visit https://claude.ai/download and select macOS
```

#### Method 2: Homebrew
```bash
# Install Claude Desktop via Homebrew Cask
brew install --cask claude

# Verify installation
claude --version
```

### Windows Installation

#### Method 1: Direct Download
1. Visit [claude.ai/download](https://claude.ai/download)
2. Click "Download for Windows"
3. Run the downloaded installer (.exe)
4. Follow the installation wizard
5. Launch Claude Desktop from Start Menu

#### Method 2: Package Manager
```powershell
# Using Chocolatey (if package available)
choco install claude-desktop

# Using Scoop (if package available)
scoop bucket add extras
scoop install claude-desktop

# Using Winget (if package available)
winget install Anthropic.Claude
```

### Linux Installation

#### Ubuntu/Debian
```bash
# Download the .deb package
wget https://claude.ai/download/linux/deb -o claude-desktop.deb

# Install with apt
sudo apt install ./claude-desktop.deb

# Or with dpkg
sudo dpkg -i claude-desktop.deb
sudo apt-get install -f  # Fix dependencies if needed

# Launch Claude Desktop
claude-desktop
```

#### Fedora/RHEL
```bash
# Download RPM package
wget https://claude.ai/download/linux/rpm -o claude-desktop.rpm

# Install with dnf
sudo dnf install claude-desktop.rpm

# Launch Claude Desktop
claude-desktop
```

#### AppImage (Universal Linux)
```bash
# Download AppImage
wget https://claude.ai/download/linux/appimage -o claude-desktop.AppImage

# Make executable
chmod +x claude-desktop.AppImage

# Run Claude Desktop
./claude-desktop.AppImage

# Optional: Install system-wide
sudo mv claude-desktop.AppImage /usr/local/bin/claude-desktop
```

## 🚀 Initial Setup

### First Launch
1. **Launch Claude Desktop** from your applications menu
2. **Sign In**:
   - Click "Sign In" or "Get Started"
   - Use your Anthropic account credentials
   - Or create a new account if needed
3. **Account Verification**: Complete email verification if prompted

### Account Configuration
- **Free Account**: Basic Claude access with usage limits
- **Claude Pro**: Enhanced features, higher limits, priority access
- **API Access**: Optional API key for advanced integrations

## 🔌 Model Context Protocol (MCP) Setup

### Understanding MCP
MCP allows Claude Desktop to connect to external tools and data sources:
- **File Systems**: Access local files and directories
- **Databases**: Connect to SQL databases
- **APIs**: Integrate with web services
- **Custom Tools**: Build your own MCP servers

### MCP Configuration Location

#### macOS
```bash
# MCP configuration file location
~/Library/Application Support/Claude/claude_desktop_config.json
```

#### Windows
```bash
# MCP configuration file location
%APPDATA%\Claude\claude_desktop_config.json
```

#### Linux
```bash
# MCP configuration file location
~/.config/Claude/claude_desktop_config.json
```

### Basic MCP Configuration
Create or edit the configuration file:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"],
      "env": {}
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git", "--repository", "/path/to/git/repo"],
      "env": {}
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "/path/to/database.db"],
      "env": {}
    }
  }
}
```

### Installing MCP Servers

#### Filesystem Server
```bash
# Install filesystem MCP server
npm install -g @modelcontextprotocol/server-filesystem

# Test the server
npx @modelcontextprotocol/server-filesystem /home/user/documents
```

#### Git Server
```bash
# Install Git MCP server
npm install -g @modelcontextprotocol/server-git

# Test the server
npx @modelcontextprotocol/server-git --repository /path/to/repo
```

#### Database Servers
```bash
# SQLite server
npm install -g @modelcontextprotocol/server-sqlite

# PostgreSQL server
npm install -g @modelcontextprotocol/server-postgres

# MySQL server (if available)
npm install -g @modelcontextprotocol/server-mysql
```

### Custom MCP Server Example
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
    },
    "weather": {
      "command": "node",
      "args": ["/path/to/weather-mcp-server.js"],
      "env": {
        "WEATHER_API_KEY": "your_weather_api_key"
      }
    }
  }
}
```

## ⚙️ Advanced Configuration

### Security Settings
```json
{
  "mcpServers": {
    "secure-filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/safe/directory"],
      "env": {},
      "disabled": false,
      "alwaysAllow": [],
      "alwaysReject": ["rm", "delete", "format"]
    }
  },
  "security": {
    "allowedCommands": ["read", "list", "search"],
    "blockedCommands": ["write", "delete", "execute"],
    "requireConfirmation": true
  }
}
```

### Performance Optimization
```json
{
  "performance": {
    "maxConcurrentServers": 5,
    "serverTimeout": 30000,
    "cacheEnabled": true,
    "cacheSize": "100MB"
  },
  "logging": {
    "level": "info",
    "file": "~/claude-mcp.log"
  }
}
```

### Environment Variables
```bash
# Set global environment variables for MCP servers
export CLAUDE_MCP_CONFIG_PATH="~/custom-claude-config.json"
export CLAUDE_MCP_LOG_LEVEL="debug"
export CLAUDE_MCP_CACHE_DIR="~/claude-cache"
```

## 🎯 Using MCP Features

### File System Access
Once filesystem MCP is configured:
1. Ask Claude: "List files in my documents folder"
2. Request: "Read the contents of README.md"
3. Command: "Search for Python files in my project"

### Git Integration
With Git MCP server:
1. "Show me the latest commits"
2. "What files were changed in the last commit?"
3. "Create a new branch for feature development"

### Database Queries
With database MCP servers:
1. "Show me all tables in the database"
2. "Query users table for active accounts"
3. "Generate a report of sales data"

## ✅ Verification

### Test Installation
```bash
# Check if Claude Desktop is installed
claude-desktop --version

# Or check application exists
ls /Applications/Claude.app  # macOS
ls "C:\Program Files\Claude"  # Windows
```

### Test MCP Integration
1. **Launch Claude Desktop**
2. **Check MCP Status**:
   - Look for MCP server indicators in the interface
   - Check for tool availability in conversations
3. **Test MCP Commands**:
   - Ask Claude to list files (if filesystem MCP is configured)
   - Request database information (if database MCP is configured)

### Debug MCP Issues
```bash
# Check MCP server logs
tail -f ~/claude-mcp.log

# Test MCP server manually
npx @modelcontextprotocol/server-filesystem /test/directory

# Validate configuration
cat ~/.config/Claude/claude_desktop_config.json | jq .
```

## 🔧 Troubleshooting

### Common Issues

#### MCP Servers Not Loading
```bash
# Check Node.js version
node --version  # Should be 18+

# Reinstall MCP server
npm uninstall -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-filesystem

# Check configuration syntax
jq . ~/.config/Claude/claude_desktop_config.json
```

#### Permission Issues
```bash
# Fix file permissions (Linux/macOS)
chmod 644 ~/.config/Claude/claude_desktop_config.json

# Fix directory permissions
chmod 755 ~/.config/Claude/
```

#### Network Issues
```bash
# Test internet connectivity
ping claude.ai

# Check firewall settings
# Ensure Claude Desktop can access the internet
```

## 🚀 Pro Tips

### Productivity Shortcuts
- **Cmd/Ctrl + N**: New conversation
- **Cmd/Ctrl + Shift + N**: New conversation with MCP tools
- **Cmd/Ctrl + K**: Quick command palette
- **Cmd/Ctrl + ,**: Settings

### Best Practices
1. **Secure Configuration**: Only allow MCP access to necessary directories
2. **Regular Updates**: Keep MCP servers updated
3. **Monitor Usage**: Check Claude usage limits and MCP performance
4. **Backup Configuration**: Save your MCP configuration file

### Advanced MCP Usage
```json
{
  "mcpServers": {
    "development-stack": {
      "command": "node",
      "args": ["/path/to/dev-mcp-server.js"],
      "env": {
        "PROJECT_ROOT": "/path/to/project",
        "DATABASE_URL": "postgresql://localhost/dev",
        "API_KEYS": "encrypted_keys_file.json"
      }
    }
  }
}
```

## 🔗 Next Steps

1. **[MCP Server Development](../configuration/custom-mcp-servers.md)** - Build custom MCP servers
2. **[Team MCP Setup](../configuration/team-mcp.md)** - Configure MCP for teams
3. **[Advanced Integrations](../configuration/claude-integrations.md)** - Connect Claude to your workflow

## 📞 Support

- **Official Documentation**: [docs.anthropic.com](https://docs.anthropic.com/en/docs/agents-and-tools/mcp)
- **MCP GitHub**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
- **Community Support**: [Anthropic Discord](https://discord.gg/anthropic)
- **Email Support**: support@anthropic.com
