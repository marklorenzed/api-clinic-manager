import { Organization } from "@prisma/client";
import { db } from "../../utils/db";

export const listOrganizations = async (id: string): Promise<Organization[]> => {
  return db.organization.findMany({ where: { user: id } });
};

export const getOrganization = async (id: string): Promise<Organization> => {
  return db.organization.findUnique({ where: { id } });
};

export const createOrganization = async (
  organization: Omit<Organization, "id">
): Promise<Organization> => {
  const { name, address, user } = organization;

  return db.organization.create({ data: { name, address, user } });
};
