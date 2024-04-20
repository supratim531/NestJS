import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly objectSchema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.objectSchema.validate(value);

    if (error) {
      throw new UnprocessableEntityException(error.message.replaceAll('"', ''));
    }

    return value;
  }
}
