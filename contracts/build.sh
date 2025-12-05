#!/bin/bash

echo "🔨 Building AFO Contract..."

# Compile the contract header (validation only)
g++ -std=c++17 -c -Wall -Wextra -O3 -o AFOPool.o AFOPool.h 2>&1 | tee build.log

if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "✅ Contract compiled successfully!"
    ls -lh AFOPool.o
else
    echo "❌ Build failed. Check build.log for details."
    exit 1
fi
