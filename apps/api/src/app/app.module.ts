import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from '@backend/contacts';
import { OffersModule } from '@backend/offers';
import { FeatureFlagModule } from '@backend/feature-flags';
import { ClientIdMiddleware } from '@backend/middleware';

@Module({
  imports: [FeatureFlagModule, ContactsModule, OffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIdMiddleware).forRoutes('*');
  }
}
