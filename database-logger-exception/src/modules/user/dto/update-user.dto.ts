import * as Joi from 'joi';
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  username: Joi.string().alphanum().min(8).max(60).optional(),
  password: Joi.string().optional()
});

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
