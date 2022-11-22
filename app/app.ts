import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import passport from "passport";

import connectDB from "./config/db";
import { appRouter } from "./routes/index";

dotenv.config({ path: "./.env" });
const app = express();
connectDB.connectDB();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.set("port", process.env.PORT || 3000);
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }));
app.use("/", appRouter);
app.use(express.static("../../client"));

export default app;
