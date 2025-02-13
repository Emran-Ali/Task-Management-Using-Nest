import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AssignTaskModule } from './assign-task/assign-task.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    TodoModule,
    ConfigModule.forRoot(),
    AssignTaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
