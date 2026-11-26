import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routers/users";

mongoose.connect(process.env.MONGODB_CONNNECTION_STRING as string);

const app = express();
app.use(express.json()); //to parse the incoming request body as JSON
app.use(express.urlencoded({ extended: true })); //to decode the form data sent by the browser
app.use(cors()); //to enable cross-origin resource sharing

app.use("/api/users/", userRoutes);

app.listen(7000, () => {
  console.log("server is running on port 7000");
});
