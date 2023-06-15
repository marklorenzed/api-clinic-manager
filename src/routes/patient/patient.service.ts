import { Patient } from "@prisma/client";
import { db } from "../../utils/db";

export const list = async (): Promise<Patient[]> => {
  return db.patient.findMany();
};

export const getById = async (id: string): Promise<Patient> => {
  return db.patient.findUnique({ where: { id } });
};

export const create = async (
  patient: Omit<Patient, "id">
): Promise<Patient> => {
  const { name, age } = patient;

  return db.patient.create({ data: { name, age } });
};
