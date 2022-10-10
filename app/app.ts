import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import passport from "passport";

import connectDB from "./config/db";
import { loadApiEndpoints } from "./controllers/api";
import { usersRouter } from "./controllers/user";
import JWTStrategy from "./middleware/passport-jwt";
import Logged from "./routes/private";

dotenv.config({ path: "./.env" });
const app = express();
connectDB.connectDB();
// console.log(Session);
// app.use(
//   Session({
//     store: new RedisStore({
//       url: config.redisStore.url,
//     }),
//     secret: config.redisStore.secret,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(express.json());
app.use(passport.initialize());
app.set("port", process.env.PORT || 3000);
passport.use(JWTStrategy);
app.use(morgan("tiny"));
// app.use(express.urlencoded({ extended: true }));
app.use("/api/users", usersRouter);
app.use("/api/private", Logged);

loadApiEndpoints(app);

export default app;
