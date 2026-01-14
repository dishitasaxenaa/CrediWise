"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement)

export default function DetailsGrid({ metrics, explainability }) {
  const green = Number.parseFloat(metrics.greenPercent)
  const carbon = Number.parseFloat(metrics.carbonPercent)
  const withdrawal = Number.parseFloat(metrics.withdrawalPercent)
  const other = 100 - (green + carbon + withdrawal)

  const data = {
    labels: ["Green", "Carbon", "Withdrawal", "Other"],
    datasets: [
      {
        label: "Spending %",
        data: [green, carbon, withdrawal, other],
        backgroundColor: ["#06b6d4", "#ef4444", "#f59e0b", "#475569"],
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const options = {
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#cbd5e1" } },
      x: { grid: { display: false }, ticks: { color: "#cbd5e1" } },
    },
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="glass-card p-6 sm:p-8 border-cyan-500/10 animate-[fadeIn_0.6s_ease-out_forwards]">
        <h3 className="text-base sm:text-lg font-semibold text-cyan-300 mb-4 sm:mb-6">Spending Breakdown</h3>
        <div className="h-48 sm:h-64 w-full">
          <Bar data={data} options={options} />
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8 border-cyan-500/10 animate-[fadeIn_0.6s_ease-out_forwards] delay-100">
        <h3 className="text-base sm:text-lg font-semibold text-cyan-300 mb-4 sm:mb-6">Analysis Report</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2 sm:mt-4">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-emerald-300 mb-2 sm:mb-3 font-semibold">
              Positive Factors
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {explainability?.topGreen?.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start">
                  <span className="text-emerald-400 mr-2 font-bold">+</span>
                  <span>
                    {item.description} (₹{item.amount})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 sm:p-4 backdrop-blur-sm">
            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-red-300 mb-2 sm:mb-3 font-semibold">
              Areas to Improve
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {explainability?.topCarbon?.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start">
                  <span className="text-red-400 mr-2 font-bold">−</span>
                  <span>
                    {item.description} (₹{item.amount})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
