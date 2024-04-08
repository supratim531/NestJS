import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";

enum Status {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE'
}

@Entity({ name: 'attendances' })
export class Attendance extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'att_id' })
  attId: number;

  @Column({ name: 'check_in', type: 'datetime' })
  checkIn: Date;

  @Column({ name: 'check_out', type: 'datetime' })
  checkOut: Date;

  @Column({ name: 'status', type: 'enum', enum: Status })
  status: Status;

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
