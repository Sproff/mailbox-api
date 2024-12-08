import Joi from "joi";

export const emailCheck = (): Joi.StringSchema =>
  Joi.string().email().required().messages({
    "string.base": `"email" should be a type of text`,
    "string.empty": `"email" cannot be an empty field`,
    "string.email": `"email" must be a valid email`,
    "any.required": `"email" is a required field`,
  });

export const passwordCheck = (): Joi.StringSchema =>
  Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"))
    .messages({
      "string.base": `"password" should be a type of text`,
      "string.empty": `"password" cannot be an empty field`,
      "any.required": `"password" is a required field`,
      "string.pattern.base": `"password" must have a minimum of eight characters, at least one capital letter, and one number`,
    });

export const editStringCheck = (param: string, min = 1, max = 120000000000) =>
  Joi.string()
    .min(min)
    .max(max)
    .trim()
    .allow(null, "")
    .messages({
      "string.base": `${param}  must be a string`,
      "string.min": `${param} can not be lesser than ${min} characters`,
      "string.max": `${param} can not be greater than ${max} characters`,
    });
