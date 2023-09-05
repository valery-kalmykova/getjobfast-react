import {IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  email: string;
  @IsString()
  first_name: string;
  @IsString()
  middle_name: string;
  @IsString()
  last_name: string;
  @IsString()
  phone: string;
  @IsString()
  title: string;  
  @Type(() => Number)
  total_experience_months: number;
  @IsArray()
  experience: []
}
