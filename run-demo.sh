#!/bin/bash

# Simple demo launcher with proper PATH setup

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

cd "$(dirname "$0")/frontend"

echo "🚀 Launching AFO Demo..."
echo ""
echo "Keyboard shortcuts:"
echo "  a - Add user intent"
echo "  x - Add attacker intent"
echo "  c - Close epoch"
echo "  e - Execute"
echo "  r - Reset"
echo "  1/2/3 - Switch screens"
echo "  ? - Help"
echo "  q - Quit"
echo ""

bun run dev
