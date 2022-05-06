import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Resumen de correspondencia"
    }
  },
  scales: {
    x: {
      display: true,
      scaleLabel: {
        display: true,
        labelString: "Estatus"
      }
    },
    y: {
      max: 10,
      min: 0
    }
  }
};



export function Chart({data}) {
    
  //console.log(new_data)
  return <Bar options={options} data={data} />;
}
