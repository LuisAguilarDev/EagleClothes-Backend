import express from "express";

import { loadApiEndpoints } from "./controllers/api";

// require("dotenv").config({ path: "./.env" });

const app = express();
console.log(process.env.PORT);
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

loadApiEndpoints(app);

export default app;
