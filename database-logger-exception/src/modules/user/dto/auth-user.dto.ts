import * as Joi from 'joi';

export const authUserSchema = Joi.object({
  username: Joi.string().alphanum().min(8).max(60).required(),
  password: Joi.string().required()
});

export class AuthUserDto {
  username: string;
  password: string;
}
