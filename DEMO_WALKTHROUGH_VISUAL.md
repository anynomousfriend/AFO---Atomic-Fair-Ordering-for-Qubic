# 🎬 AFO Demo - Visual Walkthrough

## What You'll See in the Demo

### Screen 1: Main Interface (Initial State)
```
╔═══════════════════════════════════════════════════════════╗
║           AFO - Atomic Fair Ordering Demo                ║
║     Qubic Tick-Based Finality for MEV-Fair DeFi          ║
╚═══════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────┐
│ Testnet: Mock Testnet ● CONNECTED                       │
│ Press [?] for help                                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Epoch # 1 │ OPEN │ 0 intents                            │
│ [░░░░░░░░░░░░░░░░░░░░] 0%                               │
│ [C] Close Epoch  [E] Execute  [R] Reset  [A] Add Intent │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Quick Actions:                                           │
│ [A] Add Random User Intent                              │
│ [X] Add Attacker Intent (sandwich attempt)              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Screen: main  │ [1] Main  [2] Intents  [3] Attack  [?] Help  [Q] Quit │
└─────────────────────────────────────────────────────────┘
```

**What to say:** "This is AFO running on a mock Qubic testnet. We're in Epoch 1, currently OPEN for intent submissions."

---

### Action 1-3: Press 'a' three times
```
Epoch # 1 │ OPEN │ 3 intents
[░░░░░░░░░░░░░░░░░░░░] 0%
```

**What to say:** "I'm adding several user swap intents. These are regular users trying to trade tokens."

---

### Action 4: Press 'x' once
```
Epoch # 1 │ OPEN │ 4 intents
[░░░░░░░░░░░░░░░░░░░░] 0%
```

**What to say:** "Now I'm adding an attacker intent - someone trying to sandwich these trades for profit."

---

### Action 5-6: Press 'a' two more times
```
Epoch # 1 │ OPEN │ 6 intents
[░░░░░░░░░░░░░░░░░░░░] 0%
```

**What to say:** "And a few more user intents. Now we have 6 total - users mixed with an attacker."

---

### Screen 2: Press '2' to view intents
```
┌─────────────────────────────────────────────────────────┐
│ Intents Order Log                                        │
│                                                          │
│   [000] user-3f2a 500 TokenA PENDING 4d8f9a12           │
│   [001] user-7b4c 1000 TokenB PENDING 8a2c5f34          │
│   [002] user-9d1e 2000 TokenA PENDING 1f6b8d29          │
│   [003] ATTACKER 10000 TokenA PENDING 5c9e2a71          │
│   [004] user-2a8f 500 TokenB PENDING 9b3d4e56           │
│   [005] user-6c3d 1000 TokenA PENDING 2e7f1a98          │
└─────────────────────────────────────────────────────────┘
```

**What to say:** "Here are all the pending intents. Notice the attacker is in there with a large 10,000 TokenA trade - a classic sandwich setup. In traditional DeFi, they could reorder these to profit. Watch what happens next."

---

### Action 7: Press 'c' to close epoch
```
Epoch # 1 │ LOCKED │ 6 intents
[██████████░░░░░░░░░░] 50%
```

**What to say:** "I'm closing the epoch now. This triggers deterministic ordering - AFO sorts by timestamp first, then by hash. This happens atomically within Qubic's tick."

---

### Screen 3: Press '2' to view locked order
```
┌─────────────────────────────────────────────────────────┐
│ Intents Order Log                                        │
│                                                          │
│   [001] user-3f2a 500 TokenA LOCKED 4d8f9a12            │
│   [002] user-7b4c 1000 TokenB LOCKED 8a2c5f34           │
│   [003] user-9d1e 2000 TokenA LOCKED 1f6b8d29           │
│   [004] ATTACKER 10000 TokenA LOCKED 5c9e2a71           │
│   [005] user-2a8f 500 TokenB LOCKED 9b3d4e56            │
│   [006] user-6c3d 1000 TokenA LOCKED 2e7f1a98           │
└─────────────────────────────────────────────────────────┘
```

**What to say:** "Look - all intents are now LOCKED with their final order numbers. The attacker is stuck at position 4, based on when they actually submitted. They cannot frontrun, cannot backrun, cannot reorder. This order is sealed by Qubic's tick finality - completely immutable."

**KEY POINT:** "This is the critical moment. On Ethereum or other chains, the attacker could still manipulate. Here, it's impossible."

---

