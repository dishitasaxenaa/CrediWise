"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement } from "chart.js"

ChartJS.register(ArcElement)

export default function ScoreSection({ score, rewards }) {
  const data = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [score, 900 - score],
        backgroundColor: ["#06d6d6", "rgba(255, 255, 255, 0.08)"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "80%",
      },
    ],
  }

  const options = {
    plugins: { tooltip: { enabled: false }, legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="glass-card-glow  sm:p-8 flex flex-col items-center justify-center relative border-cyan-400/30 ">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-cyan-200">Your Financial Score</h2>
      <div className="h-40 sm:h-48 w-full relative mx-auto">
        <Doughnut data={data} options={options} />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center">
          <span className="text-4xl sm:text-5xl font-bold block leading-none bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {score}
          </span>
          <span className="text-cyan-300/80 text-xs sm:text-sm font-medium">
            {score >= 750 ? "Excellent" : score >= 500 ? "Good" : "Needs Work"}
          </span>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-slate-300 text-sm sm:text-base">
          Interest Rate Impact:{" "}
          <span className="text-cyan-300 font-bold text-base sm:text-lg">{rewards?.interestRateImpact || "--"}</span>
        </p>
      </div>
    </div>
  )
}
