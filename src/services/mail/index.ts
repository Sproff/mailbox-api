import Mail from "@/models/mail";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const getAllMails = async (userId: string, q: RegExp | null) => {
  return q
    ? await Mail.find({
        userId,
        $or: [{ subject: { $regex: q } }, { content: { $regex: q } }],
      })
    : await Mail.find({
        userId,
      });
};

export const getMailsById = async (mailId: string) => {
  return await Mail.findOne({
    _id: new ObjectId(mailId),
  });
};

export const updateMailsById = async (mailId: string) => {
  return await Mail.updateOne(
    {
      _id: new ObjectId(mailId),
    },
    {
      isRead: true,
    }
  );
};
