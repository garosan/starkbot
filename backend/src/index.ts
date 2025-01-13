import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import portfolioRoutes from "./routes/portfolio";

dotenv.config();

const app = express();
export { app };
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
  })
);

app.use(express.json());
app.use("/api/portfolio", portfolioRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
