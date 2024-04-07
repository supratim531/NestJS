import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question } from "../question/question.entity";

@Entity('options')
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'option_id' })
  optionId: number;

  @Column({ name: 'option', type: 'varchar' })
  option: string;

  @Column({ name: 'is_correct', type: 'boolean' })
  isCorrect: boolean;

  @ManyToOne(() => Question, question => question.options)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
