import { Router } from "express";

import * as addressController from "../controllers/address";
import { auth } from "../middleware/passport-jwt";

const addressRouter = Router();

addressRouter.post("/", auth, addressController.postAddress);
addressRouter.delete("/:index", auth, addressController.deleteAddress);
addressRouter.get("/", auth, addressController.getAddress);

export default addressRouter;
