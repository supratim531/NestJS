import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Employee } from "src/modules/employee/employee.entity";

/*
const payload = {
  "startDate": "04-11-2024",
  "endDate": "04-13-2024",
  "reason": "This is personal",
  "employee": 1
}
*/

/**
 * @author Supratim Majumder
 * @description request-body to create leave request. Demo payload is given above the class
 */
export class CreateLeaveDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsNumber()
  @IsNotEmpty()
  employee: Employee;
}
