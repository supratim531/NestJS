import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(8).max(60).required(),
  password: Joi.string().required()
});

export class CreateUserDto {
  email: string;
  username: string;
  password: string;
}
