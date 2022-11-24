import { Router } from "express";

import * as payController from "../controllers/pay";
import { auth } from "../middleware/passport-jwt";

const payRouter = Router();

payRouter.post("/", auth, payController.pay);

payRouter.get("/success/:id", payController.confirm);

payRouter.get("/failure", payController.pay);

payRouter.get("/pending", payController.pay);

export default payRouter;
