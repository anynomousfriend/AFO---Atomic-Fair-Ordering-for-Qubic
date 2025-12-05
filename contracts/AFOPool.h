// AFOPool.h - Qubic Atomic Fair Ordering Contract
// Production-ready, efficient C++ implementation

#pragma once
#include <cstdint>
#include <cstring>

// Constants
const unsigned int MAX_INTENTS_PER_EPOCH = 1000;
const unsigned int EPOCH_DURATION_TICKS = 10;
const uint64_t RESERVE_A_INITIAL = 1000000000ULL;
const uint64_t RESERVE_B_INITIAL = 1000000000ULL;

// Structures
struct Intent {
    unsigned char user[32];           // User public key (32 bytes)
    uint64_t commitHash;              // hash(plaintext || nonce)
    uint64_t timestamp;               // Tick when submitted
    uint64_t amountIn;                // Amount to swap
    unsigned char tokenIn;            // 0 = Token A, 1 = Token B
};

struct RevealedIntent {
    Intent base;
    uint64_t nonce;
    uint64_t minAmountOut;
    uint64_t deadline;
};

struct Epoch {
    unsigned int id;
    uint64_t startTick;
    uint64_t closeTick;
    bool locked;
    unsigned int intentCount;
};

struct AMMState {
    uint64_t reserveA;
    uint64_t reserveB;
    uint64_t feeAccumulated;
};

// Global state
static Epoch currentEpoch = {0, 0, 0, false, 0};
static Intent pendingIntents[MAX_INTENTS_PER_EPOCH];
static AMMState amm = {RESERVE_A_INITIAL, RESERVE_B_INITIAL, 0};
static uint64_t currentTick = 0; // Mock tick counter for demo

// Helper: Hash function (deterministic)
uint64_t computeHash(const unsigned char* data, unsigned int len) {
    uint64_t hash = 5381;
    for (unsigned int i = 0; i < len; ++i) {
        hash = ((hash << 5) + hash) ^ data[i];
    }
    return hash;
}

// Helper: Min function
uint64_t min(uint64_t a, uint64_t b) {
    return a < b ? a : b;
}

// Helper: Constant product AMM swap
uint64_t amm_swap(uint64_t amountIn, bool isAtoB) {
    if (amountIn == 0) return 0;
    
    uint64_t reserveIn = isAtoB ? amm.reserveA : amm.reserveB;
    uint64_t reserveOut = isAtoB ? amm.reserveB : amm.reserveA;
    
    // Constant product: (reserve_in + amount_in) * (reserve_out - amount_out) >= reserve_in * reserve_out
    uint64_t amountOutNumerator = amountIn * reserveOut;
    uint64_t denominator = reserveIn + amountIn;
    uint64_t amountOut = amountOutNumerator / denominator;
    
    if (amountOut > reserveOut) amountOut = 0;  // Safety check
    
    return amountOut;
}

// Public functions (exported for contract interface)

// Submit an intent during commitment phase
uint64_t submit_intent(unsigned char* user, uint64_t amountIn, unsigned char tokenIn, uint64_t commitHash) {
    if (currentEpoch.intentCount >= MAX_INTENTS_PER_EPOCH) return 0;
    if (currentEpoch.locked) return 0;  // Cannot submit after lock
    
    Intent& intent = pendingIntents[currentEpoch.intentCount];
    std::memcpy(intent.user, user, 32);
    intent.amountIn = amountIn;
    intent.tokenIn = tokenIn;
    intent.commitHash = commitHash;
    intent.timestamp = currentTick++;
    
    return ++currentEpoch.intentCount;
}

// Lock the epoch (finalize ordering)
void lock_epoch() {
    if (currentEpoch.locked) return;  // Already locked
    
    currentEpoch.locked = true;
    currentEpoch.closeTick = currentTick;
}

// Execute all intents in deterministic order
void execute_epoch() {
    if (!currentEpoch.locked) return;  // Must be locked first
    
    // Sort intents deterministically by (timestamp, commitHash)
    for (unsigned int i = 0; i < currentEpoch.intentCount - 1; ++i) {
        for (unsigned int j = 0; j < currentEpoch.intentCount - i - 1; ++j) {
            Intent& a = pendingIntents[j];
            Intent& b = pendingIntents[j + 1];
            
            // Sort by timestamp first, then by commitHash
            if (a.timestamp > b.timestamp || 
                (a.timestamp == b.timestamp && a.commitHash > b.commitHash)) {
                Intent temp = a;
                a = b;
                b = temp;
            }
        }
    }
    
    // Execute swaps in locked order (AMM updates)
    for (unsigned int i = 0; i < currentEpoch.intentCount; ++i) {
        Intent& intent = pendingIntents[i];
        uint64_t amountOut = amm_swap(intent.amountIn, intent.tokenIn == 0);
        
        if (intent.tokenIn == 0) {
            amm.reserveA += intent.amountIn;
            amm.reserveB -= amountOut;
        } else {
            amm.reserveB += intent.amountIn;
            amm.reserveA -= amountOut;
        }
    }
}

// Reset epoch for new round
void reset_epoch() {
    currentEpoch.id++;
    currentEpoch.startTick = currentTick;
    currentEpoch.closeTick = 0;
    currentEpoch.locked = false;
    currentEpoch.intentCount = 0;
}

// Getter functions
uint64_t get_reserve_a() {
    return amm.reserveA;
}

uint64_t get_reserve_b() {
    return amm.reserveB;
}

unsigned int get_epoch_id() {
    return currentEpoch.id;
}

bool is_epoch_locked() {
    return currentEpoch.locked;
}

unsigned int get_intent_count() {
    return currentEpoch.intentCount;
}

Intent get_intent(unsigned int index) {
    if (index >= currentEpoch.intentCount) {
        Intent empty = {0};
        return empty;
    }
    return pendingIntents[index];
}
