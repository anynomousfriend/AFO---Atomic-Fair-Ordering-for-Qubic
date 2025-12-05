# AFO Architecture

## System Overview

AFO (Atomic Fair Ordering) is a MEV-prevention middleware that leverages Qubic's unique tick-based finality to guarantee deterministic transaction ordering without committees or off-chain components.

## Core Components

### 1. Smart Contract Layer (C++)

**File**: `contracts/AFOPool.h`

**Purpose**: On-chain enforcement of fair ordering and swap execution

**Key Structures**:

```cpp
struct Intent {
    unsigned char user[32];     // User identity
    uint64_t commitHash;        // Commitment hash
    uint64_t timestamp;         // Submission time
    uint64_t amountIn;          // Swap amount
    unsigned char tokenIn;      // Token identifier
}

struct Epoch {
    unsigned int id;            // Epoch number
    uint64_t startTick;         // Start tick
    uint64_t closeTick;         // Close tick
    bool locked;                // Lock status
    unsigned int intentCount;   // Number of intents
}

struct AMMState {
    uint64_t reserveA;          // Token A reserves
    uint64_t reserveB;          // Token B reserves
    uint64_t feeAccumulated;    // Accumulated fees
}
```

**Core Functions**:

1. `submit_intent()` - Accept intent during commitment phase
2. `lock_epoch()` - Finalize ordering (no more submissions)
3. `execute_epoch()` - Execute all intents in locked order
4. `reset_epoch()` - Start new epoch

**Ordering Algorithm**:
```
For each intent pair (a, b):
    if a.timestamp != b.timestamp:
        order by timestamp (earlier first)
    else:
        order by commitHash (deterministic)
```

This ensures:
- Deterministic ordering (same inputs = same output)
- No manipulation possible (hash is unpredictable)
- Fair treatment (timestamp-first is natural order)

### 2. Frontend Layer (TypeScript + React + Ink)

**Purpose**: Beautiful terminal UI for interaction and demonstration

**Architecture**:
```
src/
├── index.tsx              # Entry point
├── components/
│   ├── App.tsx           # Main application logic
│   ├── Header.tsx        # Header display
│   ├── EpochControl.tsx  # Epoch management
│   ├── IntentsList.tsx   # Intent visualization
│   ├── AttackDemo.tsx    # Attack simulation
│   └── Footer.tsx        # Navigation footer
├── services/
│   └── mockTestnet.ts    # Mock Qubic testnet
├── types/
│   └── index.ts          # TypeScript definitions
└── utils/
    └── theme.ts          # Colors and formatting
```

**State Management**:
- React hooks for local state
- No external state management (simple, fast)
- Event-driven keyboard input

**User Flow**:
```
[User] -> [A] Add Intent -> Intent Pool (pending)
       -> [C] Close Epoch -> Sort & Lock
       -> [E] Execute -> AMM Swap
       -> [R] Reset -> New Epoch
```

### 3. Mock Testnet Service

**Purpose**: Simulate Qubic testnet behavior for demos

**Features**:
- Tick counter simulation
- Hash generation (deterministic)
- Connection status management
- Intent submission simulation

**Future**: Replace with real Qubic RPC client

## Data Flow

### Commitment Phase
```
User → Frontend → submit_intent() → Contract
                                      ↓
                               Intent Pool (pending)
```

### Ordering Phase
```
Frontend → lock_epoch() → Contract
                           ↓
                    Sort by (timestamp, hash)
                           ↓
                    Mark all LOCKED
```

### Execution Phase
```
Frontend → execute_epoch() → Contract
                               ↓
                        For each intent:
                          - Calculate AMM output
                          - Update reserves
                          - Mark EXECUTED
```

## Security Model

### Attack Prevention

**1. Sandwich Attacks**
- **How it works**: Attacker places buy before victim's swap, sell after
- **AFO Prevention**: Order locked by timestamp, attacker cannot insert
- **Result**: Sandwich impossible

**2. Frontrunning**
- **How it works**: Attacker sees pending tx, submits with higher gas
- **AFO Prevention**: No gas market, timestamp is only priority
- **Result**: Frontrunning impossible

**3. Backrunning**
- **How it works**: Attacker submits tx immediately after victim
- **AFO Prevention**: Hash secondary sort prevents prediction
- **Result**: Backrunning unpredictable, not profitable

### Assumptions

**Trusted**:
- Qubic validators (timestamp assignment)
- Tick finality (no re-orgs)
- Consensus mechanism

**Not Trusted**:
- Users (may be attackers)
- Intent order (explicitly sorted)
- External services

## Performance Characteristics

### Time Complexity

- **submit_intent()**: O(1)
- **lock_epoch()**: O(1)
- **execute_epoch()**: O(n²) for sort + O(n) for execution
  - Total: O(n²) where n = number of intents
  - With efficient sort: O(n log n)

### Space Complexity

- **Intent storage**: O(n) where n ≤ 1000
- **Global state**: O(1) (fixed structs)
- **Total**: O(n)

### Scalability

**Current**:
- Max 1000 intents per epoch
- ~10 second epoch duration
- 100 intents/second throughput

**Optimization Opportunities**:
- Use quicksort instead of bubble sort: O(n log n)
- Batch execution: process multiple epochs in parallel
- Sharding: separate pools for different token pairs

## Qubic-Specific Advantages

### Tick-Based Finality

Traditional blockchains:
```
Propose → Mempool → Block Build → Consensus → Finalize
(attackers can reorder at multiple stages)
```

Qubic:
```
Submit → Tick Consensus → Execute
(single atomic step, no reordering possible)
```

### No Mempool

- Traditional: Public mempool allows attackers to see pending txs
- Qubic: No public mempool, reduced attack surface

### Deterministic Execution

- Traditional: Gas markets allow priority manipulation
- Qubic: Tick-based ordering, no priority manipulation

## Comparison with Existing Solutions

| Feature | AFO (Qubic) | Flashbots | Shutter | mev-commit |
|---------|-------------|-----------|---------|------------|
| Committee | None | Yes | Yes | Yes |
| Off-chain | No | Yes | Yes | Yes |
| Latency | 1 tick | Seconds | Seconds | Seconds |
| Throughput | 15M TPS | < 1K TPS | < 1K TPS | < 1K TPS |
| Re-org Risk | Zero | Low | Low | Medium |
| Trust Model | Validators | Relayers | Threshold | Validators |

## Future Enhancements

### Phase 1: Production Readiness
- Real Qubic testnet integration
- Comprehensive unit tests
- Gas optimization (minimize tick usage)
- Error handling improvements

### Phase 2: Advanced Features
- Multiple token pairs
- Limit orders
- Cross-chain intents (via bridges)
- MEV revenue redistribution to users

### Phase 3: Ecosystem Integration
- SDK for developers
- API for frontend integration
- Analytics dashboard
- Monitoring and alerting

## Technical Debt

**Current Limitations**:
1. Bubble sort (O(n²)) - should use quicksort
2. Fixed max intents (1000) - should be dynamic
3. No gas metering - assumes free execution
4. Mock testnet - needs real integration

**Mitigation**:
- All solvable with incremental improvements
- Core design is sound and extensible

## References

- Qubic Whitepaper: [link]
- MEV Research: flashbots.net
- Atomic Fair Ordering: [academic paper]
- Tick-Based Consensus: [Qubic docs]
