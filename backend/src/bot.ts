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

export default bot;
