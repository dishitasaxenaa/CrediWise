import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const GaugeChart = ({ score }) => {
  const data = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [score, 900 - score],
        backgroundColor: ["#06b6d4", "rgba(255, 255, 255, 0.05)"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "80%",
      },
    ],
  }

  const options = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="h-48 w-full relative mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-center">
        <span className="text-5xl font-bold block leading-none bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {score}
        </span>
        <span className="text-slate-400 text-sm">
          {score >= 750 ? "Excellent" : score >= 500 ? "Good" : "Needs Work"}
        </span>
      </div>
    </div>
  )
}

export default GaugeChart
