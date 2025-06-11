# API Keys and Authentication Setup Guide

![API Keys](https://img.shields.io/badge/API-Keys%20Management-orange?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Best%20Practices-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Comprehensive-green?style=for-the-badge)

## 📋 Overview

This guide covers secure API key management and authentication setup for all AI-powered development environments. Proper API key management is crucial for security and functionality.

## 🔑 Required API Keys

### Core AI Services

#### OpenAI API Keys
- **Purpose**: GPT models, embeddings, image generation
- **Get Key**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Format**: `sk-proj-...` (new format) or `sk-...` (legacy)
- **Usage**: Agent Zero, Cursor, custom MCP servers

#### Anthropic API Keys
- **Purpose**: Claude models
- **Get Key**: [console.anthropic.com](https://console.anthropic.com)
- **Format**: `sk-ant-api03-...`
- **Usage**: Claude Desktop, Cursor, Agent Zero

#### Google AI API Keys
- **Purpose**: Gemini models
- **Get Key**: [aistudio.google.com](https://aistudio.google.com)
- **Format**: Various formats
- **Usage**: Agent Zero, custom integrations

### Specialized Services

#### Ideogram API Keys
- **Purpose**: AI image generation
- **Get Key**: [ideogram.ai/api](https://ideogram.ai/api)
- **Format**: Custom format
- **Usage**: Ideogram MCP server

#### Perplexity API Keys
- **Purpose**: Research and web search
- **Get Key**: [perplexity.ai](https://perplexity.ai)
- **Format**: `pplx-...`
- **Usage**: Agent Zero research features

#### GitHub Tokens
- **Purpose**: Repository access, MCP integration
- **Get Token**: [github.com/settings/tokens](https://github.com/settings/tokens)
- **Format**: `ghp_...` or `github_pat_...`
- **Usage**: Git MCP servers, repository integration

## 🔒 Secure Storage Methods

### Environment Files (.env)

#### Basic .env Setup
```bash
# .env file (never commit to git)
OPENAI_API_KEY=sk-proj-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-api03-your-anthropic-key-here
GOOGLE_API_KEY=your-google-api-key-here
IDEOGRAM_API_KEY=your-ideogram-api-key-here
PERPLEXITY_API_KEY=pplx-your-perplexity-key-here
GITHUB_TOKEN=ghp-your-github-token-here

# Optional: Environment settings
NODE_ENV=production
LOG_LEVEL=info
```

#### .env.example Template
```bash
# .env.example (safe to commit)
OPENAI_API_KEY=sk-proj-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-api03-your-anthropic-key-here
GOOGLE_API_KEY=your-google-api-key-here
IDEOGRAM_API_KEY=your-ideogram-api-key-here
PERPLEXITY_API_KEY=pplx-your-perplexity-key-here
GITHUB_TOKEN=ghp-your-github-token-here

# Copy this file to .env and replace with your actual keys
```

### System Environment Variables

#### Linux/macOS Setup
```bash
# Add to ~/.bashrc or ~/.zshrc
export OPENAI_API_KEY="sk-proj-your-key-here"
export ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"
export IDEOGRAM_API_KEY="your-ideogram-key-here"

# Reload shell configuration
source ~/.bashrc
```

#### Windows Setup
```powershell
# PowerShell (persistent)
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-proj-your-key-here", "User")
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "sk-ant-api03-your-key-here", "User")

# Command Prompt (session only)
set OPENAI_API_KEY=sk-proj-your-key-here
set ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

### Secure Key Management Tools

#### Using pass (Linux/macOS)
```bash
# Install pass
sudo apt install pass  # Ubuntu
brew install pass      # macOS

# Initialize password store
gpg --gen-key
pass init your-email@example.com

# Store API keys
pass insert ai/openai-api-key
pass insert ai/anthropic-api-key
pass insert ai/ideogram-api-key

# Retrieve keys
export OPENAI_API_KEY=$(pass ai/openai-api-key)
```

#### Using 1Password CLI
```bash
# Install 1Password CLI
brew install --cask 1password-cli

# Sign in
op signin

# Store API key
op item create --category="API Credential" --title="OpenAI API Key" \
  --field="api_key,concealed=sk-proj-your-key-here"

# Retrieve key
export OPENAI_API_KEY=$(op item get "OpenAI API Key" --field="api_key")
```

## ⚙️ Platform-Specific Configuration

### Agent Zero API Setup

#### Docker Environment Variables
```bash
# Start Agent Zero with API keys
docker run -d \
  --name agent-zero \
  -p 50020:80 \
  -p 50022:22 \
  -v "$(pwd):/a0" \
  -v "$(pwd)/work_dir:/root" \
  -e OPENAI_API_KEY="sk-proj-your-key-here" \
  -e ANTHROPIC_API_KEY="sk-ant-api03-your-key-here" \
  -e IDEOGRAM_API_KEY="your-ideogram-key-here" \
  -e PYTHONUNBUFFERED=1 \
  --restart unless-stopped \
  frdel/agent-zero-run:latest
```

#### Agent Zero .env Configuration
```bash
# agent-zero/.env
OPENAI_API_KEY=sk-proj-your-openai-key-here
ANTHROPIC_API_KEY=sk-ant-api03-your-anthropic-key-here
GOOGLE_API_KEY=your-google-api-key-here
PERPLEXITY_API_KEY=pplx-your-perplexity-key-here

# Agent Zero specific settings
WEB_UI_PORT=50020
SSH_PORT=50022
AUTH_LOGIN=admin
AUTH_PASSWORD=your-secure-password
```

### Cursor IDE API Setup

#### Settings Configuration
```json
// Cursor settings.json
{
  "cursor.general.apiKey": "sk-proj-your-openai-key-here",
  "cursor.general.model": "gpt-4",
  "cursor.anthropic.apiKey": "sk-ant-api03-your-anthropic-key-here",
  "cursor.anthropic.model": "claude-3-5-sonnet",
  "cursor.privacy.mode": "strict"
}
```

#### Environment Variables for Cursor
```bash
# For custom models or additional services
export CURSOR_OPENAI_API_KEY="sk-proj-your-key-here"
export CURSOR_ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"
```

### Claude Desktop API Setup

#### Authentication
Claude Desktop uses OAuth authentication through Anthropic accounts. No direct API key configuration needed for basic usage.

#### MCP Server API Keys
```json
// claude_desktop_config.json
{
  "mcpServers": {
    "ideogram": {
      "command": "npx",
      "args": ["-y", "@lyoncrypt/openai-image-1-ideogram-mcp@latest"],
      "env": {
        "IDEOGRAM_API_KEY": "your-ideogram-key-here",
        "OPENAI_API_KEY": "sk-proj-your-openai-key-here"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp-your-github-token-here"
      }
    }
  }
}
```

### Windsurf IDE API Setup

#### Built-in Authentication
Windsurf handles authentication through its account system. Additional API keys for custom integrations:

```json
// windsurf settings
{
  "windsurf.api.openai": "sk-proj-your-key-here",
  "windsurf.api.anthropic": "sk-ant-api03-your-key-here",
  "windsurf.mcp.servers": [
    {
      "name": "custom-api",
      "env": {
        "API_KEY": "your-custom-api-key"
      }
    }
  ]
}
```

### Augment Code API Setup

#### Account-Based Authentication
Augment Code uses account-based authentication. Additional API keys for custom models:

```json
// augment configuration
{
  "models": {
    "custom": {
      "endpoint": "https://api.custom-provider.com",
      "apiKey": "your-custom-api-key",
      "model": "custom-model-name"
    }
  }
}
```

## 🔐 Security Best Practices

### API Key Security

#### Do's ✅
- Store keys in environment variables or secure vaults
- Use different keys for development and production
- Regularly rotate API keys
- Set usage limits and monitoring
- Use least-privilege access
- Keep keys out of version control

#### Don'ts ❌
- Never commit API keys to git repositories
- Don't share keys in plain text
- Avoid hardcoding keys in source code
- Don't use production keys for testing
- Don't store keys in unsecured files

### Git Security

#### .gitignore Setup
```bash
# .gitignore
.env
.env.local
.env.production
.env.staging
*.key
*.pem
config/secrets.json
claude_desktop_config.json
```

#### Pre-commit Hooks
```bash
# Install git-secrets
brew install git-secrets  # macOS
sudo apt install git-secrets  # Ubuntu

# Configure git-secrets
git secrets --register-aws
git secrets --install

# Add custom patterns
git secrets --add 'sk-[a-zA-Z0-9]{48}'  # OpenAI keys
git secrets --add 'sk-ant-api03-[a-zA-Z0-9-_]{95}'  # Anthropic keys
```

### Key Rotation

#### Automated Rotation Script
```bash
#!/bin/bash
# rotate-api-keys.sh

# Backup current keys
cp .env .env.backup.$(date +%Y%m%d)

# Generate new keys (implement based on provider APIs)
# Update .env file
# Restart services
# Verify functionality
# Revoke old keys

echo "API key rotation completed"
```

## 🔧 Troubleshooting

### Common Issues

#### Invalid API Key Format
```bash
# Check key format
echo $OPENAI_API_KEY | grep -E '^sk-(proj-)?[a-zA-Z0-9]{48,}'

# Validate key with API call
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

#### Environment Variables Not Loading
```bash
# Check if variables are set
env | grep -E "(OPENAI|ANTHROPIC|IDEOGRAM)"

# Source environment file
source .env

# Check shell configuration
echo $SHELL
cat ~/.bashrc | grep -E "(OPENAI|ANTHROPIC)"
```

#### Permission Errors
```bash
# Check file permissions
ls -la .env

# Fix permissions (readable by owner only)
chmod 600 .env

# Check directory permissions
ls -la ~/.config/
```

### Testing API Keys

#### OpenAI API Test
```bash
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Hello"}], "max_tokens": 5}' \
  https://api.openai.com/v1/chat/completions
```

#### Anthropic API Test
```bash
curl -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "claude-3-haiku-20240307", "max_tokens": 5, "messages": [{"role": "user", "content": "Hello"}]}' \
  https://api.anthropic.com/v1/messages
```

#### Ideogram API Test
```bash
curl -H "Api-Key: $IDEOGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"image_request": {"prompt": "test", "model": "V_2"}}' \
  https://api.ideogram.ai/generate
```

## ✅ Verification Checklist

### Security Audit
- [ ] API keys stored securely (not in code)
- [ ] .gitignore includes key files
- [ ] Environment variables properly set
- [ ] File permissions are restrictive (600)
- [ ] Keys are valid and working
- [ ] Usage monitoring is enabled
- [ ] Backup and rotation plan exists

### Functionality Test
- [ ] All AI services authenticate successfully
- [ ] MCP servers load with correct API keys
- [ ] Applications can access required services
- [ ] Error handling works for invalid keys
- [ ] Rate limiting is properly configured

## 🔗 Additional Resources

### API Documentation
- **OpenAI**: [platform.openai.com/docs](https://platform.openai.com/docs)
- **Anthropic**: [docs.anthropic.com](https://docs.anthropic.com)
- **Ideogram**: [ideogram.ai/api-docs](https://ideogram.ai/api-docs)
- **GitHub**: [docs.github.com/en/rest](https://docs.github.com/en/rest)

### Security Tools
- **git-secrets**: [github.com/awslabs/git-secrets](https://github.com/awslabs/git-secrets)
- **1Password CLI**: [developer.1password.com/docs/cli](https://developer.1password.com/docs/cli)
- **pass**: [passwordstore.org](https://www.passwordstore.org)
