import { FastifyRequest, FastifyReply } from "fastify";
import { IUserProfile } from "../interface/user-profile.controller";
import { createUserProfile, getAllProfilesByUserID } from "../services/user-profile.service";

export const createProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = request.body as IUserProfile;

    const profile = await createUserProfile(data);
    reply.status(201).send({ status: "success", profile });
  } catch (err: any) {
    reply.status(500).send({ status: "error", message: err.message || "Error creating profile" });
  }
};

export const getProfilesByUserID = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { userID } = request.params as { userID: string };
    const profiles = await getAllProfilesByUserID(userID);

    reply.send({ status: "success", profiles });
  } catch (err: any) {
    reply.status(500).send({ status: "error", message: err.message || "Error fetching profiles" });
  }
};
