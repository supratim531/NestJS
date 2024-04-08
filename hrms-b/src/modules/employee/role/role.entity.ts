import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee.entity";
import { RoleType } from "src/enums/role-type.enum";

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  roleId: number;

  @Column({ name: 'role_type', type: 'enum', enum: RoleType, unique: true })
  roleType: RoleType;

  @Column({ name: 'role_desc', type: 'text' })
  roleDesc: string;

  @OneToMany(() => Employee, employee => employee.role)
  employees: Employee[];

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
