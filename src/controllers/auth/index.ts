import { Request, Response } from "express";
import { generateToken } from "@/helpers/auth";
import { CustomError } from "@/types/utils";
import { handleError } from "@/utils/errorHandler";
import { User, UserDocProps } from "@/types/auth";

export const loginUser = (
  req: Request & { user?: UserDocProps },
  res: Response
) => {
  const user = req?.user?._doc as User;
  
  try {
    const token = generateToken(
      {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      process.env.SECRET as string
    );
    

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    handleError(error as CustomError, res);
  }
};
