import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @IsDate()
  @Type(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @IsDate()
  @Type(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;

  @IsDate()
  @Type(() => Date)
  @DeleteDateColumn()
  deletedAt?: Date;
}
