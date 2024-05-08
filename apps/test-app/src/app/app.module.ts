import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '../mikro-orm.config';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
