// libs/core/feature-flags/src/lib/feature-flag.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { initialize, Unleash } from 'unleash-client';

@Injectable()
export class FeatureFlagService implements OnModuleInit {
  private unleash: Unleash | undefined;

  async onModuleInit() {
    this.unleash = initialize({
        url: process.env['UNLEASH_API_URL'] as string,
        appName: 'unleash-onboarding-node',
        customHeaders: {
            Authorization: process.env['UNLEASH_CLIENT_TOKEN'] as string // in production use environment variable
        }
    });

    this.unleash.on('ready', () => console.log('Unleash client ready'));
    this.unleash.on('error', (err) => console.error('Unleash error', err));
  }

  isEnabled(flagName: string, clientId: string): boolean {
    const env = process.env['ENVIRONMENT'] || 'production';
    return this.unleash?.isEnabled(flagName,{userId: clientId}) ?? false;
  }
}