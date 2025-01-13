import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  // Simulate fetching portfolio data
  const portfolio = [
    { token: "ETH", balance: 1.67, valueUSD: 4500 },
    { token: "DAI", balance: 100, valueUSD: 100 },
    { token: "USDT", balance: 1000, valueUSD: 1000 },
    { token: "BTC", balance: 0.03, valueUSD: 2827 },
    { token: "DOGE", balance: 332, valueUSD: 110 },
  ];
  res.json(portfolio);
});

export default router;
