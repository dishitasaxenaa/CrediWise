import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BreakdownChart = ({ metrics }) => {
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
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "#cbd5e1" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#cbd5e1" },
      },
    },
    plugins: {
      legend: { display: false },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="h-64 w-full">
      <Bar data={data} options={options} />
    </div>
  )
}

export default BreakdownChart
