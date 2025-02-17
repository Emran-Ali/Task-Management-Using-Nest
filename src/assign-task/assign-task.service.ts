import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../interface/user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { AssignTaskDto } from './dto/assignTask.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignTaskService {
  constructor(private prisma: PrismaService) {}

  async assignUserTask(taskId: number, assignTaskDto: AssignTaskDto) {
    try {
      return await this.prisma.assignTask.create({
        data: {
          todoId: taskId,
          userId: assignTaskDto.userId,
          ...(assignTaskDto.time && { time: assignTaskDto.time }),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta && error.meta.target) {
          const target = error.meta?.target;
          const fields = Array.isArray(target) ? target.join(', ') : 'field(s)';
          throw new HttpException(
            `Task with same ${fields} already assigned.`,
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  getAssignTask(user: User) {
    try {
      return this.prisma.assignTask.findMany({
        where: { userId: user.id },
        include: {
          todo: true,
        },
      });
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to get assigned task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
