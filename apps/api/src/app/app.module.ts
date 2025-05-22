import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TicketingApiModule } from '@cinema/ticketing-api';
import { AppService } from './app.service';

import { ClientIdMiddleware } from '@backend/middleware';

@Module({
  imports: [TicketingApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIdMiddleware).forRoutes('*');
  }
}
