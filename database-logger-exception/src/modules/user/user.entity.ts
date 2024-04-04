import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id'
  })
  userId: number;

  @Column({
    name: 'username',
    type: 'varchar'
  })
  username: string;

  @Column({
    name: 'password',
    type: 'varchar'
  })
  password: string;

  @Column({
    name: 'email',
    type: 'varchar'
  })
  email: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  updatedAt: Date;
}
