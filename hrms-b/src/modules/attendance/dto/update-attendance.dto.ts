import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CreateAttendanceDto } from "./create-attendance.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Status } from "src/enums/status.enum";

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) {
  @IsEnum(Status, { message: 'attStatus must be PENDING or APPROVED or REJECTED' })
  @IsNotEmpty()
  @IsOptional()
  attStatus: Status;
}
