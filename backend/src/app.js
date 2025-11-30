import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is up and running!");
});
app.use("/api/auth",authRoutes);
// app.use("/api/products",productRoutes);

export default app;