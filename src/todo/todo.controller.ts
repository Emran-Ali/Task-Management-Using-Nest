import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permission } from '../decorators/permission.decorator';
import { PermissionGuard } from '../guards/permission.guard';

@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('tasks')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @Permission('create-task')
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req.user);
  }

  @Get()
  @Permission('read-tasks')
  findAll(@Request() req) {
    return this.todoService.findAll(req.user);
  }

  @Get(':id')
  @Permission('read-tasks')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @Permission('update-task')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todoService.update(id, updateTodoDto, req.user);
  }

  @Delete(':id')
  @Permission('delete-task')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.todoService.remove(id, req.user);
  }
}
