import { Award } from "lucide-react"

export default function BadgesSection({ badges }) {
  return (
    <div className="glass-card p-6 sm:p-8 border-cyan-500/10 animate-[fadeIn_0.6s_ease-out_forwards] delay-200">
      <h3 className="text-base sm:text-lg font-semibold text-cyan-300 mb-4 sm:mb-6">Your Achievements</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
        {badges?.map((badge, idx) => (
          <div
            key={idx}
            className="group hover:scale-105 hover:border-cyan-400/60 transition-all duration-200 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-1 sm:gap-2 text-cyan-300 cursor-default backdrop-blur-sm shadow-lg shadow-cyan-500/5"
          >
            <Award size={14} className="text-cyan-400 flex-shrink-0 hidden sm:block" />
            <Award size={12} className="text-cyan-400 flex-shrink-0 sm:hidden" />
            {badge}
          </div>
        ))}
      </div>
    </div>
  )
}
