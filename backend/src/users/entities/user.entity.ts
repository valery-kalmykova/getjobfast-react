import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  IsString,
  IsEmail,
  IsArray,
} from 'class-validator';


@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  first_name: string;

  @Column()
  @IsString()
  middle_name: string;

  @Column()
  @IsString()
  last_name: string;

  @Column()
  @IsString()
  phone: string;

  @Column()
  @IsString()
  resumes: string;
}
