import { Router } from "express";

import * as favController from "../controllers/fav";
import { auth } from "../middleware/passport-jwt";

const favRouter = Router();

favRouter.post("/", auth, favController.createFav);

export default favRouter;
