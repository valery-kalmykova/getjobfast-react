import {IsNotEmpty, IsString, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { USER_ROLE } from '../types/types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @IsString()
  middle_name: string;
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  title: string;  
  @Type(() => Number)
  total_experience_months: number;
  @IsArray()
  experience: []
}
