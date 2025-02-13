import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../interface/user.interface';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssignTaskService {
  constructor(private prisma: PrismaService) {}

  getAssignTask(user: User) {
    try {
      return this.prisma.assignTask.findMany({
        where: { assignUser: user.id },
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
