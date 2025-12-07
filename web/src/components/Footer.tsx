import React from 'react'
import { Github, ArrowUp, Heart } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t-2 border-primary/30 bg-card/80 backdrop-blur mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground font-mono">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" />
            <span>for Qubic Nostromo Hackathon</span>
            <span className="text-primary">|</span>
            <span>Making DeFi fair, one tick at a time</span>
          </div>
          <div className="flex items-center gap-4 font-mono">
            <a 
              href="https://github.com/yourusername/Atomic-Fair-Ordering-Guard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>[GitHub]</span>
            </a>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              <span>[Top]</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
