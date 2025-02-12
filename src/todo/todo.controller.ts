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
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req.user);
  }

  @Get()
  findAll(@Request() req) {
    return this.todoService.findAll(req.user);
  }

  @Get(':id')
  @Permission('read-todos')
  findOne(@Param('id') id: number, @Request() req) {
    return this.todoService.findOne(id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todoService.update(+id, updateTodoDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Request() req) {
    return this.todoService.remove(id, req.user);
  }
}
