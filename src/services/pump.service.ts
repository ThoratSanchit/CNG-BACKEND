import { IPump } from "../interface/pump.controller"; 
import { PumpModel } from "../model/pump.model";

export const createPump = async (data: IPump) => {
  const pump = new PumpModel(data);
  await pump.save();
  return pump;
};

export const getPumpById = async (id: string) => {
  return await PumpModel.findById(id);
};

export const getPumpsByOwner = async (ownerID: string) => {
  return await PumpModel.find({ ownerID });
};

export const getPumpWithOwner = async (ownerID: string) => {
  return await PumpModel.find({ownerID});
};

export const getAllPumps = async () => {
  return await PumpModel.find();
};

export const updatePumpById = async (id: string, updates: Partial<IPump>) => {
  return await PumpModel.findByIdAndUpdate(
    id,
    { ...updates, last_updated: new Date() },
    { new: true }
  );
};
