# MEV (Maximal Extractable Value) Explained

## What is MEV?

MEV (originally "Miner Extractable Value", now "Maximal Extractable Value") refers to the profit that can be extracted by reordering, inserting, or censoring transactions within a block.

## Common MEV Attack Types

### 1. Sandwich Attacks

**How it works**:
```
Normal flow:
User submits: Buy 1000 TokenA for TokenB

Attacker sees this in mempool and:
1. Frontrun: Buy TokenA (raises price)
2. Let user trade execute (at worse price)
3. Backrun: Sell TokenA (profit from price movement)
```

**Example**:
- User wants to buy 1000 ETH
- Attacker buys 500 ETH first (price goes up 5%)
- User buys at inflated price
- Attacker sells 500 ETH (captures the 5% markup)
- User loses ~50 ETH in slippage
- Attacker gains ~50 ETH

**Real-world impact**: $200M+ lost to sandwich attacks in 2023

### 2. Frontrunning

**How it works**:
```
User submits profitable transaction
Attacker sees it, copies it with higher gas fee
Attacker's transaction executes first
```

**Examples**:
- NFT mints (bot buys before you)
- Liquidations (bot liquidates before you get the reward)
- Arbitrage (bot captures the profit opportunity)

### 3. Backrunning

**How it works**:
```
Large trade happens
Attacker immediately submits arbitrage trade
Captures price discrepancy before market equilibrates
```

**Example**:
- User swaps 10M USDC for ETH on Uniswap
- Price on Uniswap now differs from Binance
- Attacker arbitrages the difference

### 4. Time-Bandit Attacks

**How it works**:
```
Miner/validator reorganizes recent blocks
To insert their own profitable transaction
Even if it means losing block rewards
```

**Why it's dangerous**: Breaks finality assumptions

## MEV By The Numbers (2023)

- **Total MEV extracted**: $1.5B+
- **Sandwich attacks**: $200M+
- **Arbitrage**: $800M+
- **Liquidations**: $300M+
- **Average per block (Ethereum)**: ~$50K
- **Peak single transaction**: $20M

## Why MEV is Worse at Scale

### Problem: High TPS = More Opportunities

At Qubic's 15.52M TPS:
- More transactions = more potential victims
- More liquidity = larger sandwich profits
- Faster blocks = less time to react

**Calculation**:
```
Ethereum: ~15 TPS → $1.5B MEV/year
Qubic: 15.52M TPS → Proportionally $1.5 trillion MEV/year potential
```

