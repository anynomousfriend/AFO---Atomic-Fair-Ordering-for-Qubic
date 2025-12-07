import React from 'react'
import { Terminal, Zap } from 'lucide-react'

function Header() {
  return (
    <header className="border-b-2 border-primary/30 bg-card/80 backdrop-blur">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8 text-primary terminal-glow" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary terminal-glow">
                {'>'} AFO_ATOMIC_FAIR_ORDERING
              </h1>
              <p className="text-sm text-muted-foreground font-mono mt-1">
                // Eliminating MEV attacks on Qubic blockchain
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="border-2 border-success bg-success/10 px-3 py-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              <span className="text-xs font-mono text-success">DEMO_MODE</span>
            </div>
            <div className="border-2 border-primary bg-primary/10 px-3 py-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs font-mono text-primary">15.52M_TPS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
