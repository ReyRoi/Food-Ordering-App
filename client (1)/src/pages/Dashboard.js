import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const chartRef = useRef(null);

  // Dummy data for restaurant stats
  const statsData = {
    revenue: 15000,
    burgersSold: 300,
    pizzasSold: 300,
    juicesSold: 200
  };

  // Data for chart
  const chartData = {
    labels: ['Burgers', 'Pizzas', 'Juices','grapes','sandwich'],
    datasets: [{
      label: 'Items Sold',
      data: [statsData.burgersSold, statsData.pizzasSold, statsData.juicesSold],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Create or update chart
  useEffect(() => {
    const ctx = chartRef.current;
    if (ctx) {
      if (ctx.chart) {
        ctx.chart.destroy();
      }
      ctx.chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  }, [chartData, chartOptions]);

  return (
    <div className="container mx-auto mt-8 ">
      <h1 className="text-3xl font-bold mb-4">Restaurant Stats</h1>
      <div className="grid grid-cols-2  gap-4">
        <div className="flex flex-col p-4 rounded-md">
          <h2 className="text-xl font-bold mb-2">Items Sold</h2>
          <canvas className='text-black' ref={chartRef} ></canvas>
        </div>
        {/* <div className='flex items-center justify-center'><button className='bg-custom-secondary px-3 py-3 rounded text-2xl active:scale-[.98] active-duration-75 hover:scale-[1.06] ease-in-out transition-all' >view stats</button></div> */}
      </div>
      <dl class="mt-16 grid grid-cols-1 gap-3 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4 ">
        <div class="flex flex-col bg-custom-secondary p-8 ">
          <dt class="text-sm font-semibold leading-6 text-white">Total revenue</dt>
          <dd class="order-first text-4xl font-semibold tracking-tight text-white">100</dd>
        </div>
        <div class="flex flex-col bg-custom-secondary p-8">
          <dt class="text-sm font-semibold leading-6 text-white">Daily revenue</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-white">200</dd>
        </div>
        <div class="flex flex-col bg-custom-secondary p-8">
          <dt class="text-sm font-semibold leading-6 text-white">Chicken piece</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-white">50</dd>
        </div>
        <div class="flex flex-col bg-custom-secondary p-8">
          <dt class="text-sm font-semibold leading-6 text-white">Juices</dt>
          <dd class="order-first text-3xl font-semibold tracking-tight text-white">30</dd>
        </div>
      </dl>
    </div>
  );
};



export default Dashboard;