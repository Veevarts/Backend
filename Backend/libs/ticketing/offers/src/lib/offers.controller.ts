import { Controller, Get, Req } from '@nestjs/common';
import { FeatureFlagService } from '@backend/feature-flags';

@Controller('offers')
export class OffersController {
  constructor(private readonly featureFlags: FeatureFlagService) {}

  @Get()
  getOffers(@Req() req: any) {
    const clientId = req['clientId'] || 'anonymous';

    const isExclusive = this.featureFlags.isEnabled('exclusive-offers', clientId);

    if (isExclusive) {
      return { message: '🎁 Exclusive offers activated!' };
    }

    return { message: '🧾 Standard offers available.' };
  }
}
