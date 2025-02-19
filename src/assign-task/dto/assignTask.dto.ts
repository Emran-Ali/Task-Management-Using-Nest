import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignTaskDto {
  @ApiProperty({
    description: 'User Id',
    example: 1,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Time to complete task',
    example: '1:30',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-9]):([0-5]\d)$/, {
    message: 'Time must be in HH:MM format (24-hour clock)',
  })
  time?: string;
}
