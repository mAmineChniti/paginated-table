'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface GraphProps {
  data: { id: number; title: string; body: string }[];
}

export default function Graph({ data }: GraphProps) {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'bar'> | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map((item) => item.title),
            datasets: [
              {
                label: 'Data Distribution',
                data: data.map((item) => item.id),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
                  text: 'ID',
                  color: 'black',
                  font: {
                    size: 15,
                    weight: 'bold',
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Title',
                  color: 'black',
                  font: {
                    size: 15,
                    weight: 'bold',
                  },
                },
              },
            },
          },
        });
      }
    }

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
}
