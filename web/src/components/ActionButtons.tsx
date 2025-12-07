import React from 'react'
import { EpochStatus } from '../types'
import { Plus, Swords, Lock, Zap, RotateCcw } from 'lucide-react'
import { cn } from '../lib/utils'

interface Props {
  onAddIntent: () => void
  onAddAttacker: () => void
  onCloseEpoch: () => void
  onExecute: () => void
  onReset: () => void
  epochStatus: EpochStatus
}

function ActionButtons({ 
  onAddIntent, 
  onAddAttacker, 
  onCloseEpoch, 
  onExecute, 
  onReset, 
  epochStatus 
}: Props) {
  const Button = ({ 
    icon, 
    label, 
    hint, 
    onClick, 
    disabled, 
    variant 
  }: { 
    icon: React.ReactNode
    label: string
    hint: string
    onClick: () => void
    disabled?: boolean
    variant: 'success' | 'destructive' | 'warning' | 'secondary'
  }) => {
    const variantStyles = {
      success: 'border-success hover:bg-success hover:text-success-foreground',
      destructive: 'border-destructive hover:bg-destructive hover:text-destructive-foreground',
      warning: 'border-warning hover:bg-warning hover:text-warning-foreground',
      secondary: 'border-muted hover:bg-muted hover:text-muted-foreground',
    }

    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "border-2 p-4 transition-all font-mono group",
          "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          !disabled && variantStyles[variant]
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <div className={cn(
            "transition-transform group-hover:scale-110",
            !disabled && "group-hover:terminal-glow"
          )}>
            {icon}
          </div>
          <div className="text-sm font-bold">{label}</div>
          <div className="text-xs text-muted-foreground">// {hint}</div>
        </div>
      </button>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-primary terminal-glow font-mono mb-4">
        {'>'} ACTIONS
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <Button
          icon={<Plus className="w-6 h-6" />}
          label="ADD_USER_INTENT"
          hint="Legitimate swap"
          onClick={onAddIntent}
          disabled={epochStatus !== 'OPEN'}
          variant="success"
        />

        <Button
          icon={<Swords className="w-6 h-6" />}
          label="ADD_ATTACKER"
          hint="Sandwich attempt"
          onClick={onAddAttacker}
          disabled={epochStatus !== 'OPEN'}
          variant="destructive"
        />

        <Button
          icon={<Lock className="w-6 h-6" />}
          label="CLOSE_EPOCH"
          hint="Lock ordering"
          onClick={onCloseEpoch}
          disabled={epochStatus !== 'OPEN'}
          variant="warning"
        />

        <Button
          icon={<Zap className="w-6 h-6" />}
          label="EXECUTE_BATCH"
          hint="Process swaps"
          onClick={onExecute}
          disabled={epochStatus !== 'CLOSED'}
          variant="success"
        />

        <Button
          icon={<RotateCcw className="w-6 h-6" />}
          label="RESET_EPOCH"
          hint="Start over"
          onClick={onReset}
          variant="secondary"
        />
      </div>
    </div>
  )
}

export default ActionButtons
