import React from 'react'
import { EpochStatus } from '../types'
import { Lock, Unlock, Zap } from 'lucide-react'
import { cn } from '../lib/utils'

interface Props {
  epoch: number
  status: EpochStatus
  intentCount: number
}

function EpochControl({ epoch, status, intentCount }: Props) {
  const getStatusConfig = () => {
    switch (status) {
      case 'OPEN':
        return {
          color: 'border-success text-success',
          bg: 'bg-success/10',
          icon: <Unlock className="w-5 h-5" />,
          phase: 'COMMIT',
          description: '// Epoch is open for intent submissions. Users can commit their swap intents.'
        }
      case 'CLOSED':
        return {
          color: 'border-destructive text-destructive',
          bg: 'bg-destructive/10',
          icon: <Lock className="w-5 h-5" />,
          phase: 'LOCK',
          description: '// Epoch closed. Order is locked deterministically by timestamp + hash.'
        }
      case 'EXECUTING':
        return {
          color: 'border-warning text-warning',
          bg: 'bg-warning/10',
          icon: <Zap className="w-5 h-5" />,
          phase: 'EXECUTE',
          description: '// Executing swaps in locked order. No MEV extraction possible.'
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className="border-2 border-primary/30 bg-card p-6 terminal-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary terminal-glow font-mono">
            {'>'} EPOCH #{epoch.toString().padStart(3, '0')}
          </h2>
          <p className="text-sm text-muted-foreground font-mono mt-1">
            // Current epoch status and phase information
          </p>
        </div>
        
        <div className={cn(
          "border-2 px-4 py-2 flex items-center gap-2 w-fit",
          config.color,
          config.bg
        )}>
          {config.icon}
          <span className="font-mono font-bold">{status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="border-l-2 border-primary pl-4">
          <div className="text-xs text-muted-foreground font-mono mb-1">TOTAL_INTENTS</div>
          <div className="text-2xl font-bold text-primary terminal-glow">{intentCount}</div>
        </div>
        
        <div className="border-l-2 border-primary pl-4">
          <div className="text-xs text-muted-foreground font-mono mb-1">PHASE</div>
          <div className="text-2xl font-bold text-primary terminal-glow">{config.phase}</div>
        </div>
      </div>

      <div className="border-l-2 border-primary/50 pl-4 py-2 bg-primary/5">
        <p className="text-sm text-muted-foreground font-mono">
          {config.description}
        </p>
      </div>
    </div>
  )
}

export default EpochControl
