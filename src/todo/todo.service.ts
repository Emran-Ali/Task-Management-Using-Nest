import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../interface/user.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async onModuleInit() {
    console.log('Cache Manager Type:', {
      store: this.cacheManager['store'],
      stores: this.cacheManager['stores'],
      isRedis: !!(this.cacheManager['store']?.name === 'redis'),
    });

    try {
      await this.cacheManager.set('test-key', 'test-value');
      const testValue = await this.cacheManager.get('test-key');
      console.log('Cache Test Result:', {
        setValue: 'test-value',
        getValue: testValue,
        success: testValue === 'test-value',
      });

      // If using Redis, this will show in redis-cli
      console.log('Check redis-cli for key: "test-key"');
    } catch (error) {
      console.error('Cache Test Error:', error);
    }
  }

  async findOne(id: number) {
    const cacheKey = `todo:${id}`;

    try {
      // Try to get from cache
      const cachedTodo = await this.cacheManager.get(cacheKey);
      if (cachedTodo) {
        console.log('Cache hit for:', cacheKey);
        return cachedTodo;
      }

      console.log('Cache miss for:', cacheKey);

      // Get from database
      const todo = await this.prisma.todo.findFirstOrThrow({
        where: { id },
      });

      // Store in cache
      await this.cacheManager.set(cacheKey, todo);
      console.log('Stored in cache:', cacheKey);

      return todo;
    } catch (error) {
      console.error('Error in findOne:', error);
      throw new HttpException(
        'Cannot find Todo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createTodoDto: CreateTodoDto, user: User) {
    try {
      createTodoDto.userId = user.id;
      return this.prisma.todo.create({ data: createTodoDto });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Can not create Task, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll(user: User) {
    try {
      return this.prisma.todo.findMany({ where: { userId: user.id } });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong, could not find Task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateTodoDto: UpdateTodoDto, user: User) {
    try {
      return this.prisma.todo.update({
        data: updateTodoDto,
        where: { id: id, userId: user.id },
      });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Can not update Task, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number, user: User) {
    try {
      return this.prisma.todo.delete({ where: { id: id, userId: user.id } });
    } catch (error) {
      console.log(error?.message);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Can not delete Task, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
