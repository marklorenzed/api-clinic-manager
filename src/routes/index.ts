import { Router } from "express";
import { organizationRouter } from "./organization/organization.router";
import auth from "./middleware/auth";
import { appointMentRouter } from "./appointment/appointment.router";
import { patientRouter } from "./patient/patient.router";

const router = Router();

router.use("/organization", [auth], organizationRouter);
router.use("/appointment", [auth], appointMentRouter);
router.use("/patient", [auth], patientRouter);

export default router;
