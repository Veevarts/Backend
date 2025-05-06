// libs/fundraising/contacts/src/lib/contacts.module.ts
import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { FeatureFlagModule } from '@backend/feature-flags';

@Module({
  imports: [FeatureFlagModule],
  controllers: [ContactsController],
})
export class ContactsModule {}
