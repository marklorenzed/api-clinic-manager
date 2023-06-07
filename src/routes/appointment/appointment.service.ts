import { Appointment } from "@prisma/client";
import { db } from "../../utils/db";

export const list = async (organizationId: string): Promise<Appointment[]> => {
  return db.appointment.findMany({ where: { organizationId } });
};

export const getById = async (id: string): Promise<Appointment> => {
  return db.appointment.findUnique({ where: { id } });
};

export const create = async (data: {
  appointment: Omit<Appointment, "id">;
  organizationId: string;
}): Promise<Appointment> => {
  const { organizationId, appointment } = data;

  return db.appointment.create({
    data: {
      ...appointment,
      organizationId
    },
  });
};
