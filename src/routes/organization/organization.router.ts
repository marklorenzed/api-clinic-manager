import express from "express";
import type { Request, Response } from "express";

import * as OrganizationService from "./organization.service";
import { Organization } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import getAuthUser from "../../utils/getAuthUser";

export const organizationRouter = express.Router();


// GET: List of All Organizations
organizationRouter.get("/", async (request: Request, response: Response) => {
  const user = await getAuthUser(request, response)

  if (!user) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    const organizations = await OrganizationService.listOrganizations(user);
    return response.status(200).json(organizations);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

organizationRouter.get("/:id", async (request: Request, response: Response) => {
  const id = request.params.id;
  
  try {
    const organization = await OrganizationService.getOrganization(id);
    if (organization) {
      return response.status(200).json(organization);
    }
    return response.status(404).json("Organization could not be found");
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

organizationRouter.post("/", async (request: Request, response: Response) => {
  const user = await getAuthUser(request, response)

  if (!user) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { name, address } = request.body;
    console.log("here");
    if (typeof name === "string" && typeof address === "string") {
      const organization = await OrganizationService.createOrganization({
        name,
        address,
        user: user,
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
