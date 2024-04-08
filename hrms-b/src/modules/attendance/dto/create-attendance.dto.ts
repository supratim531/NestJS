import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Employee } from "src/modules/employee/employee.entity";

/*
const payload = {
  "checkIn": "04-08-2024 09:17:43",
  "employee": 1
}
*/

/**
 * @author Supratim Majumder
 * @description request-body to create attendance request. Demo payload is given above the class
 */
export class CreateAttendanceDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  checkIn: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  checkOut: Date;

  @IsNumber()
  @IsNotEmpty()
  employee: Employee;
}
