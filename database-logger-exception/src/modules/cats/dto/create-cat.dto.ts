import * as Joi from 'joi';

export const createCatSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(150).required()
});

export class CreateCatDto {
  name: string;
  email: string;
  age: number;
}
