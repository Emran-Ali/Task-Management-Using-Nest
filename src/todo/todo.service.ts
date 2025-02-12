import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      throw new InternalServerErrorException(error);
    }
  }

  findAll(user: User) {
    return this.prisma.todo.findMany({ where: { userId: user.id } });
  }

  findOne(id: number, user: User) {
    try {
      return this.prisma.todo.findFirstOrThrow({
        where: { id: id, userId: user.id },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  update(id: number, updateTodoDto: UpdateTodoDto, user: User) {
    try {
      return this.prisma.todo.update({
        data: updateTodoDto,
        where: { id: id, userId: user.id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: number, user: User) {
    return this.prisma.todo.delete({ where: { id: id, userId: user.id } });
  }
}
