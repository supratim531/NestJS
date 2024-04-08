import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";

@Entity({ name: 'payrolls' })
export class Payroll extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'payroll_id' })
  payrollId: number;

  @Column({ type: 'varchar', nullable: false })
  month: string;

  @Column({ type: 'varchar', nullable: false })
  year: string;

  @Column({ name: 'basic_salary', type: 'varchar', nullable: false })
  basicSalary: string;

  @Column({ type: 'varchar' })
  allowances: string;

  @Column({ type: 'varchar' })
  deductions: string;

  @Column({ name: 'net_salary', type: 'varchar', nullable: false })
  netSalary: string;

  @ManyToOne(() => Employee, employee => employee.payrolls)
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
