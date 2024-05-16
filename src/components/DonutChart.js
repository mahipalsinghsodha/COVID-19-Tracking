import React, { useRef, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }) => {
  const { statewise } = data;
  const totalConfirmed = statewise[0].confirmed;
  const { active, recovered, deaths } = statewise[0];

  const chartData = {
    labels: ["Active", "Recovered", "Deceased"],
    datasets: [
      {
        data: [active, recovered, deaths],
        backgroundColor: ["#007bff", "#28a745", "#6c757d"],
      },
    ],
  };

  const options = {
    cutout: 120,
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart, args, pluginOption) {
      const { ctx } = chart;

      ctx.save();
      ctx.font = "bolder 30px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const datasetMeta = chart.getDatasetMeta(0);
      if (datasetMeta && datasetMeta.data && datasetMeta.data.length > 0) {
        ctx.fillText(
          totalConfirmed,
          datasetMeta.data[0].x,
          datasetMeta.data[0].y
        );
      }
    },
  };

  return (
    <div
      className="donut-chart"
      style={{ position: "relative", height: "100%", width: "100%" }}
    >
      <Doughnut data={chartData} options={options} plugins={[textCenter]} />
    </div>
  );
};

export default DonutChart;
