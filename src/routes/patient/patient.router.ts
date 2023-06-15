import express from "express";
import { AuthRequest } from "routes/middleware/auth";
import type { Response } from "express";
import { create, list } from "./patient.service";

export const patientRouter = express.Router();

// GET: List of All Organizations
patientRouter.get("/", async (request: AuthRequest, response: Response) => {
  try {
    const patients = await list();
    return response.status(200).json(patients);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

patientRouter.post("/", async (request: AuthRequest, response: Response) => {
  try {
    const {
      patient: { name, age },
    } = request.body;
    console.log(request.body);
    if (typeof name !== "string") {
      return response.status(500).json({ message: "First Name is required" });
    }
    if (typeof age !== "number") {
      return response.status(500).json({ message: "Age is required" });
    }


    const patient = await create({
      name,
      age,
    });

    if (patient) {
      return response.status(200).json(patient);
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});
