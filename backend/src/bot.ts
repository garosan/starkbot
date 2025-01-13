import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to your Portfolio Bot! Use /portfolio to view your portfolio."
  );
});

bot.onText(/\/portfolio/, async (msg) => {
  // Fetch portfolio data from API
  const response = await fetch("http://localhost:3000/api/portfolio");
  const portfolio = await response.json();

  let message = "Your Portfolio:\n";
  portfolio.forEach((asset: any) => {
    message += `${asset.token}: ${asset.balance} ($${asset.valueUSD})\n`;
  });

  bot.sendMessage(msg.chat.id, message);
});

bot.onText(/\/risk/, async (msg) => {
  // Fetch portfolio data from the backend
  const response = await fetch("http://localhost:3000/api/portfolio");
  const portfolio: { token: string; balance: number; valueUSD: number }[] =
    await response.json();

  // Calculate token concentration (e.g., percentage of portfolio in top token)
  const totalValue = portfolio.reduce((sum, asset) => sum + asset.valueUSD, 0);
  const topAsset = portfolio.reduce((prev, current) =>
    current.valueUSD > prev.valueUSD ? current : prev
  );
  const concentration = ((topAsset.valueUSD / totalValue) * 100).toFixed(2);

  // Create a risk analysis message
  let message = `📊 *Risk Analysis*\n\n`;
  message += `- Top Asset: ${topAsset.token} (${concentration}% of portfolio)\n`;
  message += `- Suggestion: ${
    parseFloat(concentration) > 50
      ? "Consider diversifying your assets."
      : "Your portfolio is well-balanced!"
  }`;

  bot.sendMessage(msg.chat.id, message, { parse_mode: "Markdown" });
});

export default bot;
