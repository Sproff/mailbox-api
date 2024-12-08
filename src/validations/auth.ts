import Joi from "joi";
import {
  editStringCheck,
  emailCheck,
  passwordCheck,
} from "@/helpers/validation";

export const loginSchema = Joi.object({
  email: emailCheck(),
  password: passwordCheck(),
});

export const searchMailsSchema = Joi.object({
  q: editStringCheck("query"),
});
