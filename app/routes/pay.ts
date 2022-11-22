import { Router } from "express";

import * as payController from "../controllers/pay";
import { auth } from "../middleware/passport-jwt";

const payRouter = Router();

payRouter.post("/", auth, payController.pay);

// payRouter.post("/create_preference", payController.pay);

// payRouter.get("/feedback", payController.pay);

export default payRouter;
