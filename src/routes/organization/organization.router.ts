import express from "express";
import type { Response } from "express";

import { AuthRequest } from "routes/middleware/auth";
import { createOrganization, getOrganization, listOrganizations } from "./organization.service";

export const organizationRouter = express.Router();


// GET: List of All Organizations
organizationRouter.get("/", async (request: AuthRequest, response: Response) => {
  try {
    const organizations = await listOrganizations(request.user.id);
    return response.status(200).json(organizations);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

organizationRouter.get("/:id", async (request: AuthRequest, response: Response) => {
  try {
    const id = request.params.id;
    const organization = await getOrganization(id);
    if (organization) {
      return response.status(200).json(organization);
    }
    return response.status(404).json("Organization could not be found");
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

organizationRouter.post("/", async (request: AuthRequest, response: Response) => {
  try {
    const { name, address } = request.body;
    if (typeof name === "string" && typeof address === "string") {
      const organization = await createOrganization({
        name,
        address,
        user: request.user.id,
      });

      if (organization) {
        return response.status(200).json(organization);
      }
    } else {
      return response.status(500).json({ message: "Name is required" });
    }
  } catch (error) {
    return response.status(500).json({message: error.message});
  }
});
