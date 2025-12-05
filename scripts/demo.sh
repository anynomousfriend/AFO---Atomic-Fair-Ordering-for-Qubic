#!/bin/bash

# AFO Demo Launch Script
# Launches the TUI demo with proper environment setup

set -e

echo "🚀 Launching AFO Demo..."

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun not found. Installing..."
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
fi

# Ensure we're in the right directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT/frontend"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
fi

# Launch the demo
echo "✨ Starting AFO TUI Demo..."
echo ""
echo "Keyboard shortcuts:"
echo "  q - Quit"
echo "  ? - Help"
echo "  a - Add user intent"
echo "  x - Add attacker intent"
echo "  c - Close epoch"
echo "  e - Execute"
echo "  r - Reset"
echo ""

bun run dev
