import * as bcrypt from 'bcrypt';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from './role/role.entity';
import { Attendance } from '../attendance/attendance.entity';

@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'emp_id' })
  empId: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, role => role.employees)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Attendance, attendance => attendance.employee)
  attendances: Attendance[];

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async setHashedPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
