import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PermissionGuard } from '../gurds/permission.guard';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PermissionGuard],
})
export class TodoModule {}
