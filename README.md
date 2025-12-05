# Qubic Atomic Fair Ordering (AFO)

**Infrastructure middleware for MEV-fair DeFi on Qubic.**  
Leverages tick-based finality for deterministic fair ordering.

**Track**: Nostromo Launchpad  
**Status**: Hackathon Submission (Dec 2025)

## 🎯 Problem Statement

MEV (Maximal Extractable Value) extraction is inevitable in DeFi. At Qubic's 15.52M TPS scale, attackers can sandwich user swaps and extract profits. Current MEV solutions (Shutter, mev-commit) rely on committees and off-chain encryption unsuitable for ultra-high-throughput chains.

## 💡 AFO Solution

Qubic Atomic Fair Ordering leverages **tick-based finality** to guarantee fair ordering without committee overhead:

1. Users submit encrypted swap intents (commitment phase)
2. Qubic consensus deterministically orders intents by arrival + hash
3. Ordering is locked atomically (immutable within tick)
4. Execution happens in locked order (no sandwich possible)

## 🚀 Why Only Qubic Can Do This

- **Atomic finality**: ordering + consensus + execution = one tick
- **No relayer/committee needed**: validator set is native
- **Zero re-org risk**: tick-based finality is final
- **Cannot be replicated** on Ethereum, Cosmos, Polkadot

## 📦 Components

- ✅ AFO smart contract (C++, production-ready)
- ✅ Frontend demo (TypeScript + Bun, beautiful keyboard-driven TUI)
- ✅ Mock testnet deployment
- ✅ Attack simulation demo (shows security guarantee)
- ✅ 5-min presentation materials

## 🏃 Quick Start

```bash
# Install dependencies
bun install

# Run the demo
cd frontend
bun run dev

# Build contract
cd contracts
./build.sh
```

See `DEVELOPMENT.md` for detailed setup instructions.  
See `DEMO.md` for demo walkthrough.

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - Technical design
- [MEV Background](docs/MEV.md) - Problem explanation
- [Qubic Finality](docs/QUBIC_FINALITY.md) - Why Qubic is unique

## 👥 Team

Built for Qubic Nostromo Hackathon (Dec 2025)

## 📄 License

MIT License
