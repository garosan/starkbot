import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  // Simulate fetching portfolio data
  const portfolio = [
    { token: "ETH", balance: 10, valueUSD: 15000 },
    { token: "DAI", balance: 100, valueUSD: 100 },
  ];
  res.json(portfolio);
});

export default router;
