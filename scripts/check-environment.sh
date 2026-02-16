#!/bin/bash
# scripts/check-environment.sh
# Purpose: Validate Node.js presence and version for Redragon Reins.

MIN_NODE_VERSION=18

# 1. Check if Node is installed at all
if ! command -v node &> /dev/null; then
    echo "❌ CRITICAL: Node.js is NOT installed."
    echo "----------------------------------------------------------"
    echo "Redragon Reins requires Node.js to communicate with your USB hardware."
    echo "Please install Node.js $MIN_NODE_VERSION or higher:"
    echo "  macOS (Homebrew): brew install node"
    echo "  Linux (apt):      sudo apt install nodejs"
    echo "  Download:         https://nodejs.org"
    echo "----------------------------------------------------------"
    exit 1
fi

# 2. Extract major version number
CURRENT_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

# 3. Compare version
if [ "$CURRENT_VERSION" -lt "$MIN_NODE_VERSION" ]; then
    echo "⚠️  WARNING: Outdated Node.js version detected ($(node -v))."
    echo "Redragon Reins works best with Node.js $MIN_NODE_VERSION or higher."
    echo "Some USB HID features may be unstable on older versions."
    echo "Please consider updating your Node.js environment."
    # We exit here to prevent broken 'node-hid' installs later
    exit 1
fi

echo "✅ Environment Check: Node.js $(node -v) is ready."

# 4. Hand off to the scaffold script
echo "🛠  Running project scaffold..."
node scripts/scaffold.js