import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @MaxLength(100)
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @MinLength(2)
  @IsNotEmpty()
  details: string;

  userId?: number;
}
