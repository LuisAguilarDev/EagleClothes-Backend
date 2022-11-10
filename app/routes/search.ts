import { Router } from "express";

import * as searchController from "../controllers/search";

const searchRouter = Router();

searchRouter.get("/:name", searchController.getProducts);

export { searchRouter };
