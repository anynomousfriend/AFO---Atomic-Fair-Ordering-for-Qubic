import React from 'react'
import { X, Check, TrendingDown, TrendingUp, Shield, AlertTriangle } from 'lucide-react'

function AttackDemo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary terminal-glow font-mono">
        {'>'} MEV_ATTACK_COMPARISON
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WITHOUT AFO */}
        <div className="border-2 border-destructive bg-card">
          <div className="bg-destructive/20 border-b-2 border-destructive p-4">
            <div className="flex items-center gap-2">
              <X className="w-6 h-6 text-destructive" />
              <h3 className="text-xl font-bold font-mono text-destructive">WITHOUT_AFO</h3>
            </div>
            <p className="text-sm text-muted-foreground font-mono mt-1">// Traditional DeFi (Ethereum)</p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="space-y-2 font-mono text-sm">
              <div className="text-muted-foreground">// Execution Order:</div>
              <div className="space-y-1">
                <div className="border-l-2 border-destructive pl-3 py-1 bg-destructive/5">
                  <span className="text-destructive">[1]</span> Eve: Buy 10,000 USDC <span className="text-destructive">(FRONTRUN)</span>
                </div>
                <div className="border-l-2 border-warning pl-3 py-1 bg-warning/5">
                  <span className="text-warning">[2]</span> Alice: Swap 100 ETH <span className="text-warning">(VICTIM)</span>
                </div>
                <div className="border-l-2 border-warning pl-3 py-1 bg-warning/5">
                  <span className="text-warning">[3]</span> Bob: Swap 50 ETH <span className="text-warning">(VICTIM)</span>
                </div>
                <div className="border-l-2 border-warning pl-3 py-1 bg-warning/5">
                  <span className="text-warning">[4]</span> Carol: Swap 25 ETH <span className="text-warning">(VICTIM)</span>
                </div>
                <div className="border-l-2 border-destructive pl-3 py-1 bg-destructive/5">
                  <span className="text-destructive">[5]</span> Eve: Sell 10,000 USDC <span className="text-destructive">(BACKRUN)</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-muted pt-4 space-y-2">
              <div className="text-xs text-muted-foreground font-mono mb-2">// Results:</div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  Alice loses:
                </span>
                <span className="text-destructive font-bold">-$5,000</span>
              </div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  Bob loses:
                </span>
                <span className="text-destructive font-bold">-$2,500</span>
              </div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  Carol loses:
                </span>
                <span className="text-destructive font-bold">-$1,250</span>
              </div>
              <div className="border-t-2 border-destructive pt-2 mt-2">
                <div className="flex justify-between items-center font-mono font-bold">
                  <span className="flex items-center gap-2 text-destructive">
                    <TrendingUp className="w-5 h-5" />
                    Eve profits:
                  </span>
                  <span className="text-destructive text-lg">+$15,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WITH AFO */}
        <div className="border-2 border-success bg-card">
          <div className="bg-success/20 border-b-2 border-success p-4">
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6 text-success" />
              <h3 className="text-xl font-bold font-mono text-success">WITH_AFO</h3>
            </div>
            <p className="text-sm text-muted-foreground font-mono mt-1">// Qubic with AFO Protection</p>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="space-y-2 font-mono text-sm">
              <div className="text-muted-foreground">// Execution Order (Deterministic):</div>
              <div className="space-y-1">
                <div className="border-l-2 border-success pl-3 py-1 bg-success/5">
                  <span className="text-success">[1]</span> Alice: Swap 100 ETH <span className="text-success">(FAIR)</span>
                </div>
                <div className="border-l-2 border-success pl-3 py-1 bg-success/5">
                  <span className="text-success">[2]</span> Bob: Swap 50 ETH <span className="text-success">(FAIR)</span>
                </div>
                <div className="border-l-2 border-muted pl-3 py-1 bg-muted/5">
                  <span className="text-muted-foreground">[3]</span> Eve: Swap attempt <span className="text-muted-foreground">(NO ADVANTAGE)</span>
                </div>
                <div className="border-l-2 border-success pl-3 py-1 bg-success/5">
                  <span className="text-success">[4]</span> Carol: Swap 25 ETH <span className="text-success">(FAIR)</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                // Order locked by timestamp + hash, immutable within tick
              </div>
            </div>

            <div className="border-t-2 border-muted pt-4 space-y-2">
              <div className="text-xs text-muted-foreground font-mono mb-2">// Results:</div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Alice:
                </span>
                <span className="text-success font-bold">$0 lost ✓</span>
              </div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Bob:
                </span>
                <span className="text-success font-bold">$0 lost ✓</span>
              </div>
              <div className="flex justify-between items-center font-mono text-sm">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-success" />
                  Carol:
                </span>
                <span className="text-success font-bold">$0 lost ✓</span>
              </div>
              <div className="border-t-2 border-success pt-2 mt-2">
                <div className="flex justify-between items-center font-mono font-bold">
                  <span className="flex items-center gap-2 text-success">
                    <Shield className="w-5 h-5" />
                    Total MEV:
                  </span>
                  <span className="text-success text-lg terminal-glow">$0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="border-2 border-primary bg-primary/5 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-primary font-mono">{'>'} KEY_INSIGHT</h4>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              AFO prevents MEV by making transaction ordering <strong className="text-foreground">deterministic</strong> and{' '}
              <strong className="text-foreground">unpredictable</strong>. Attackers cannot see swap details during the commit phase,
              and cannot manipulate the order during the lock phase. Once Qubic's tick finalizes the order,
              it's <strong className="text-primary terminal-glow">immutable</strong>—no entity can change it.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border-2 border-destructive bg-card p-4">
          <div className="text-3xl font-bold text-destructive terminal-glow mb-2">$1.4B+</div>
          <div className="text-xs text-muted-foreground font-mono">MEV_EXTRACTED_ON_ETHEREUM (2020-2023)</div>
        </div>
        <div className="border-2 border-warning bg-card p-4">
          <div className="text-3xl font-bold text-warning terminal-glow mb-2">2-5%</div>
          <div className="text-xs text-muted-foreground font-mono">AVG_USER_SLIPPAGE_LOSS_PER_TRADE</div>
        </div>
        <div className="border-2 border-success bg-card p-4">
          <div className="text-3xl font-bold text-success terminal-glow mb-2">15.52M</div>
          <div className="text-xs text-muted-foreground font-mono">QUBIC_TPS (AFO_SCALES_WITH_IT)</div>
        </div>
      </div>
    </div>
  )
}

export default AttackDemo
