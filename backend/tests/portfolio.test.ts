import request from "supertest";
import { app } from "../src/index"; // Assuming Express app is exported

describe("Portfolio API", () => {
  it("should return the portfolio", async () => {
    const response = await request(app).get("/api/portfolio");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { token: "ETH", balance: 10, valueUSD: 15000 },
      { token: "DAI", balance: 100, valueUSD: 100 },
    ]);
  });
});
