import { FastifyInstance } from "fastify";
import { createProfile, getProfilesByUserID } from "../controller/user-profile.controller";

export  async function userProfileRoutes(fastify: FastifyInstance) {
  fastify.post("/user-profile", createProfile); 
 
  fastify.get("/user-profile/user/:userID", getProfilesByUserID); 
}
