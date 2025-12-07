import React from 'react'
import { Intent } from '../types'
import { Clock, Lock, CheckCircle, User, Hash, Clock3, Coins, Swords } from 'lucide-react'
import { cn } from '../lib/utils'

interface Props {
  intents: Intent[]
}

function IntentsList({ intents }: Props) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PENDING':
        return {
          color: 'text-warning border-warning',
          bg: 'bg-warning/10',
          icon: <Clock className="w-4 h-4" />
        }
      case 'LOCKED':
        return {
          color: 'text-destructive border-destructive',
          bg: 'bg-destructive/10',
          icon: <Lock className="w-4 h-4" />
        }
      case 'EXECUTED':
        return {
          color: 'text-success border-success',
          bg: 'bg-success/10',
          icon: <CheckCircle className="w-4 h-4" />
        }
      default:
        return {
          color: 'text-muted-foreground border-muted',
          bg: 'bg-muted/10',
          icon: <Clock className="w-4 h-4" />
        }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow font-mono">
          {'>'} ALL_INTENTS
        </h2>
        <div className="border-2 border-primary bg-primary/10 px-4 py-2">
          <span className="font-mono font-bold text-primary">{intents.length} TOTAL</span>
        </div>
      </div>

      {intents.length === 0 ? (
        <div className="border-2 border-muted bg-card p-12 text-center">
          <div className="text-4xl mb-4 text-muted-foreground">[ EMPTY ]</div>
          <p className="text-muted-foreground font-mono mb-2">// No intents submitted yet</p>
          <p className="text-sm text-muted-foreground font-mono">Go to [1] MAIN screen and add some intents!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {intents.map((intent) => {
            const statusConfig = getStatusConfig(intent.status)
            return (
              <div 
                key={intent.id} 
                className={cn(
                  "border-2 bg-card p-4 transition-all hover:terminal-shadow",
                  statusConfig.color
                )}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-current">
                  <span className="font-mono font-bold text-lg">
                    {intent.order !== undefined ? `[${String(intent.order).padStart(3, '0')}]` : '[---]'}
                  </span>
                  <div className={cn(
                    "border px-2 py-1 flex items-center gap-1",
                    statusConfig.color,
                    statusConfig.bg
                  )}>
                    {statusConfig.icon}
                    <span className="text-xs font-mono font-bold">{intent.status}</span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-sm">
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">USER</div>
                      <div className="font-mono text-xs truncate">{intent.user.slice(0, 20)}...</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Coins className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">AMOUNT</div>
                      <div className="text-primary terminal-glow">{intent.amountIn} {intent.tokenIn}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock3 className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">TIMESTAMP</div>
                      <div>{intent.timestamp}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Hash className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">HASH</div>
                      <div className="font-mono text-xs truncate">{intent.commitHash}</div>
                    </div>
                  </div>

                  {intent.isAttacker && (
                    <div className="mt-3 pt-3 border-t-2 border-destructive">
                      <div className="flex items-center gap-2 justify-center bg-destructive/20 border border-destructive px-3 py-2">
                        <Swords className="w-4 h-4 text-destructive animate-pulse" />
                        <span className="text-xs font-bold text-destructive">ATTACKER_DETECTED</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default IntentsList
