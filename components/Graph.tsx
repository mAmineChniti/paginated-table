import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Graph = ({ data }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.title),
        datasets: [
          {
            label: "Data Distribution",
            data: data.map((item) => item.id),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "ID",
              color: "black",
              font: {
                size: 15,
                weight: "bold",
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Title",
              color: "black",
              font: {
                size: 15,
                weight: "bold",
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="mt-4">
      <canvas ref={chartContainer} width="400" height="200"></canvas>
    </div>
  );
};

export default Graph;
