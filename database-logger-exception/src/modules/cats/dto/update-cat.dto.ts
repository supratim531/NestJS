import * as Joi from 'joi';
import { PartialType } from "@nestjs/mapped-types";
import { CreateCatDto } from "./create-cat.dto";

export const updateCatSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  email: Joi.string().email().optional(),
  age: Joi.number().min(18).max(150).optional()
});

export class UpdateCatDto extends PartialType(CreateCatDto) {
}
