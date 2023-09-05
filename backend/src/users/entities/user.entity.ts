import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { USER_ROLE } from '../types/types';

@Entity()
export class User extends BaseEntity {
  @Column({ default: "не указан" })
  @IsEmail()
  email: string;

  @Column({ default: "user" })
  @IsString() @IsEnum(USER_ROLE)
  role: USER_ROLE

  @Column({ default: "не указан" })
  @IsString()
  first_name: string;

  @Column({ default: "не указан" })
  @IsString()
  middle_name: string;

  @Column({ default: "не указан" })
  @IsString()
  last_name: string;

  @Column({ default: "не указан" })
  @IsString()
  phone: string;

  @Column({nullable: false, default: "не заполнено"})
  @IsString()
  title: string;

  @Column({nullable: false, default: 0, type: "int"})
  total_experience_months: number;

  @Column('jsonb', {nullable: false, default: {}})
  experience: {
    start: string;
    end: string;
    company: string;
    position: string;
    description: string;    
  }[]
}
