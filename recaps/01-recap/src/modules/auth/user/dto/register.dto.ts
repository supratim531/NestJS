import { IsNotEmpty } from 'class-validator';
import * as Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(100).required(),
  lastName: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(8).max(100).required(),
  password: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9]{3,30}$/),
});

export class RegisterDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
