import { useEffect, useState } from "react";
import axios from "axios";
import { Chart, ArcElement } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(ArcElement);

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/portfolio").then((response) => {
      setPortfolio(response.data);
    });
  }, []);

  const data = {
    labels: portfolio.map((asset) => asset.token),
    datasets: [
      {
        data: portfolio.map((asset) => asset.valueUSD),
        backgroundColor: [
          "#876FD4",
          "#F5921B",
          "#FFCE56",
          "#4BC0C0",
          "#36A2EB",
        ],
      },
    ],
  };

  return (
    <div>
      <h1>Your Portfolio</h1>
      <Pie data={data} />
      <ul>
        {portfolio.map((asset) => (
          <li key={asset.token}>
            {asset.token}: {asset.balance} (${asset.valueUSD})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
