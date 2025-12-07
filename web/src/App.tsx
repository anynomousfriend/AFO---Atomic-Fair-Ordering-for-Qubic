import React, { useState, useEffect } from 'react'
import { mockTestnet } from './services/mockTestnet'
import { Intent, EpochStatus } from './types'
import Header from './components/Header'
import EpochControl from './components/EpochControl'
import IntentsList from './components/IntentsList'
import AttackDemo from './components/AttackDemo'
import ActionButtons from './components/ActionButtons'
import Footer from './components/Footer'

type Screen = 'main' | 'intents' | 'attack'

function App() {
  const [screen, setScreen] = useState<Screen>('main')
  const [epochStatus, setEpochStatus] = useState<EpochStatus>('OPEN')
  const [intents, setIntents] = useState<Intent[]>([])
  const [epoch, setEpoch] = useState(1)

  useEffect(() => {
    // Initialize mock testnet
    mockTestnet.resetEpoch()
    updateState()
  }, [])

  const updateState = () => {
    setEpochStatus(mockTestnet.getEpochStatus())
    setIntents(mockTestnet.getIntents())
    setEpoch(mockTestnet.getCurrentEpoch())
  }

  const handleAddIntent = () => {
    mockTestnet.submitIntent()
    updateState()
  }

  const handleAddAttacker = () => {
    mockTestnet.submitAttackerIntent()
    updateState()
  }

  const handleCloseEpoch = () => {
    mockTestnet.closeEpoch()
    updateState()
  }

  const handleExecute = () => {
    mockTestnet.executeBatch()
    updateState()
  }

  const handleReset = () => {
    mockTestnet.resetEpoch()
    updateState()
  }

  return (
    <div className="min-h-screen bg-background text-foreground scanline">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {screen === 'main' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <EpochControl 
              epoch={epoch}
              status={epochStatus}
              intentCount={intents.length}
            />
            
            <ActionButtons
              onAddIntent={handleAddIntent}
              onAddAttacker={handleAddAttacker}
              onCloseEpoch={handleCloseEpoch}
              onExecute={handleExecute}
              onReset={handleReset}
              epochStatus={epochStatus}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="border-2 border-primary/30 bg-card p-4 terminal-shadow">
                <div className="text-3xl font-bold text-primary terminal-glow">{intents.filter(i => i.status === 'PENDING').length}</div>
                <div className="text-sm text-muted-foreground mt-1">PENDING_INTENTS</div>
              </div>
              <div className="border-2 border-destructive/30 bg-card p-4 terminal-shadow">
                <div className="text-3xl font-bold text-destructive terminal-glow">{intents.filter(i => i.status === 'LOCKED').length}</div>
                <div className="text-sm text-muted-foreground mt-1">LOCKED_INTENTS</div>
              </div>
              <div className="border-2 border-success/30 bg-card p-4 terminal-shadow">
                <div className="text-3xl font-bold text-success terminal-glow">{intents.filter(i => i.status === 'EXECUTED').length}</div>
                <div className="text-sm text-muted-foreground mt-1">EXECUTED_INTENTS</div>
              </div>
              <div className="border-2 border-success/30 bg-card p-4 terminal-shadow">
                <div className="text-3xl font-bold text-success terminal-glow">$0</div>
                <div className="text-sm text-muted-foreground mt-1">MEV_EXTRACTED</div>
              </div>
            </div>
          </div>
        )}

        {screen === 'intents' && (
          <div className="animate-in fade-in duration-300">
            <IntentsList intents={intents} />
          </div>
        )}

        {screen === 'attack' && (
          <div className="animate-in fade-in duration-300">
            <AttackDemo />
          </div>
        )}
      </main>

      <nav className="border-t-2 border-primary/30 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-2 justify-center">
          <button 
            className={`px-6 py-2 border-2 font-mono transition-all ${
              screen === 'main' 
                ? 'border-primary bg-primary text-primary-foreground terminal-glow' 
                : 'border-muted hover:border-primary/50 hover:text-primary'
            }`}
            onClick={() => setScreen('main')}
          >
            [1] MAIN
          </button>
          <button 
            className={`px-6 py-2 border-2 font-mono transition-all ${
              screen === 'intents' 
                ? 'border-primary bg-primary text-primary-foreground terminal-glow' 
                : 'border-muted hover:border-primary/50 hover:text-primary'
            }`}
            onClick={() => setScreen('intents')}
          >
            [2] INTENTS
          </button>
          <button 
            className={`px-6 py-2 border-2 font-mono transition-all ${
              screen === 'attack' 
                ? 'border-primary bg-primary text-primary-foreground terminal-glow' 
                : 'border-muted hover:border-primary/50 hover:text-primary'
            }`}
            onClick={() => setScreen('attack')}
          >
            [3] ATTACK_DEMO
          </button>
        </div>
      </nav>

      <Footer />
    </div>
  )
}

export default App
