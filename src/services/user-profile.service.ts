import { IUserProfile } from "../interface/user-profile.controller";
import { UserProfileModel } from "../model/user-profile.model";

export const createUserProfile = async (data: IUserProfile) => {
  const profile = new UserProfileModel(data);
  await profile.save();
  return profile;
};


export const getAllProfilesByUserID = async (userID: string) => {
  return await UserProfileModel.find({ userID });
};
