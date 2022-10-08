import express from "express";
import path from "path";
import { loadApiEndpoints } from "./controllers/api";

require("dotenv").config({ path: "./.env" });
const app = express();
console.log(process.env.PORT)
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);

loadApiEndpoints(app);

export default app;
