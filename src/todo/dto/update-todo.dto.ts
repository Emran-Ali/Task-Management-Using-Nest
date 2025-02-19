import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    description: 'Task name',
    example: 'New Task',
    required: false,
  })
  @MaxLength(100)
  @MinLength(2)
  name?: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Task description as your task',
    required: false,
  })
  @MaxLength(255)
  @MinLength(2)
  details?: string;

  @ApiProperty({
    description: 'User Id',
    example: 1,
    required: false,
  })
  userId?: number;
}
