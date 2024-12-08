import { NextFunction, Request, Response } from "express";
import { getAllMails, getMailsById, updateMailsById } from "@/services/mail";
import { CustomError } from "@/types/utils";
import { ErrorHandler, handleError } from "@/utils/errorHandler";
import { User } from "@/types/auth";

export const fetchSingleMail = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { mailId } = req.params;
    const mail = await getMailsById(mailId);

    if (!mail) throw ErrorHandler(404, "Mail does not exist");
    updateMailsById(mailId);

    res.status(200).json({
      status: "success",
      message: "Mail fetched successfully",
      data: {
        mail,
      },
    });
  } catch (error) {
    handleError(error as CustomError, res);
  }
};

export const fetchMails = async (
  req: Request & { user?: Partial<User> },
  res: Response,
  _next: NextFunction
) => {
  try {
    const { q } = req.query;
    const searchQuery = decodeURI(q as string);
    const escapedFormatQuery = searchQuery.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regexPattern = new RegExp(escapedFormatQuery, "i");
    const userId = req?.user?._id?.toString() as string;
    const mails = await getAllMails(userId, q ? regexPattern : null);

    if (mails.length < 1) {
      throw ErrorHandler(404, "No mails found.");
    }

    res.status(201).json({
      status: "success",
      message: "Mails found successfully",
      data: {
        mails,
      },
    });
  } catch (error) {
    handleError(error as CustomError, res);
  }
};
