# AFO Development Guide

## Prerequisites

- **OS**: Ubuntu 24.04 LTS (or compatible Linux)
- **Runtime**: Bun v1.3+ (JavaScript/TypeScript runtime)
- **Compiler**: GCC/G++ 13+ (for C++ contract)
- **Git**: For version control

## Quick Setup

### 1. Install Bun

```bash
curl -fsSL https://bun.sh/install | bash

# Add to PATH
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Verify
bun --version
```

### 2. Install System Dependencies

```bash
sudo apt update
sudo apt install -y build-essential git curl
```

### 3. Clone and Setup

```bash
git clone <your-repo-url>
cd Atomic-Fair-Ordering-Guard

# Install frontend dependencies
cd frontend
bun install

# Build contract
cd ../contracts
./build.sh
```

## Building

### Smart Contract (C++)

```bash
cd contracts
./build.sh
```

This compiles `AFOPool.h` and validates the contract code.

### Frontend (TypeScript + Bun)

```bash
cd frontend

# Development mode (hot reload)
bun run dev

# Production build
bun run build

# Run production build
bun run start
```

## Project Structure

```
Atomic-Fair-Ordering-Guard/
├── contracts/           # C++ smart contracts
│   ├── AFOPool.h       # Main AFO contract
│   └── build.sh        # Build script
├── frontend/           # TypeScript TUI
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── services/   # Mock testnet service
│   │   ├── types/      # TypeScript types
│   │   └── utils/      # Utilities and theme
│   └── dist/           # Built output
├── scripts/            # Deployment and test scripts
└── docs/               # Additional documentation

```

## Running the Demo

```bash
cd frontend
bun run dev
```

### Keyboard Controls

- **q**: Quit application
- **?**: Toggle help screen
- **1-3**: Switch between screens (Main, Intents, Attack)
- **a**: Add random user intent
- **x**: Add attacker intent (sandwich attempt)
- **c**: Close epoch (lock ordering)
- **e**: Execute batch
- **r**: Reset epoch
- **↑/↓**: Navigate intents list

## Development Workflow

1. **Make changes** to contract or frontend
2. **Build** to verify no errors
3. **Test** the demo walkthrough
4. **Commit** with descriptive messages
5. **Push** to repository

## Troubleshooting

### Bun command not found

```bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

Add these lines to your `~/.bashrc` or `~/.zshrc` for persistence.

### Contract build errors

Ensure GCC 13+ is installed:
```bash
gcc --version
```

### Frontend errors

Clear dependencies and reinstall:
```bash
cd frontend
rm -rf node_modules bun.lock
bun install
```

## Testing

The project uses a mock testnet for demonstration purposes. This allows for:
- Instant feedback without network delays
- Deterministic behavior for demos
- No external dependencies

Real testnet integration can be added by implementing the actual Qubic RPC calls in `frontend/src/services/`.

## Performance

- **Contract**: Compiles to ~2.8MB object file
- **Frontend**: Bundles to ~1.69MB
- **Startup time**: < 1 second
- **Epoch cycle**: ~10 seconds (adjustable)

## Next Steps

- Add unit tests for contract logic
- Implement real Qubic testnet integration
- Add CI/CD pipeline
- Performance benchmarking
- Security audit

## Contributing

This is a hackathon project. For contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
