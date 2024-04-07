import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Quiz } from "../quiz.entity";
import { Option } from "../option/option.entity";

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'question_id' })
  questionId: number;

  @Column({ type: 'text' })
  question: string;

  @ManyToOne(() => Quiz, quiz => quiz.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @OneToMany(() => Option, option => option.question)
  options: Option[];

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
