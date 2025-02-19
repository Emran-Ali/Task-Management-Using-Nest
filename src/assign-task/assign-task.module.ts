import { Module } from '@nestjs/common';
import { AssignTaskService } from './assign-task.service';
import { AssignTaskController } from './assign-task.controller';

@Module({
  controllers: [AssignTaskController],
  providers: [AssignTaskService],
})
export class AssignTaskModule {}