### Action 8: Press 'e' to execute
```
Epoch # 1 │ EXECUTED │ 6 intents
[████████████████████] 100%
```

**What to say:** "Execute. All swaps now process in the locked order. No gaps, no insertions, completely fair."

---

### Screen 4: Press '3' to view attack demo
```
┌─────────────────────────────────────────────────────────┐
│ Attack Simulation: Sandwich Prevention                   │
│                                                          │
│ Scenario: User swaps + attacker sandwich attempt        │
│                                                          │
│ Without AFO:                                             │
│   → Attacker MEV extraction: ~$1.5M (sandwich)          │
│   → Users lose: ~$500K in slippage                      │
│                                                          │
│ With AFO (Qubic atomic finality):                       │
│   ✓ Attacker cannot reorder (tick-locked)              │
│   ✓ Sandwich impossible (atomic consensus)             │
│   ✓ MEV = 0 (deterministic order)                      │
│   ✓ Users protected (slippage = 0)                     │
│                                                          │
│ In Epoch #1:                                             │
│   6 intents executed fairly                             │
│   1 sandwich attacks blocked                            │
└─────────────────────────────────────────────────────────┘
```

**What to say:** "Here's the summary. Without AFO, the attacker would extract value through sandwich attacks. With AFO on Qubic, zero MEV extracted. One sandwich attack blocked. Every user protected."

**CLOSING:** "This is only possible because of Qubic's architecture - tick-based finality creates an environment where MEV attacks are structurally impossible."

---

## 🎯 Key Messages During Demo

### At the Start
- "This demonstrates MEV prevention at Qubic's scale"
- "Watch how we stop a sandwich attack"

### During Intent Submission
- "Users and attackers submitting simultaneously"
- "In traditional DeFi, attacker could manipulate this"

### When Locking Order
- **MOST IMPORTANT MOMENT**
- "Order is locked deterministically"
- "Attacker stuck in arrival order"
- "Sealed by tick finality - immutable"

### After Execution
- "Zero MEV extracted"
- "All users protected"
- "Only possible on Qubic"

---

## ⏱️ Timing Guide

| Action | Time | What to Say |
|--------|------|-------------|
| Launch | 5s | "This is AFO on Qubic" |
| Add intents (a,a,a) | 10s | "Adding user trades" |
| Add attacker (x) | 5s | "Attacker tries to sandwich" |
| Add more (a,a) | 5s | "More user trades" |
| View list (2) | 10s | "All pending, attacker is here" |
| Close epoch (c) | 15s | "Locking order deterministically" |
| View locked (2) | 15s | "Attacker stuck, cannot reorder" |
| Execute (e) | 10s | "Execute in locked order" |
| Results (3) | 15s | "Zero MEV, users protected" |
| **Total** | **90s** | **Full demo cycle** |

---

## 💡 What If Something Goes Wrong?

### Demo doesn't launch
- **Have screenshots ready**
- Say: "Let me show you what it looks like" (use slides)
- Move forward confidently

### Keys don't respond
- Click on terminal to focus
- Try again
- If still stuck, use backup screenshots

### Wrong state shown
- Press 'r' to reset
- Start over quickly
- Or use backup screenshots

**Remember:** It's about the concept, not perfect execution!

---

## 🎨 Visual Cues to Point Out

1. **Colors**
   - Yellow = PENDING (not yet ordered)
   - Red = LOCKED (order fixed, immutable)
   - Green = EXECUTED (completed successfully)

2. **Order Numbers**
   - [001], [002], etc. - Show the locked sequence
   - Point out attacker's position doesn't change

3. **Progress Bar**
   - 0% when OPEN
   - 50% when LOCKED
   - 100% when EXECUTED

4. **Status Changes**
   - OPEN → LOCKED → EXECUTED
   - Each phase clear and visible

---

## 📸 Screenshot Backup Plan

If demo fails, describe these states:
1. "Here's the main screen with intents submitted"
2. "Here they are pending - attacker mixed in"
3. "Now locked - order is immutable"
4. "Executed - zero MEV extracted"

Have these screenshots ready on another screen or printed.

---

## ✅ Post-Demo Checklist

After the demo:
- [ ] Did they see the attacker get stuck?
- [ ] Did they understand tick-based finality?
- [ ] Did they see the zero MEV result?
- [ ] Do they understand it's unique to Qubic?

If yes to all → Demo successful! 🎉

---

**Remember: You're showing them something no other blockchain can do. Be confident!**
