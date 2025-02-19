import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AssignTaskService } from './assign-task.service';
import { PermissionGuard } from '../guards/permission.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssignTaskDto } from './dto/assignTask.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('assign-task')
@Controller('assign-task')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AssignTaskController {
  constructor(private readonly assignTaskService: AssignTaskService) {}

  @Get()
  getTasks(@Req() req) {
    return this.assignTaskService.getAssignTask(req.user);
  }
  @Post(':id')
  assignTask(
    @Body(ValidationPipe) assignTaskDto: AssignTaskDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.assignTaskService.assignUserTask(id, assignTaskDto);
  }
}
