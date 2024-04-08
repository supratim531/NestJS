import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";
import { Status } from "src/enums/status.enum";

@Entity({ name: 'attendances' })
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'att_id' })
  attId: number;

  @Column({ name: 'check_in', type: 'datetime' })
  checkIn: Date;

  @Column({ name: 'check_out', type: 'datetime', default: null })
  checkOut: Date;

  @Column({ name: 'att_status', type: 'enum', enum: Status })
  attStatus: Status;

  @ManyToOne(() => Employee, employee => employee.attendances)
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
