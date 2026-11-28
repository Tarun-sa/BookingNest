import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/users";
import authRoutes from "./routers/auth";

mongoose.connect(process.env.MONGODB_CONNNECTION_STRING as string);

const app = express();
app.use(cookieParser());
app.use(express.json()); //to parse the incoming request body as JSON
app.use(express.urlencoded({ extended: true })); //to decode the form data sent by the browser
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
); //to enable cross-origin resource sharing

app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);

app.listen(7000, () => {
  console.log("server is running on port 7000");
});
