import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../interface/user.interface';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto, user: User) {
    try {
      createTodoDto.userId = user.id;
      return this.prisma.todo.create({ data: createTodoDto });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Can not create Task, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(user: User) {
    try {
      return this.prisma.todo.findMany({ where: { userId: user.id } });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong, could not find Task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number, user: User) {
    try {
      return this.prisma.todo.findFirstOrThrow({
        where: { id: id },
      });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Can not find Task, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateTodoDto: UpdateTodoDto, user: User) {
    try {
      return this.prisma.todo.update({
        data: updateTodoDto,
        where: { id: id, userId: user.id },
      });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Can not update Task, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number, user: User) {
    try {
      return this.prisma.todo.delete({ where: { id: id, userId: user.id } });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Can not delete Task, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
