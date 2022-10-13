import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import passport from "passport";

import connectDB from "./config/db";
import favs from "./routes/favs";
import Logged from "./routes/private";
import { usersRouter } from "./routes/user";

dotenv.config({ path: "./.env" });
const app = express();
connectDB.connectDB();
app.use(express.json());
app.use(passport.initialize());
app.set("port", process.env.PORT || 3000);
app.use(morgan("tiny"));
// app.use(express.urlencoded({ extended: true }));
app.use("/", Router);
// app.use("/api/users", usersRouter);
// app.use("/api/private", Logged);
// app.use("/api/users/favs", favs);

export default app;
//hola
