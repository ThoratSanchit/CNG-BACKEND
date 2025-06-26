import { FastifyInstance } from "fastify";
import {
  addPump,
  getPump,
  getAllPumpList,
  updatePump
} from "../controller/pump.controller";

export default async function pumpRoutes(fastify: FastifyInstance) {
  fastify.post("/", addPump); 
  fastify.get("/", getAllPumpList); 
  fastify.get("/:id", getPump); 
  fastify.put("/:id", updatePump); 
}
