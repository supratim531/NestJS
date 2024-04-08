import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";
import { Status } from "src/enums/status.enum";

@Entity({ name: 'leaves' })
export class Leave {
  @PrimaryGeneratedColumn({ name: 'leave_id' })
  leaveId: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ type: 'text', nullable: false })
  reason: string

  @Column({ name: 'leave_status', type: 'enum', enum: Status })
  leaveStatus: Status;

  @ManyToOne(() => Employee, employee => employee.leaves)
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
