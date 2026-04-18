import joi from "joi";

export const registerSchema = joi.object({
  UserID: joi.number().optional(),
  Name: joi.string().required(),
  Username: joi.string().optional(),
  Surname: joi.string().required(),
  Email: joi.string().required(),
  Password: joi.string().optional(),
  Phone: joi.string().optional(),
});
