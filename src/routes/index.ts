import { Router } from "express";
import { organizationRouter } from "./organization/organization.router";

const router = Router();

router.use("/organization", organizationRouter);

export default router;
