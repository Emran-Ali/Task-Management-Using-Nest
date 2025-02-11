import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { MaxLength, MinLength } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @MaxLength(100)
  @MinLength(2)
  name?: string;

  @MaxLength(255)
  @MinLength(2)
  details?: string;

  userId?: number;
}
