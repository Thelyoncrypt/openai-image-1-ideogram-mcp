# Cursor IDE Installation Guide

![Cursor IDE](https://img.shields.io/badge/Cursor-AI%20Code%20Editor-blue?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=for-the-badge)

## 📋 Overview

Cursor is an AI-powered code editor built for productivity. It combines the familiar feel of VS Code with advanced AI capabilities, including intelligent code completion, natural language editing, and codebase understanding. This guide covers the complete installation and setup process.

## 🔧 Prerequisites

### System Requirements
- **Operating System**: 
  - macOS 10.15 (Catalina) or later
  - Windows 10 version 1903 or later
  - Linux (Ubuntu 18.04+, Debian 10+, RHEL 8+, Fedora 32+)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 1GB free space for installation
- **Internet**: Required for AI features and updates

### Required Accounts
- **Cursor Account**: Free account for basic features
- **API Keys** (Optional but recommended):
  - OpenAI API key for GPT models
  - Anthropic API key for Claude models
  - Custom model API keys as needed

## 📦 Installation Steps

### macOS Installation

#### Method 1: Direct Download
```bash
# Download from official website
curl -L https://download.cursor.sh/mac -o cursor-installer.dmg

# Or visit https://www.cursor.com/ and click "Download for macOS"
```

#### Method 2: Homebrew
```bash
# Install via Homebrew Cask
brew install --cask cursor

# Verify installation
cursor --version
```

### Windows Installation

#### Method 1: Direct Download
1. Visit [cursor.com](https://www.cursor.com/)
2. Click "Download for Windows"
3. Run the downloaded installer
4. Follow the installation wizard

#### Method 2: Package Manager
```powershell
# Using Chocolatey
choco install cursor

# Using Scoop
scoop bucket add extras
scoop install cursor

# Using Winget
winget install Anysphere.Cursor
```

### Linux Installation

#### Ubuntu/Debian
```bash
# Download the .deb package
wget https://download.cursor.sh/linux/appImage/x64 -O cursor.AppImage

# Make executable
chmod +x cursor.AppImage

# Run Cursor
./cursor.AppImage

# Optional: Install system-wide
sudo mv cursor.AppImage /usr/local/bin/cursor
```

#### Arch Linux
```bash
# Using AUR helper (yay)
yay -S cursor-bin

# Or manual AUR installation
git clone https://aur.archlinux.org/cursor-bin.git
cd cursor-bin
makepkg -si
```

#### Fedora/RHEL
```bash
# Download RPM package
wget https://download.cursor.sh/linux/rpm/x64 -O cursor.rpm

# Install with dnf
sudo dnf install cursor.rpm

# Or with rpm
sudo rpm -i cursor.rpm
```

## 🚀 Initial Setup

### First Launch
1. **Launch Cursor** from your applications menu or command line
2. **Sign In/Create Account**: 
   - Click "Sign In" in the welcome screen
   - Create a free account or sign in with existing credentials
3. **Import Settings** (Optional):
   - Import VS Code settings, extensions, and keybindings
   - Choose "Import from VS Code" if prompted

### VS Code Migration
```bash
# Cursor can automatically import your VS Code setup
# During first launch, select "Import from VS Code"
# Or manually import later via:
# Command Palette (Cmd/Ctrl+Shift+P) → "Cursor: Import VS Code Settings"
```

## 🤖 AI Configuration

### API Key Setup

#### OpenAI Configuration
1. **Get API Key**: Visit [platform.openai.com](https://platform.openai.com/api-keys)
2. **Add to Cursor**:
   - Open Settings (`Cmd/Ctrl + ,`)
   - Navigate to "Cursor" → "General"
   - Enter your OpenAI API key
   - Select preferred model (GPT-4, GPT-3.5-turbo, etc.)

#### Anthropic Claude Setup
1. **Get API Key**: Visit [console.anthropic.com](https://console.anthropic.com/)
2. **Configure in Cursor**:
   - Settings → "Cursor" → "Models"
   - Add Anthropic API key
   - Select Claude model (Claude-3, Claude-2, etc.)

#### Custom Models
```json
// Settings.json configuration for custom models
{
  "cursor.models": {
    "custom": {
      "apiKey": "your-api-key",
      "baseURL": "https://your-custom-endpoint.com",
      "model": "your-model-name"
    }
  }
}
```

### Privacy Settings
```json
// Configure privacy mode in settings.json
{
  "cursor.privacy.mode": "strict", // Options: "strict", "normal", "off"
  "cursor.privacy.codeUpload": false,
  "cursor.privacy.telemetry": false
}
```

## ⚙️ Advanced Configuration

### Workspace Settings
```json
// .cursor/settings.json in your project root
{
  "cursor.ai.enabled": true,
  "cursor.ai.model": "gpt-4",
  "cursor.ai.temperature": 0.7,
  "cursor.ai.maxTokens": 2048,
  "cursor.ai.contextFiles": [
    "README.md",
    "package.json",
    "src/**/*.ts"
  ]
}
```

### Keybindings Customization
```json
// keybindings.json
[
  {
    "key": "cmd+k",
    "command": "cursor.ai.chat",
    "when": "editorTextFocus"
  },
  {
    "key": "cmd+l",
    "command": "cursor.ai.edit",
    "when": "editorTextFocus"
  },
  {
    "key": "tab",
    "command": "cursor.ai.acceptSuggestion",
    "when": "cursorSuggestionVisible"
  }
]
```

### Extensions Integration
```bash
# Install popular extensions for enhanced AI coding
cursor --install-extension ms-python.python
cursor --install-extension ms-vscode.vscode-typescript-next
cursor --install-extension bradlc.vscode-tailwindcss
cursor --install-extension esbenp.prettier-vscode
cursor --install-extension ms-vscode.vscode-json
```

## 🎯 Key Features Setup

### Tab Completion
- **Enable**: Settings → "Cursor" → "Tab Completion" → Enable
- **Configure**: Set prediction confidence threshold
- **Customize**: Choose when to show suggestions

### Chat Interface
- **Access**: `Cmd/Ctrl + K` or click chat icon
- **Configure**: Set default model and context
- **Customize**: Add system prompts and preferences

### Codebase Context
- **Index Codebase**: Cursor automatically indexes your project
- **Configure Scope**: Settings → "Cursor" → "Codebase" → Set included/excluded files
- **Optimize**: Adjust indexing frequency and depth

### Natural Language Editing
- **Access**: `Cmd/Ctrl + L` or select code and use chat
- **Configure**: Set editing preferences and safety levels
- **Customize**: Create custom editing commands

## 🔧 Command Line Interface

### Basic Commands
```bash
# Open file or directory
cursor file.js
cursor /path/to/project

# Open with specific workspace
cursor --workspace /path/to/workspace.code-workspace

# Install extension
cursor --install-extension publisher.extension-name

# List installed extensions
cursor --list-extensions

# Show version
cursor --version
```

### Advanced Usage
```bash
# Open in new window
cursor --new-window /path/to/project

# Wait for window to close
cursor --wait file.js

# Disable extensions
cursor --disable-extensions

# Verbose logging
cursor --verbose
```

## ✅ Verification

### Test Installation
```bash
# Check version
cursor --version

# Test AI features
# 1. Open Cursor
# 2. Create new file
# 3. Type "// Create a hello world function"
# 4. Press Tab to see AI completion
```

### Performance Check
1. **Startup Time**: Should launch within 3-5 seconds
2. **AI Response**: Tab completion should appear within 1-2 seconds
3. **Memory Usage**: Check Task Manager/Activity Monitor for reasonable RAM usage

## 🚀 Pro Tips

### Productivity Shortcuts
- **`Tab`**: Accept AI suggestion
- **`Cmd/Ctrl + K`**: Open AI chat
- **`Cmd/Ctrl + L`**: Edit selection with AI
- **`Cmd/Ctrl + Shift + L`**: Generate code from comment
- **`Esc`**: Dismiss AI suggestion

### Best Practices
1. **Write Clear Comments**: AI works better with descriptive comments
2. **Use Descriptive Variable Names**: Helps AI understand context
3. **Keep Files Organized**: Better codebase understanding
4. **Regular Updates**: Keep Cursor updated for latest AI improvements

### Optimization Tips
```json
// Optimize performance in settings.json
{
  "cursor.ai.cacheSize": "1GB",
  "cursor.ai.preloadModels": true,
  "cursor.ai.backgroundIndexing": true,
  "cursor.performance.highPerformanceMode": true
}
```

## 🔗 Next Steps

1. **[Configure Team Settings](../configuration/team-setup.md)** - Set up Cursor for team collaboration
2. **[Custom Model Integration](../configuration/custom-models.md)** - Add your own AI models
3. **[Troubleshooting Guide](../troubleshooting/cursor-issues.md)** - Common issues and solutions

## 📞 Support

- **Official Documentation**: [docs.cursor.com](https://docs.cursor.com)
- **Community Forum**: [forum.cursor.com](https://forum.cursor.com)
- **GitHub**: [github.com/getcursor/cursor](https://github.com/getcursor/cursor)
- **Email Support**: hi@cursor.com
