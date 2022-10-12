import { Router } from "express";

import favs from "../controllers/fav";

const fav = Router();

fav.use("/", favs);

export default fav;
