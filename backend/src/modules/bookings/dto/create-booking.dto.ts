import {
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  purpose?: string;

  @IsDateString()
  startTime!: string;

  @IsDateString()
  endTime!: string;

  @IsString()
  roomId!: string;

  @IsString()
  userId!: string;
}