import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cookieParser from 'cookie-parser'
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());



app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}))
app.use(express.json({ limit: '16kb' }))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("API is up and running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

export default app;