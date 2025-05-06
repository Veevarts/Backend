import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { FeatureFlagModule } from '@backend/feature-flags';

@Module({
  imports: [FeatureFlagModule],
  controllers: [OffersController],
})
export class OffersModule {}
