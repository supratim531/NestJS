import * as Joi from "joi";

export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(150).required()
})

export class CreateCatDto2 {
  name: string;
  email: string;
  age: number;
}
