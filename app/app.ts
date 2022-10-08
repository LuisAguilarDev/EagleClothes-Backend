import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

// import connectDB from "./config/db";
import { loadApiEndpoints } from "./controllers/api";

dotenv.config({ path: "./.env" });
console.log(process.env);
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

loadApiEndpoints(app);

export default app;
