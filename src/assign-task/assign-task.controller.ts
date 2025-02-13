import { Controller } from '@nestjs/common';
import { AssignTaskService } from './assign-task.service';

@Controller('assign-task')
export class AssignTaskController {
  constructor(private readonly assignTaskService: AssignTaskService) {}
}
