import { PartialType } from "@nestjs/mapped-types";
import { CreateLeaveDto } from "./create-leave.dto";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Status } from "src/enums/status.enum";

export class UpdateLeaveDto extends PartialType(CreateLeaveDto) {
  @IsEnum(Status, { message: 'leaveStatus must be PENDING or APPROVED or REJECTED' })
  @IsNotEmpty()
  @IsOptional()
  leaveStatus: Status;
}
