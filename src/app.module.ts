import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AssignTaskModule } from './assign-task/assign-task.module';
import { CacheModule } from '@nestjs/cache-manager';
import { StreamModule } from './stream/stream.module';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AssignTaskModule,
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = redisStore;
        console.log('Connecting to Redis at:', '127.0.0.1:6379');

        return {
          store,
          host: '127.0.0.1', // Use explicit IP
          port: 6379,
          ttl: configService.get<number>('CACHE_TTL') ?? 60,
        };
      },
    }),
    StreamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
