import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  FormFieldHideInSetting,
  FormFieldTitle,
} from '@/database/entity/decorators';

export abstract class Base {
  @PrimaryGeneratedColumn('increment')
  @FormFieldHideInSetting()
  @FormFieldTitle('ID')
  id!: number;

  @IsDate()
  @Type(() => Date)
  @CreateDateColumn()
  @FormFieldHideInSetting()
  @FormFieldTitle('Created At')
  createdAt!: Date;

  @IsDate()
  @Type(() => Date)
  @UpdateDateColumn()
  @FormFieldHideInSetting()
  @FormFieldTitle('Updated At')
  updatedAt!: Date;

  @IsDate()
  @Type(() => Date)
  @DeleteDateColumn()
  @FormFieldHideInSetting()
  @FormFieldTitle('Deleted At')
  deletedAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  externalId!: string | null;
}
