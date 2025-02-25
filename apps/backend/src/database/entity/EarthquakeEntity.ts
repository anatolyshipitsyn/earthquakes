import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

import { Base } from '@/database/entity/Base';

@Entity('earthquake')
@Index('idx_name', ['location'])
export class Earthquake extends Base {
  @IsString()
  @Column({ type: 'varchar', length: 255, nullable: false })
  public location!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 15 })
  @Column({ type: 'float', nullable: true })
  public magnitude!: number | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Column({ type: 'timestamp', nullable: true })
  date?: Date;
}
