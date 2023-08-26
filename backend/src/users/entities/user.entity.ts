import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { IsString, IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
import { USER_ROLE } from '../types/types';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ default: "user" })
  @IsString() @IsEnum(USER_ROLE)
  role: USER_ROLE

  @Column()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @Column()
  @IsString()
  middle_name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @Column()
  @IsNotEmpty()
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
