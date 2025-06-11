# Windsurf IDE Installation Guide

![Windsurf IDE](https://img.shields.io/badge/Windsurf-Agentic%20IDE-blue?style=for-the-badge)
![AI Agent](https://img.shields.io/badge/AI-Agent%20Powered-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)

## 📋 Overview

Windsurf Editor is the first agentic IDE that combines the power of AI agents with traditional copilot functionality. Built by Codeium, it offers a revolutionary "Flows" experience where AI and developers work together seamlessly. This guide covers the complete installation and setup process.

## 🔧 Prerequisites

### System Requirements

#### macOS
- **Version**: macOS with Apple security update support (latest + 2 previous versions)
- **Not Supported**: macOS 10.15 (Catalina)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB free space

#### Linux
- **glibc**: >= 2.28
- **glibcxx**: >= 3.4.25
- **Supported Distributions**:
  - Ubuntu 20.04+
  - Debian 10+
  - Fedora 36+
  - RHEL 8+
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB free space

#### Windows
- **Version**: Windows 10 (64-bit) or Windows 11
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB free space

### Required Accounts
- **Windsurf Account**: Free account for basic features
- **Pro Account**: For premium features and increased limits

## 📦 Installation Steps

### macOS Installation

#### Method 1: Direct Download
```bash
# Download from official website
curl -L https://windsurf.com/download/mac -o windsurf-installer.dmg

# Or visit https://windsurf.com/download and select macOS
```

#### Method 2: Homebrew
```bash
# Add Windsurf tap (if available)
brew tap windsurf/windsurf

# Install Windsurf
brew install --cask windsurf

# Verify installation
windsurf --version
```

### Windows Installation

#### Method 1: Direct Download
1. Visit [windsurf.com/download](https://windsurf.com/download)
2. Click "Download for Windows"
3. Run the downloaded installer (.exe)
4. Follow the installation wizard
5. Launch Windsurf from Start Menu

#### Method 2: Package Manager
```powershell
# Using Chocolatey (if package available)
choco install windsurf

# Using Scoop (if package available)
scoop bucket add extras
scoop install windsurf

# Using Winget (if package available)
winget install Windsurf.WindsurfEditor
```

### Linux Installation

#### Ubuntu/Debian
```bash
# Download the .deb package
wget https://windsurf.com/download/linux/deb -O windsurf.deb

# Install with apt
sudo apt install ./windsurf.deb

# Or with dpkg
sudo dpkg -i windsurf.deb
sudo apt-get install -f  # Fix dependencies if needed

# Launch Windsurf
windsurf
```

#### Fedora/RHEL
```bash
# Download RPM package
wget https://windsurf.com/download/linux/rpm -O windsurf.rpm

# Install with dnf
sudo dnf install windsurf.rpm

# Or with rpm
sudo rpm -i windsurf.rpm

# Launch Windsurf
windsurf
```

#### AppImage (Universal Linux)
```bash
# Download AppImage
wget https://windsurf.com/download/linux/appimage -O windsurf.AppImage

# Make executable
chmod +x windsurf.AppImage

# Run Windsurf
./windsurf.AppImage

# Optional: Install system-wide
sudo mv windsurf.AppImage /usr/local/bin/windsurf
```

## 🚀 Initial Setup

### First Launch
1. **Launch Windsurf** from your applications menu
2. **Create Account**:
   - Click "Sign Up" or "Create Account"
   - Use email or GitHub/Google authentication
   - Verify your email address
3. **Welcome Tour**: Complete the interactive tutorial to learn key features

### Account Configuration
```bash
# Sign in via command line (if available)
windsurf auth login

# Check account status
windsurf auth status
```

### VS Code Migration
Windsurf is built on VS Code, making migration seamless:

1. **Automatic Import**: Windsurf can automatically detect and import:
   - Extensions
   - Settings
   - Keybindings
   - Themes
   - Workspaces

2. **Manual Import**:
   - Open Command Palette (`Cmd/Ctrl + Shift + P`)
   - Run "Windsurf: Import VS Code Settings"
   - Select what to import

## 🤖 AI Features Configuration

### Cascade (AI Agent) Setup
Cascade is Windsurf's flagship AI agent feature:

1. **Enable Cascade**:
   - Open Settings (`Cmd/Ctrl + ,`)
   - Navigate to "Windsurf" → "Cascade"
   - Enable "Cascade AI Agent"

2. **Configure Context**:
   - Set codebase indexing preferences
   - Configure file inclusion/exclusion patterns
   - Adjust context window size

### Supercomplete Configuration
```json
// settings.json
{
  "windsurf.supercomplete.enabled": true,
  "windsurf.supercomplete.model": "windsurf-pro",
  "windsurf.supercomplete.maxSuggestions": 3,
  "windsurf.supercomplete.delay": 100
}
```

### Model Context Protocol (MCP) Setup
Windsurf supports MCP for custom tool integration:

```json
// mcp-config.json
{
  "mcpServers": {
    "custom-tool": {
      "command": "node",
      "args": ["/path/to/your/mcp-server.js"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

## ⚙️ Advanced Configuration

### Flows Configuration
Configure the AI-human collaboration experience:

```json
// settings.json
{
  "windsurf.flows.enabled": true,
  "windsurf.flows.autoSuggest": true,
  "windsurf.flows.contextAwareness": "high",
  "windsurf.flows.multiFileEditing": true,
  "windsurf.flows.terminalIntegration": true
}
```

### Performance Optimization
```json
// settings.json
{
  "windsurf.performance.indexingThreads": 4,
  "windsurf.performance.cacheSize": "2GB",
  "windsurf.performance.preloadModels": true,
  "windsurf.performance.backgroundProcessing": true
}
```

### Privacy Settings
```json
// settings.json
{
  "windsurf.privacy.telemetry": false,
  "windsurf.privacy.codeUpload": "encrypted",
  "windsurf.privacy.localProcessing": true
}
```

## 🎯 Key Features Setup

### Tab to Jump
Predictive cursor navigation:
```json
{
  "windsurf.tabToJump.enabled": true,
  "windsurf.tabToJump.confidence": 0.8,
  "windsurf.tabToJump.showPreview": true
}
```

### In-line Commands
Natural language code generation:
- **Shortcut**: `Cmd/Ctrl + I`
- **Terminal**: `Cmd/Ctrl + I` in terminal
- **Configuration**:
```json
{
  "windsurf.inlineCommand.enabled": true,
  "windsurf.inlineCommand.model": "windsurf-pro",
  "windsurf.inlineCommand.followUps": true
}
```

### Codelenses
One-click code understanding and refactoring:
```json
{
  "windsurf.codelenses.enabled": true,
  "windsurf.codelenses.showExplanations": true,
  "windsurf.codelenses.showRefactoring": true,
  "windsurf.codelenses.showTests": true
}
```

### @ Mentions in Cascade
Reference specific code elements:
- **Functions**: `@functionName`
- **Classes**: `@ClassName`
- **Files**: `@filename.js`
- **Directories**: `@src/components/`

## 🔧 Command Line Interface

### Basic Commands
```bash
# Open file or directory
windsurf file.js
windsurf /path/to/project

# Open with specific workspace
windsurf --workspace project.code-workspace

# New window
windsurf --new-window

# Wait for window to close
windsurf --wait file.js

# Show version
windsurf --version
```

### Extension Management
```bash
# Install extension
windsurf --install-extension publisher.extension-name

# List installed extensions
windsurf --list-extensions

# Disable extensions
windsurf --disable-extensions
```

## ✅ Verification

### Test Installation
1. **Launch Check**: Windsurf should start within 5 seconds
2. **AI Features Test**:
   - Create new file
   - Type `// Create a hello world function`
   - Press `Tab` to see Supercomplete suggestions
   - Use `Cmd/Ctrl + I` to test inline commands

### Performance Verification
```bash
# Check system resources
# Windsurf should use reasonable CPU/RAM
# Monitor via Task Manager/Activity Monitor

# Test Cascade
# Open a project and ask Cascade to explain code
# Response should be contextually accurate
```

## 🚀 Pro Features

### Free Pro Credits
New users receive:
- **100 prompt credits**
- **Premium large models access**
- **Unlimited Supercomplete**
- **Increased indexing limits**
- **Fast autocomplete speed**

### Upgrade to Pro
```bash
# Access via Settings → Account → Upgrade to Pro
# Or visit windsurf.com/pricing
```

## 🔧 Troubleshooting

### Common Issues

#### Installation Problems
```bash
# Linux: Missing dependencies
sudo apt update && sudo apt install -f

# macOS: Security warnings
sudo xattr -rd com.apple.quarantine /Applications/Windsurf.app

# Windows: Antivirus blocking
# Add Windsurf to antivirus exceptions
```

#### Performance Issues
```bash
# Clear cache
windsurf --clear-cache

# Reset settings
windsurf --reset-settings

# Disable extensions temporarily
windsurf --disable-extensions
```

## 🔗 Next Steps

1. **[Team Collaboration Setup](../configuration/team-windsurf.md)** - Configure Windsurf for teams
2. **[Custom MCP Integration](../configuration/windsurf-mcp.md)** - Add custom tools
3. **[Advanced Flows Configuration](../configuration/windsurf-flows.md)** - Optimize AI collaboration

## 📞 Support

- **Official Documentation**: [docs.windsurf.com](https://docs.windsurf.com)
- **Community Discord**: [discord.gg/GjCYNGChrw](https://discord.gg/GjCYNGChrw)
- **Feature Requests**: [windsurf.canny.io](https://windsurf.canny.io/feature-requests)
- **Email Support**: hello@windsurf.com
- **Reddit Community**: [r/windsurf](https://reddit.com/r/windsurf)
