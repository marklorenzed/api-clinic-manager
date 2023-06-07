import { Router } from "express";
import { organizationRouter } from "./organization/organization.router";
import auth from "./middleware/auth";
import { appointMentRouter } from "./appointment/appointment.router";

const router = Router();

router.use("/organization", [auth], organizationRouter);
router.use("/appointment", [auth], appointMentRouter);

export default router;
