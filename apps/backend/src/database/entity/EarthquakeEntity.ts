import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';

import { Base } from '@/database/entity/Base';

@Entity('earthquake')
@Index('idx_name', ['location'])
export class Earthquake extends Base {
  @IsString()
  @Column({ type: 'varchar', length: 255 })
  public location!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 15 })
  @Column({ type: 'float' })
  public magnitude!: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Column({ type: 'timestamp' })
  public date!: Date;
}
