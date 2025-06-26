import { FastifyRequest, FastifyReply } from "fastify";
import { IPump } from "../interface/pump.controller";
import {
  createPump,
  getPumpById,
  getPumpsByOwner,
  getPumpWithOwner,
  getAllPumps,
  updatePumpById
} from "../services/pump.service";

export const addPump = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = request.body as IPump;
    const pump = await createPump({ ...data, last_updated: new Date() });
    reply.status(201).send({ status: "success", pump });
  } catch (err: any) {
    reply.status(500).send({ status: "error", message: err.message });
  }
};

export const getAllPumpList = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const pumps = await getAllPumps();
    reply.send({ status: "success", pumps });
  } catch (err: any) {
    reply.status(500).send({ status: "error", message: err.message });
  }
};

export const getPump = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const pump = await getPumpWithOwner(id);

    if (!pump) {
      return reply.status(404).send({ status: "fail", message: "Pump not found" });
    }

    reply.send({ status: "success", pump });
  } catch (err: any) {
    reply.status(500).send({ status: "error", message: err.message });
  }
};

export const updatePump = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const updates = request.body as Partial<IPump>;

    const updated = await updatePumpById(id, updates);
    if (!updated) {
      return reply.status(404).send({ status: "fail", message: "Pump not found to update" });
    }

    reply.send({ status: "success", pump: updated });
  } catch (err: any) {
    reply.status(500).send({ status: "error", message: err.message });
  }
};
