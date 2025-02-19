import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Task name',
    example: 'New Task',
  })
  @MaxLength(100)
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Task description as your task',
  })
  @MaxLength(255)
  @MinLength(2)
  @IsNotEmpty()
  details: string;

  @ApiProperty({
    description: 'User Id',
    example: 1,
    required: false,
  })
  userId?: number;
}
