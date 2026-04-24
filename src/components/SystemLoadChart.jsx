import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const SystemLoadChart = () => {
  const [dataPoints, setDataPoints] = useState([65, 59, 80, 81, 56, 55, 40, 45, 60, 75]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 50) + 40];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        fill: true,
        label: 'System Load',
        data: dataPoints,
        borderColor: '#EAB308', // Aureum 500
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      }
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: 0,
        max: 100,
      },
    },
    animation: {
      duration: 0, // Disable animation for smoother continuous update effect if using custom intervals
    }
  };

  return <Line options={options} data={data} />;
};

export default SystemLoadChart;