(Obviously this doesn't scale linearly, but shows the scale of the problem)

### Problem: Current Solutions Don't Scale

**Flashbots** (Ethereum):
- Committee-based ordering
- Off-chain relayers
- ~1000 TPS maximum
- Cannot handle 15M TPS

**Shutter Network**:
- Threshold encryption
- Distributed key generation
- High latency (~seconds)
- Not suitable for high-speed trading

**mev-commit**:
- Pre-confirmation marketplace
- Requires coordination layer
- Adds complexity and latency

## Why AFO is Different

### Traditional Chain Flow
```
Submit → Mempool (visible) → Block Building (manipulable) → Consensus → Execute
        ↑_____________MEV attacks happen here____________↑
```

### Qubic with AFO
```
Submit → Tick Consensus (atomic) → Execute
        ↑____No gap, no attacks____↑
```

### Key Differences

| Aspect | Traditional | Qubic + AFO |
|--------|-------------|-------------|
| Mempool | Public, visible | No mempool |
| Ordering | Gas auction | Timestamp + hash |
| Finality | Eventual (minutes) | Immediate (1 tick) |
| Reordering | Possible | Impossible |
| Attack Surface | Multiple stages | Single atomic step |

## Economic Impact

### For Users
- **Without AFO**: Lose 1-5% per trade to MEV
- **With AFO**: Zero MEV losses
- **Annual savings** (assuming $100M volume): $1-5M

### For Protocols
- **Without AFO**: Users avoid platform due to MEV
- **With AFO**: Attract more users, higher liquidity
- **Competitive advantage**: Unique selling point

### For Ecosystem
- **Without AFO**: $1B+ extracted annually
- **With AFO**: $1B+ retained by users
- **Network effect**: Fairer system attracts more capital

## Academic Background

### Research Papers

1. **"Flash Boys 2.0"** (Daian et al., 2019)
   - First comprehensive MEV study
   - Documented $1M+ daily extraction
   - Coined term "Miner Extractable Value"

2. **"Flashbots: Frontrunning the MEV Crisis"** (2021)
   - Proposed off-chain auction for MEV
   - Democratic MEV redistribution
   - Used by 90%+ of Ethereum validators

3. **"Order-Fairness for Byzantine Consensus"** (Kelkar et al., 2020)
   - Theoretical foundations for fair ordering
   - Proves certain properties are achievable
   - Basis for systems like Shutter

4. **"Atomic Fair Exchange"** (Dwork et al., 1996)
   - Classic cryptography problem
   - Relevant to commitment schemes
   - Foundation for modern fair ordering

### Key Insights from Research

**Finding 1**: MEV is inevitable
- Can't prevent profit-seeking behavior
- Can only limit the means of extraction

**Finding 2**: Transparency doesn't help
- Public mempools enable attacks
- Private ordering creates centralization
- Need cryptographic commitments

**Finding 3**: Timing matters
- Whoever orders transactions has power
- Decentralizing ordering is key
- Atomic finality changes the game

**Finding 4**: Scale amplifies problems
- MEV grows with transaction volume
- Solutions must be scalable
- Qubic's architecture is uniquely suited

## Real-World Examples

### Case Study 1: Uniswap V2 Launch
- **Event**: New DEX launch, high excitement
- **MEV extracted**: $5M+ in first week
- **Method**: Frontrunning trades, sandwich attacks
- **Victims**: Regular users trying to trade

### Case Study 2: NFT Mint Bots
- **Event**: Popular NFT collection mint
- **MEV extracted**: $100K+ per mint
- **Method**: Frontrunning with higher gas fees
- **Victims**: Fans trying to mint at fair price

### Case Study 3: Liquidation Cascades
- **Event**: Market crash, many under-collateralized loans
- **MEV extracted**: $50M+ in one day
- **Method**: Frontrunning liquidation transactions
- **Victims**: Other liquidators, indirectly borrowers

### Case Study 4: Arbitrage Racing
- **Event**: Daily, constant activity
- **MEV extracted**: $500M+ annually
- **Method**: Faster transaction submission, better routing
- **Victims**: Slower arbitrageurs, indirectly traders

## Why Qubic Changes Everything

### Architectural Advantages

**1. Tick-Based Finality**
- No "in-between" states
- No block proposal stage
- No mempool waiting period
- Atomic: order and execute together

**2. Deterministic Ordering**
- Timestamps assigned by validators (trusted)
- Hash-based secondary sort (unpredictable)
- No gas priority mechanism
- No manipulation vectors

**3. High Throughput**
- 15.52M TPS capacity
- Scales without sacrificing fairness
- Traditional MEV solutions can't match

**4. Built-In Properties**
- Consensus provides ordering guarantee
- No external components needed
- No additional latency
- No new trust assumptions

## The Future: MEV-Free DeFi

### Vision
Imagine DeFi where:
- Every trade is fair (no sandwiches)
- Every mint is first-come-first-served
- Every liquidation is based on actual price
- Every arbitrage is genuine market making

### Reality on Qubic + AFO
- ✅ Sandwich attacks: Impossible
- ✅ Frontrunning: Impossible
- ✅ Backrunning: Unpredictable (not profitable)
- ✅ Time-bandit: Impossible (tick finality)

### What This Enables
- **True DeFi**: Decentralized AND fair
- **User confidence**: No hidden costs
- **Capital efficiency**: No MEV tax
- **Innovation**: Build without MEV worries

## Conclusion

MEV is a fundamental challenge in DeFi. At scale, it becomes existential. Traditional solutions trade off scalability, decentralization, or complexity.

Qubic's tick-based finality offers a different path: built-in fairness at any scale. AFO harnesses this unique architecture to create the first truly MEV-free DeFi platform.

The future of fair finance starts here.

## Further Reading

- Flashbots Research: https://writings.flashbots.net/
- MEV Encyclopedia: https://mev.wiki/
- Qubic Whitepaper: [link]
- "Flash Boys 2.0" Paper: https://arxiv.org/abs/1904.05234

## Glossary

- **MEV**: Maximal Extractable Value (profit from transaction ordering)
- **Frontrunning**: Executing your transaction before someone else's
- **Backrunning**: Executing your transaction after someone else's
- **Sandwich Attack**: Frontrun + backrun the same victim
- **Mempool**: Public pool of pending transactions
- **Gas**: Transaction fee on Ethereum
- **Tick**: Atomic time unit on Qubic
- **Finality**: Point where transaction cannot be reversed
- **Atomic**: All-or-nothing, indivisible operation
