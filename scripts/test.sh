#!/bin/bash

# Test script for AFO

set -e

echo "🧪 Testing AFO Project..."
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Test contract compilation
echo "1️⃣  Testing Contract Compilation..."
cd "$PROJECT_ROOT/contracts"
./build.sh > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "   ✅ Contract compiles successfully"
else
    echo "   ❌ Contract compilation failed"
    exit 1
fi

# Test frontend build
echo "2️⃣  Testing Frontend Build..."
cd "$PROJECT_ROOT/frontend"

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

bun run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "   ✅ Frontend builds successfully"
else
    echo "   ❌ Frontend build failed"
    exit 1
fi

# Check file sizes
echo "3️⃣  Checking Build Artifacts..."
CONTRACT_SIZE=$(du -h "$PROJECT_ROOT/contracts/AFOPool.o" | cut -f1)
FRONTEND_SIZE=$(du -h "$PROJECT_ROOT/frontend/dist/app.js" | cut -f1)

echo "   📦 Contract: $CONTRACT_SIZE"
echo "   📦 Frontend: $FRONTEND_SIZE"

echo ""
echo "✅ All tests passed!"
