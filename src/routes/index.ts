import { Router } from "express";
import { organizationRouter } from "./organization/organization.router";
import auth from "./middleware/auth";

const router = Router();

router.use("/organization", [auth], organizationRouter);

export default router;
