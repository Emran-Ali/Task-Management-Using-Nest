import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AssignTaskService } from './assign-task.service';
import { PermissionGuard } from '../guards/permission.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('assign-task')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AssignTaskController {
  constructor(private readonly assignTaskService: AssignTaskService) {}

  @Get()
  getTasks(@Req() req) {
    return this.assignTaskService.getAssignTask(req.user);
  }
}
