import { FC } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export type LineChartProps = {
  ariaLabel: string,
  title: string,
  description: string,
  xLabels: Array<string>,
  yLabelData: Array<number>,
}

const LineChart: FC<LineChartProps> = (props) => {
  const options = getOptions(props.title)
  const data = {
    labels: props.xLabels,
    datasets: [
      {
        label: props.description,
        data: props.yLabelData,
      }
    ]
  }
  return (
    <Line aria-label={props.ariaLabel}
          style={{margin: "0 auto", width: "100%"}}
          options={options}
          data={data}/>
  )
}

function getOptions(title: string) {
  return {
    responsive: true,
    maintainAspectRatio: true,
    updateMode: "resize",
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: title,
        color: "white",
        font: {
          size: 18
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        fill: "start",
        borderColor: "white",
        backgroundColor: "white",
      },
      point: {
        radius: 5,
        hitRadius: 25,
        hoverRadius: 18,
        borderColor: "whitesmoke",
        backgroundColor: "grey",
      }
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: "white",
        }
      },
      y: {
        display: true,
        grid: {
          display: true,
          color: "purple",
        },
        ticks: {
          color: "white",
        }
      },
    },
  }
}

export default LineChart