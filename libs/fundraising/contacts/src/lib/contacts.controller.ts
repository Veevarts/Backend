// libs/fundraising/contacts/src/lib/contacts.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import { FeatureFlagService } from '@backend/feature-flags';

@Controller(':clientId/contacts')
export class ContactsController {
  constructor(private readonly featureFlags: FeatureFlagService) {}

  @Get()
  getContacts(@Req() req: any) {
    const clientId = req.params['clientId'];

    const useNewFlow = this.featureFlags.isEnabled('fundraising-new-contacts', clientId);

    if (useNewFlow) {
      return { message: '🚀 New fundraising contacts flow enabled' };
    }

    return { message: '📦 Standard contacts flow' };
  }
}