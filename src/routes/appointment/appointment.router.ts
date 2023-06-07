import express from "express";
import type { Request, Response } from "express";
import * as AppointmentService from "./appointment.service";
import { AuthRequest } from "routes/middleware/auth";

export const appointMentRouter = express.Router();

// GET: List of All Appointments
appointMentRouter.get("/", async (request: AuthRequest, response: Response) => {
  try {
    const { organizationId } = request.body;
    const appointment = await AppointmentService.list(organizationId);
    return response.status(200).json(appointment);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

appointMentRouter.get(
  "/:id",
  async (request: AuthRequest, response: Response) => {
    try {
      const id = request.params.id;
      const organization = await AppointmentService.getById(id);
      if (organization) {
        return response.status(200).json(organization);
      }
      return response.status(404).json("Organization could not be found");
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
);

appointMentRouter.post(
  "/",
  async (request: AuthRequest, response: Response) => {
    try {
      const { organizationId, appointment } = request.body;

      const organization = await AppointmentService.create({
        appointment,
        organizationId,
      });

      if (organization) {
        return response.status(200).json(organization);
      }
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
);
