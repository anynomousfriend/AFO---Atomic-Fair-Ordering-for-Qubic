# AFO Live Demo Walkthrough

**Duration**: 5 minutes  
**Goal**: Demonstrate MEV prevention through atomic fair ordering

## Pre-Demo Setup

```bash
cd Atomic-Fair-Ordering-Guard/frontend
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
bun run dev
```

## Demo Script (5 Minutes)

### [0:00-0:30] Introduction

**Say**: 
> "I'm demonstrating AFO - Atomic Fair Ordering for Qubic. This solves MEV attacks like sandwich trading that plague DeFi. At Qubic's 15.52 million TPS scale, MEV protection is critical."

**Show**: 
- Launch the TUI application
- Point to the header showing "AFO - Atomic Fair Ordering Demo"
- Show Epoch #1 in OPEN status

---

### [0:30-1:30] Explain the Problem

**Say**: 
> "In traditional DeFi, attackers can reorder transactions to extract value. They sandwich legitimate user trades - buying before and selling after to profit from price movement. Users lose money to slippage."

**Show**: 
- Press **[3]** to show Attack Demo screen
- Point to the comparison: "Without AFO" vs "With AFO"
- Highlight the numbers: $1.5M MEV extraction vs $0 with AFO

**Say**: 
> "Qubic's tick-based finality makes this different. Once an order is established within a tick, it's immutable - no committee, no re-orgs, no reordering possible."

---

### [1:30-2:30] Submit Intents (Interactive)

**Say**: 
> "Let's simulate a real scenario. We'll submit several user swap intents, and one attacker trying to sandwich them."

**Do**: 
- Press **[1]** to return to main screen
- Press **[a]** 3-4 times: "Adding legitimate user intents..."
- Press **[x]** once: "Now an attacker tries to sandwich with a large trade..."
- Press **[a]** 2 more times: "More user trades..."

**Show**: 
- Press **[2]** to view Intents List
- Point out all intents are in PENDING status (yellow)
- Show the timestamps and hashes

**Say**: 
> "All these intents are now in the commitment phase. The attacker's intent is here too, but they can't control the order."

---

### [2:30-3:30] Lock Ordering (Critical Moment)

**Say**: 
> "Now we close the epoch. This is where AFO's magic happens - deterministic ordering by timestamp and hash. The order is locked atomically within Qubic's tick."

**Do**: 
- Press **[c]** to close epoch
- Press **[2]** to view intents list

**Show**: 
- All intents now show LOCKED status (red)
- Order numbers appear [001], [002], [003]...
- Point to the attacker's position - it's wherever their timestamp put them

**Say**: 
> "Notice the attacker is stuck in position based on when they submitted. They cannot frontrun or backrun. The order is now immutable - sealed by Qubic's tick finality."

---

### [3:30-4:30] Execute and Results

**Say**: 
> "Now we execute all swaps in the locked order. The AMM processes them sequentially with no possibility of reordering."

**Do**: 
- Press **[1]** to return to main
- Press **[e]** to execute
- Press **[2]** to view results

**Show**: 
- All intents now EXECUTED (green)
- Progress bar at 100%

**Say**: 
> "Every trade executed fairly. Zero MEV extracted. Zero user slippage from attacks."

**Do**: 
- Press **[3]** to show attack demo summary

**Show**: 
- "Sandwich attacks blocked" counter
- Success metrics

**Say**: 
> "This is only possible on Qubic because of tick-based atomic finality. Ethereum can't do this - block times and mempool make reordering possible. Cosmos can't do this - validator reorgs exist. Qubic's architecture is uniquely suited for MEV-free DeFi."

---

### [4:30-5:00] Wrap-Up and Next Steps

**Say**: 
> "AFO is production-ready infrastructure middleware for Qubic's Nostromo track. It's open source, fully documented, and ready to deploy on testnet. This demo uses a mock testnet for instant feedback, but the real implementation is ready."

**Show**: 
- Press **[?]** to show keyboard shortcuts
- Press **[r]** to reset and show it's repeatable

**Say**: 
> "Questions? The code is on GitHub, fully documented with setup instructions. Thank you!"

---

## Tips for Live Demo

### Before Starting
- Test the demo 2-3 times beforehand
- Have the terminal in full screen
- Use a readable font size (14pt+)
- Close other applications to avoid distractions

### During Demo
- Speak clearly and not too fast
- Pause after each action to let the audience see
- Point to specific parts of the screen
- Make eye contact with the audience
- Have a backup plan (screenshots) if tech fails

### Common Issues
- **Terminal too small**: Resize to at least 120x40 characters
- **Keys not responding**: Make sure the app has focus
- **Bun not found**: Run the export commands first

### Questions to Prepare For
1. **"Why not use Flashbots/MEV-Boost?"**
   - Answer: Those require off-chain committees and are incompatible with Qubic's 15M TPS scale

2. **"What's the performance impact?"**
   - Answer: Zero - ordering is built into consensus, no extra overhead

3. **"Can attackers game the timestamp?"**
   - Answer: No - timestamps are set by validators at ingestion, and secondary sort is by hash (unpredictable)

4. **"Is this secure against all MEV?"**
   - Answer: This prevents ordering-based MEV (sandwich, frontrunning). Oracle-based MEV requires different solutions.

## Post-Demo

- Share GitHub link: `github.com/[your-username]/Atomic-Fair-Ordering-Guard`
- Provide email for follow-up questions
- Thank the judges/audience

## Recording Tips (If Remote)

- Record in 1080p minimum
- Use screen recording software (OBS, SimpleScreenRecorder)
- Test audio levels beforehand
- Have good lighting if showing face
- Keep video under 5 minutes
