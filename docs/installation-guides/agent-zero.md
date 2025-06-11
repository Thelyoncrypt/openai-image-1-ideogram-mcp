# Agent Zero Installation Guide

![Agent Zero](https://img.shields.io/badge/Agent%20Zero-AI%20Development-blue?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-Required-2496ED?style=for-the-badge&logo=docker)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)

## 📋 Overview

Agent Zero is a powerful AI-driven development environment that provides autonomous coding capabilities, tool integration, and advanced AI model support. This guide covers the complete Docker-based installation process with MCP (Model Context Protocol) integration.

## 🔧 Prerequisites

### System Requirements
- **Operating System**: Linux (Ubuntu 20.04+), macOS (10.15+), Windows 10/11 with WSL2
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 10GB free space for Docker images and data
- **CPU**: 4+ cores recommended for optimal performance

### Required Software
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Git**: For cloning repositories
- **Web Browser**: Chrome, Firefox, or Safari for web interface

### API Keys (Required)
Obtain API keys for the AI services you plan to use:
- **OpenAI API Key**: For GPT models
- **Anthropic API Key**: For Claude models
- **Google API Key**: For Gemini models (optional)
- **Perplexity API Key**: For research capabilities (optional)

## 📦 Installation Steps

### Step 1: Install Docker

#### Ubuntu/Debian
```bash
# Update package index
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Verify installation
docker --version
```

#### macOS
```bash
# Install Docker Desktop
brew install --cask docker

# Or download from: https://www.docker.com/products/docker-desktop/
```

#### Windows
1. Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
2. Install with WSL2 backend enabled
3. Restart system when prompted

### Step 2: Clone Agent Zero Repository

```bash
# Clone the official repository
git clone https://github.com/frdel/agent-zero.git
cd agent-zero

# Verify repository contents
ls -la
```

### Step 3: Configure Environment Variables

```bash
# Copy example environment file
cp example.env .env

# Edit environment file with your API keys
nano .env
```

**Required Environment Variables:**
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Anthropic Configuration (optional)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Google Configuration (optional)
GOOGLE_API_KEY=your_google_api_key_here

# Perplexity Configuration (optional)
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Agent Zero Configuration
WEB_UI_PORT=50020
WEB_UI_HOST=localhost
AUTH_LOGIN=admin
AUTH_PASSWORD=your_secure_password_here

# SSH Configuration
SSH_PORT=50022
ROOT_PASSWORD=your_root_password_here
```

### Step 4: Launch Agent Zero with Docker

```bash
# Start Agent Zero container
docker run -d \
  --name agent-zero \
  -p 50020:80 \
  -p 50022:22 \
  -v "$(pwd):/a0" \
  -v "$(pwd)/work_dir:/root" \
  -e PYTHONUNBUFFERED=1 \
  --restart unless-stopped \
  frdel/agent-zero-run:latest

# Verify container is running
docker ps
```

### Step 5: Access Agent Zero

1. **Web Interface**: Open `http://localhost:50020` in your browser
2. **SSH Access**: Connect via SSH on port `50022`
3. **Login**: Use credentials from your `.env` file

## 🔌 MCP Integration Setup

### Configure MCP Servers

Create MCP configuration file:
```bash
# Create MCP configuration directory
mkdir -p work_dir

# Create MCP configuration file
cat > work_dir/mcp.json << 'EOF'
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user"],
      "disabled": false,
      "autoApprove": []
    },
    "ideogram-mcp": {
      "command": "npx",
      "args": ["-y", "@lyoncrypt/openai-image-1-ideogram-mcp@latest"],
      "env": {
        "IDEOGRAM_API_KEY": "your_ideogram_api_key_here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
EOF
```

### Restart Agent Zero
```bash
# Restart container to load MCP configuration
docker restart agent-zero

# Check logs for MCP server status
docker logs agent-zero --tail 20
```

## ✅ Verification

### Check Installation
```bash
# Verify container status
docker ps | grep agent-zero

# Check logs for errors
docker logs agent-zero

# Test web interface
curl -I http://localhost:50020
```

### Test MCP Integration
1. Access web interface at `http://localhost:50020`
2. Navigate to Settings → MCP Servers
3. Verify MCP servers are loaded and connected
4. Check for "Tools updated. Found X tools" in logs

## 🚀 Advanced Configuration

### Custom Port Configuration
```bash
# Stop existing container
docker stop agent-zero
docker rm agent-zero

# Start with custom ports
docker run -d \
  --name agent-zero \
  -p 8080:80 \
  -p 2222:22 \
  -v "$(pwd):/a0" \
  -v "$(pwd)/work_dir:/root" \
  -e PYTHONUNBUFFERED=1 \
  --restart unless-stopped \
  frdel/agent-zero-run:latest
```

### Performance Optimization
```bash
# Allocate more resources
docker run -d \
  --name agent-zero \
  --memory=8g \
  --cpus=4 \
  -p 50020:80 \
  -p 50022:22 \
  -v "$(pwd):/a0" \
  -v "$(pwd)/work_dir:/root" \
  -e PYTHONUNBUFFERED=1 \
  --restart unless-stopped \
  frdel/agent-zero-run:latest
```

## 🔧 Management Commands

### Container Management
```bash
# Start Agent Zero
docker start agent-zero

# Stop Agent Zero
docker stop agent-zero

# Restart Agent Zero
docker restart agent-zero

# View logs
docker logs agent-zero -f

# Access container shell
docker exec -it agent-zero bash
```

### Data Management
```bash
# Backup work directory
tar -czf agent-zero-backup-$(date +%Y%m%d).tar.gz work_dir/

# Update Agent Zero
docker pull frdel/agent-zero-run:latest
docker stop agent-zero
docker rm agent-zero
# Run docker run command again with latest image
```

## 🔗 Next Steps

1. **[Configure MCP Servers](../configuration/mcp-setup.md)** - Add custom tools and integrations
2. **[API Key Management](../configuration/api-keys.md)** - Secure API key configuration
3. **[Troubleshooting Guide](../troubleshooting/agent-zero-issues.md)** - Common issues and solutions

## 📞 Support

- **Official Repository**: [github.com/frdel/agent-zero](https://github.com/frdel/agent-zero)
- **Documentation**: [Agent Zero Docs](https://github.com/frdel/agent-zero/tree/main/docs)
- **Community**: [GitHub Discussions](https://github.com/frdel/agent-zero/discussions)
