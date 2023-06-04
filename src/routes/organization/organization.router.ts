import express from "express";
import type { Request, Response } from "express";
import * as OrganizationService from "./organization.service";
import { AuthRequest } from "routes/middleware/auth";

export const organizationRouter = express.Router();


// GET: List of All Organizations
organizationRouter.get("/", async (request: AuthRequest, response: Response) => {
  try {
    const organizations = await OrganizationService.listOrganizations(request.user.id);
    return response.status(200).json(organizations);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

organizationRouter.get("/:id", async (request: AuthRequest, response: Response) => {
  try {
    const id = request.params.id;
    const organization = await OrganizationService.getOrganization(id);
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
      const organization = await OrganizationService.createOrganization({
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
