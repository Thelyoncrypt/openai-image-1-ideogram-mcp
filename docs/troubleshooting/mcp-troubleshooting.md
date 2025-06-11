# MCP Troubleshooting Guide

![MCP Troubleshooting](https://img.shields.io/badge/MCP-Troubleshooting-red?style=for-the-badge)
![Model Context Protocol](https://img.shields.io/badge/Model%20Context-Protocol-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Comprehensive-green?style=for-the-badge)

## 📋 Overview

This guide provides comprehensive troubleshooting solutions for Model Context Protocol (MCP) issues across all platforms including Agent Zero, Claude Desktop, Windsurf, and custom implementations.

## 🔧 Common MCP Issues

### Server Connection Problems

#### Issue: "unnamed_server server_name is required"
**Cause**: Incorrect MCP configuration format
**Solution**:
```json
// ❌ Wrong format
{
  "tools": {
    "server-name": { ... }
  }
}

// ✅ Correct format
{
  "mcpServers": {
    "server-name": { ... }
  }
}
```

#### Issue: MCP Server Timeout
**Symptoms**: Server fails to start within timeout period
**Solutions**:
```bash
# Test server manually
npx @modelcontextprotocol/server-filesystem /tmp

# Check if package exists
npm view @modelcontextprotocol/server-filesystem

# Use local build if npm package unavailable
{
  "mcpServers": {
    "local-server": {
      "command": "node",
      "args": ["/path/to/local/server.js"],
      "env": { ... }
    }
  }
}
```

#### Issue: Server Not Found
**Cause**: Package doesn't exist or wrong package name
**Solutions**:
```bash
# Verify package exists
npm search @modelcontextprotocol/server-

# Install package globally first
npm install -g @modelcontextprotocol/server-filesystem

# Use npx with -y flag for auto-install
"args": ["-y", "@modelcontextprotocol/server-filesystem"]
```

### Configuration Issues

#### Issue: JSON Syntax Errors
**Symptoms**: Configuration file not loading
**Solutions**:
```bash
# Validate JSON syntax
jq . claude_desktop_config.json

# Common syntax errors:
# - Missing commas
# - Trailing commas
# - Unescaped quotes
# - Wrong bracket types

# Use JSON formatter
cat config.json | jq . > formatted_config.json
```

#### Issue: Environment Variables Not Loading
**Symptoms**: API keys not recognized
**Solutions**:
```json
// ✅ Correct environment variable format
{
  "mcpServers": {
    "api-server": {
      "command": "npx",
      "args": ["-y", "api-mcp-server"],
      "env": {
        "API_KEY": "your-actual-key-here",
        "DEBUG": "true"
      }
    }
  }
}

// ❌ Don't use shell variables in JSON
{
  "env": {
    "API_KEY": "$API_KEY"  // This won't work
  }
}
```

#### Issue: Path Resolution Problems
**Symptoms**: Server can't find files or directories
**Solutions**:
```bash
# Use absolute paths
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/documents"],
      "env": {}
    }
  }
}

# Check path permissions
ls -la /path/to/directory
chmod 755 /path/to/directory
```

## 🚀 Platform-Specific Issues

### Agent Zero MCP Problems

#### Issue: MCP Configuration Not Loading
**Location**: `/path/to/agent-zero/work_dir/mcp.json`
**Solutions**:
```bash
# Check file exists and has correct permissions
ls -la work_dir/mcp.json
chmod 644 work_dir/mcp.json

# Restart Agent Zero container
docker restart agent-zero

# Check logs for MCP loading
docker logs agent-zero | grep -i mcp
```

#### Issue: Tools Not Appearing in Agent Zero
**Symptoms**: "Tools updated. Found 0 tools"
**Solutions**:
```bash
# Verify MCP server responds
docker exec agent-zero npx @modelcontextprotocol/server-filesystem /tmp

# Check Agent Zero MCP integration
docker logs agent-zero --tail 50 | grep -i "tools updated"

# Ensure server is not disabled
{
  "mcpServers": {
    "server-name": {
      "disabled": false,  // Make sure this is false
      ...
    }
  }
}
```

### Claude Desktop MCP Problems

#### Issue: Configuration File Not Found
**Locations**:
```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json

# Linux
~/.config/Claude/claude_desktop_config.json
```

**Solutions**:
```bash
# Create directory if missing
mkdir -p ~/Library/Application\ Support/Claude/  # macOS
mkdir -p ~/.config/Claude/  # Linux

# Create basic configuration
cat > claude_desktop_config.json << 'EOF'
{
  "mcpServers": {}
}
EOF
```

#### Issue: MCP Servers Not Loading in Claude
**Symptoms**: No MCP tools available in Claude chat
**Solutions**:
```bash
# Restart Claude Desktop completely
killall Claude  # macOS
taskkill /f /im Claude.exe  # Windows

# Check Claude logs (if available)
# macOS: ~/Library/Logs/Claude/
# Windows: %APPDATA%\Claude\logs\

# Test MCP server independently
npx @modelcontextprotocol/server-filesystem ~/Documents
```

### Windsurf MCP Problems

#### Issue: MCP Integration Not Working
**Solutions**:
```json
// Check Windsurf MCP configuration
{
  "mcp": {
    "enabled": true,
    "servers": [
      {
        "name": "filesystem",
        "command": "npx @modelcontextprotocol/server-filesystem",
        "args": ["/workspace"]
      }
    ]
  }
}
```

## 🔒 Security and Permission Issues

### File System Access Problems

#### Issue: Permission Denied Errors
**Symptoms**: MCP server can't access files/directories
**Solutions**:
```bash
# Check directory permissions
ls -la /path/to/directory

# Fix permissions for user access
chmod 755 /path/to/directory
chmod 644 /path/to/directory/*

# Use user-accessible directory
npx @modelcontextprotocol/server-filesystem ~/Documents

# For system directories, use sudo (not recommended)
# Better: Copy files to user directory
```

#### Issue: Sandbox Restrictions
**Symptoms**: MCP server blocked by security policies
**Solutions**:
```json
// Use restricted paths
{
  "mcpServers": {
    "safe-filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/safe/directory"],
      "env": {},
      "security": {
        "allowedOperations": ["read", "list"],
        "blockedOperations": ["write", "delete"]
      }
    }
  }
}
```

### Network Security Issues

#### Issue: Firewall Blocking MCP Communication
**Solutions**:
```bash
# Check if ports are blocked
netstat -tulpn | grep mcp

# Allow MCP communication (Linux)
sudo ufw allow from 127.0.0.1

# Windows firewall exception
netsh advfirewall firewall add rule name="MCP Local" dir=in action=allow protocol=TCP localport=any remoteip=127.0.0.1
```

## 🐛 Debugging MCP Issues

### Enable Debug Logging

#### Environment Variables
```bash
# Enable debug logging for MCP servers
export MCP_LOG_LEVEL=debug
export DEBUG=mcp:*

# Run server with debug output
MCP_LOG_LEVEL=debug npx @modelcontextprotocol/server-filesystem /tmp
```

#### Configuration-Based Logging
```json
{
  "mcpServers": {
    "debug-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "env": {
        "MCP_LOG_LEVEL": "debug",
        "DEBUG": "mcp:*"
      }
    }
  },
  "logging": {
    "level": "debug",
    "file": "/tmp/mcp-debug.log"
  }
}
```

### Testing MCP Servers

#### Manual Server Testing
```bash
# Test filesystem server
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | \
  npx @modelcontextprotocol/server-filesystem /tmp

# Test with MCP inspector (if available)
npx @modelcontextprotocol/inspector

# Test server health
timeout 10 npx @modelcontextprotocol/server-filesystem /tmp
echo $?  # Should be 124 (timeout) if server starts correctly
```

#### Configuration Validation
```bash
# Validate JSON configuration
jq . claude_desktop_config.json

# Check for common issues
jq '.mcpServers | keys[]' claude_desktop_config.json  # List server names
jq '.mcpServers[].command' claude_desktop_config.json  # Check commands
```

### Performance Debugging

#### Issue: Slow MCP Server Response
**Solutions**:
```json
{
  "mcpServers": {
    "optimized-server": {
      "command": "npx",
      "args": ["-y", "server-package"],
      "timeout": 60000,  // Increase timeout
      "env": {
        "NODE_OPTIONS": "--max-old-space-size=4096"  // Increase memory
      }
    }
  }
}
```

#### Issue: High Memory Usage
**Solutions**:
```bash
# Monitor MCP server memory usage
ps aux | grep mcp
top -p $(pgrep -f mcp)

# Limit memory usage
{
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=1024"
  }
}
```

## 🔧 Recovery Procedures

### Reset MCP Configuration

#### Complete Reset
```bash
# Backup current configuration
cp claude_desktop_config.json claude_desktop_config.json.backup

# Create minimal working configuration
cat > claude_desktop_config.json << 'EOF'
{
  "mcpServers": {
    "test-filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "env": {}
    }
  }
}
EOF

# Test minimal configuration
# Restart application and verify MCP works
```

#### Incremental Recovery
```bash
# Start with one server
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "env": {}
    }
  }
}

# Add servers one by one to identify problematic configuration
```

### Emergency Debugging

#### Collect Debug Information
```bash
# System information
uname -a
node --version
npm --version

# MCP server information
npm list -g | grep modelcontextprotocol
npx @modelcontextprotocol/server-filesystem --help

# Configuration validation
jq . claude_desktop_config.json
cat claude_desktop_config.json | jq '.mcpServers | keys'

# Process information
ps aux | grep -E "(claude|mcp|node)"
netstat -tulpn | grep -E "(claude|mcp)"
```

## ✅ Verification Steps

### Test MCP Integration
```bash
# 1. Test server manually
npx @modelcontextprotocol/server-filesystem /tmp

# 2. Validate configuration
jq . claude_desktop_config.json

# 3. Restart application
# 4. Check for MCP tools in application
# 5. Test MCP functionality with simple request
```

### Health Check Script
```bash
#!/bin/bash
# mcp-health-check.sh

echo "=== MCP Health Check ==="

# Check Node.js
echo "Node.js version: $(node --version)"

# Check MCP packages
echo "Installed MCP packages:"
npm list -g | grep modelcontextprotocol

# Test configuration
echo "Configuration validation:"
jq . claude_desktop_config.json > /dev/null && echo "✅ Valid JSON" || echo "❌ Invalid JSON"

# Test servers
echo "Testing MCP servers:"
for server in filesystem git sqlite; do
  timeout 5 npx @modelcontextprotocol/server-$server --help > /dev/null 2>&1
  if [ $? -eq 0 ] || [ $? -eq 124 ]; then
    echo "✅ $server server available"
  else
    echo "❌ $server server not available"
  fi
done

echo "=== Health Check Complete ==="
```

## 🔗 Additional Resources

### Documentation Links
- **MCP Specification**: [spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io)
- **Official Servers**: [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- **SDK Documentation**: [github.com/modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)

### Community Support
- **MCP GitHub**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
- **Anthropic Discord**: [discord.gg/anthropic](https://discord.gg/anthropic)
- **Stack Overflow**: Tag `model-context-protocol`
