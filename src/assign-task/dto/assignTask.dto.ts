import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-9]):([0-5]\d)$/, {
    message: 'Time must be in HH:MM format (24-hour clock)',
  })
  time?: string;
}
