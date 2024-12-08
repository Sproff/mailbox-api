import User from "@/models/user";

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
