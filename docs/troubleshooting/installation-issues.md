# Installation Issues Troubleshooting Guide

![Troubleshooting](https://img.shields.io/badge/Troubleshooting-Installation-red?style=for-the-badge)
![Support](https://img.shields.io/badge/Support-Guide-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Comprehensive-green?style=for-the-badge)

## 📋 Overview

This guide provides solutions for common installation issues across all AI-powered development environments including Agent Zero, Cursor IDE, Windsurf IDE, Claude Desktop, and Augment Code.

## 🔧 General Prerequisites Issues

### Node.js Version Problems

#### Issue: Outdated Node.js Version
```bash
# Check current version
node --version

# If version is < 18, update Node.js
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Using package manager
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node@18

# Windows
winget install OpenJS.NodeJS
```

#### Issue: npm Permission Errors
```bash
# Fix npm permissions (Linux/macOS)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Alternative: Use npx instead of global installs
npx package-name instead of npm install -g package-name
```

### Docker Issues

#### Issue: Docker Not Installed or Running
```bash
# Check Docker status
docker --version
docker ps

# Install Docker (Ubuntu)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# macOS: Install Docker Desktop
brew install --cask docker

# Windows: Download from docker.com
```

#### Issue: Docker Permission Denied
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
newgrp docker

# Test Docker access
docker run hello-world
```

## 🚀 Agent Zero Installation Issues

### Docker Container Problems

#### Issue: Port Already in Use
```bash
# Check what's using the port
lsof -i :50020
netstat -tulpn | grep 50020

# Kill process using the port
sudo kill -9 PID_NUMBER

# Or use different port
docker run -d --name agent-zero -p 8080:80 frdel/agent-zero-run:latest
```

#### Issue: Container Won't Start
```bash
# Check Docker logs
docker logs agent-zero

# Remove and recreate container
docker stop agent-zero
docker rm agent-zero
docker pull frdel/agent-zero-run:latest

# Start with verbose logging
docker run -d --name agent-zero \
  -p 50020:80 \
  -v "$(pwd):/a0" \
  -e PYTHONUNBUFFERED=1 \
  --restart unless-stopped \
  frdel/agent-zero-run:latest
```

#### Issue: Volume Mount Problems
```bash
# Check current directory permissions
ls -la $(pwd)

# Fix permissions (Linux/macOS)
chmod 755 $(pwd)
chmod -R 644 $(pwd)/*

# Windows: Use absolute paths
docker run -d --name agent-zero \
  -p 50020:80 \
  -v "C:\path\to\agent-zero:/a0" \
  frdel/agent-zero-run:latest
```

### Environment Configuration Issues

#### Issue: API Keys Not Working
```bash
# Check .env file format
cat .env

# Ensure no spaces around = sign
OPENAI_API_KEY=sk-your-key-here
# NOT: OPENAI_API_KEY = sk-your-key-here

# Test API key validity
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

## 💻 IDE Installation Issues

### Cursor IDE Problems

#### Issue: Installation Fails on macOS
```bash
# Check macOS version
sw_vers

# If macOS < 10.15, update system or use alternative
# Clear quarantine attribute
sudo xattr -rd com.apple.quarantine /Applications/Cursor.app

# Install via Homebrew if direct download fails
brew install --cask cursor
```

#### Issue: Extensions Not Loading
```bash
# Reset Cursor settings
rm -rf ~/.cursor
# Or on Windows: Remove %APPDATA%\Cursor

# Reinstall Cursor
brew uninstall --cask cursor
brew install --cask cursor

# Import VS Code settings manually
# Command Palette → "Cursor: Import VS Code Settings"
```

### Windsurf IDE Problems

#### Issue: Linux Dependencies Missing
```bash
# Ubuntu/Debian missing dependencies
sudo apt update
sudo apt install -y libnss3 libatk-bridge2.0-0 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxss1 libasound2

# Fedora/RHEL
sudo dnf install -y nss atk at-spi2-atk libdrm libXcomposite libXdamage libXrandr mesa-libgbm libXScrnSaver alsa-lib
```

#### Issue: AppImage Won't Run
```bash
# Make AppImage executable
chmod +x windsurf.AppImage

# Install FUSE if needed (older Linux systems)
sudo apt install fuse libfuse2

# Run with verbose output
./windsurf.AppImage --verbose
```

### Claude Desktop Problems

#### Issue: Authentication Fails
```bash
# Clear authentication cache
# macOS
rm -rf ~/Library/Application\ Support/Claude/auth

# Windows
rmdir /s "%APPDATA%\Claude\auth"

# Linux
rm -rf ~/.config/Claude/auth

# Restart Claude Desktop and re-authenticate
```

#### Issue: MCP Configuration Not Loading
```bash
# Check configuration file location and syntax
# macOS
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .

# Validate JSON syntax
jq . claude_desktop_config.json

# Check file permissions
chmod 644 claude_desktop_config.json
```

### Augment Code Problems

#### Issue: VS Code Extension Not Installing
```bash
# Check VS Code version
code --version

# Update VS Code if needed
# Linux
sudo apt update && sudo apt upgrade code

# macOS
brew upgrade --cask visual-studio-code

# Install extension manually
code --install-extension augment.augment-code --force
```

#### Issue: Authentication Loop
```bash
# Clear Augment authentication
# VS Code settings
code --uninstall-extension augment.augment-code
rm -rf ~/.vscode/extensions/augment.*

# Reinstall and re-authenticate
code --install-extension augment.augment-code
```

## 🔌 MCP Server Issues

### Installation Problems

#### Issue: MCP Server Package Not Found
```bash
# Update npm registry
npm config set registry https://registry.npmjs.org/

# Clear npm cache
npm cache clean --force

# Install with verbose logging
npm install -g @modelcontextprotocol/server-filesystem --verbose

# Use npx if global install fails
npx -y @modelcontextprotocol/server-filesystem
```

#### Issue: Python MCP Server Issues
```bash
# Check Python version
python3 --version

# Install pip if missing
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py

# Install MCP Python SDK
pip3 install mcp

# Create virtual environment for MCP servers
python3 -m venv mcp-env
source mcp-env/bin/activate
pip install mcp
```

### Configuration Problems

#### Issue: MCP Server Won't Connect
```bash
# Test server manually
npx @modelcontextprotocol/server-filesystem /tmp

# Check server logs
export MCP_LOG_LEVEL=debug
npx @modelcontextprotocol/server-filesystem /tmp

# Validate configuration
jq . mcp-config.json
```

#### Issue: Permission Denied Errors
```bash
# Check directory permissions
ls -la /path/to/directory

# Fix permissions for MCP access
chmod 755 /path/to/directory
chmod 644 /path/to/directory/*

# Use safer directory for testing
npx @modelcontextprotocol/server-filesystem ~/Documents
```

## 🌐 Network and Connectivity Issues

### Firewall Problems

#### Issue: Ports Blocked by Firewall
```bash
# Linux: Open ports in firewall
sudo ufw allow 50020
sudo ufw allow 50022

# Check if ports are open
netstat -tulpn | grep :50020

# Windows: Add firewall rule
netsh advfirewall firewall add rule name="Agent Zero" dir=in action=allow protocol=TCP localport=50020
```

### Proxy Issues

#### Issue: Corporate Proxy Blocking
```bash
# Configure npm proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Configure Docker proxy
mkdir -p ~/.docker
cat > ~/.docker/config.json << EOF
{
  "proxies": {
    "default": {
      "httpProxy": "http://proxy.company.com:8080",
      "httpsProxy": "http://proxy.company.com:8080"
    }
  }
}
EOF

# Set environment variables
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
```

## 💾 Storage and Performance Issues

### Disk Space Problems

#### Issue: Insufficient Disk Space
```bash
# Check disk usage
df -h

# Clean Docker images and containers
docker system prune -a

# Clean npm cache
npm cache clean --force

# Clean package caches
# Ubuntu/Debian
sudo apt autoremove && sudo apt autoclean

# macOS
brew cleanup
```

### Memory Issues

#### Issue: Out of Memory Errors
```bash
# Check memory usage
free -h  # Linux
vm_stat  # macOS

# Increase Docker memory limit
# Docker Desktop → Settings → Resources → Memory

# Close unnecessary applications
# Monitor memory usage
top  # Linux/macOS
taskmgr  # Windows
```

## 🔧 Platform-Specific Solutions

### Windows-Specific Issues

#### Issue: WSL2 Problems
```powershell
# Update WSL2
wsl --update

# Set WSL2 as default
wsl --set-default-version 2

# Install Ubuntu in WSL2
wsl --install -d Ubuntu

# Configure Docker for WSL2
# Docker Desktop → Settings → General → Use WSL2 based engine
```

### macOS-Specific Issues

#### Issue: Gatekeeper Blocking Apps
```bash
# Allow app through Gatekeeper
sudo spctl --master-disable

# Or for specific app
sudo xattr -rd com.apple.quarantine /Applications/AppName.app

# Re-enable Gatekeeper after installation
sudo spctl --master-enable
```

### Linux-Specific Issues

#### Issue: Missing System Libraries
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y build-essential curl wget git

# Fedora/RHEL
sudo dnf groupinstall "Development Tools"
sudo dnf install curl wget git

# Arch Linux
sudo pacman -S base-devel curl wget git
```

## ✅ Verification Steps

### Test Complete Installation
```bash
# Test Node.js and npm
node --version && npm --version

# Test Docker
docker run hello-world

# Test AI platforms
# Agent Zero: http://localhost:50020
# Cursor: cursor --version
# Claude: Check app launches
# Augment: augment --version

# Test MCP servers
npx @modelcontextprotocol/server-filesystem /tmp --test
```

## 🔗 Getting Help

### Log Collection
```bash
# Collect system information
uname -a
node --version
docker --version
npm --version

# Collect application logs
docker logs agent-zero > agent-zero.log
code --log debug > vscode.log
```

### Support Channels
- **Agent Zero**: [GitHub Issues](https://github.com/frdel/agent-zero/issues)
- **Cursor**: [Forum](https://forum.cursor.com)
- **Windsurf**: [Discord](https://discord.gg/GjCYNGChrw)
- **Claude**: [Support](https://support.anthropic.com)
- **Augment**: [Support Portal](https://support.augmentcode.com)

## 📞 Emergency Recovery

### Complete Reset
```bash
# Nuclear option: Reset everything
docker system prune -a
rm -rf ~/.npm ~/.cursor ~/.config/Claude
npm cache clean --force

# Reinstall from scratch following installation guides
```
