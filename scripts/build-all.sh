#!/bin/bash

# Build all components of AFO

set -e

echo "🔨 Building AFO Project..."
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Build contract
echo "1️⃣  Building Smart Contract..."
cd "$PROJECT_ROOT/contracts"
./build.sh

if [ $? -ne 0 ]; then
    echo "❌ Contract build failed"
    exit 1
fi

echo ""

# Build frontend
echo "2️⃣  Building Frontend..."
cd "$PROJECT_ROOT/frontend"

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    bun install
fi

bun run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

echo ""
echo "✅ All components built successfully!"
echo ""
echo "To run the demo:"
echo "  cd frontend && bun run dev"
echo ""
echo "Or use the helper script:"
echo "  ./scripts/demo.sh"
