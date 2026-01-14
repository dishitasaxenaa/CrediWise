"use client"

export default function Header({ bankName }) {
  return (
    <header className="glass-card-glow mb-6 sm:mb-8 p-4 sm:p-6 border-cyan-400/30 animate-fade-in-scale">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent text-balance">
            Banking Dashboard
          </h1>
          {bankName && <p className="text-xs sm:text-sm text-cyan-300/90 mt-1 font-medium">{bankName} Linked</p>}
        </div>
      </div>
    </header>
  )
}
