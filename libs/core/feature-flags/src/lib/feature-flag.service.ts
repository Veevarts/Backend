// libs/core/feature-flags/src/lib/feature-flag.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { initialize, Unleash } from 'unleash-client';

@Injectable()
export class FeatureFlagService implements OnModuleInit {
  private unleash: Unleash | undefined;

  async onModuleInit() {
    this.unleash = initialize({
        url: 'http://localhost:4242/api/',
        appName: 'unleash-onboarding-node',
        customHeaders: {
            Authorization: 'default:development.unleash-insecure-api-token' // in production use environment variable
        }
    });

    this.unleash.on('ready', () => console.log('Unleash client ready', process.env['UNLEASH_URL'], process.env['UNLEASH_INSTANCE_ID']));
    this.unleash.on('error', (err) => console.error('Unleash error', err));
  }

  isEnabled(flagName: string, clientId: string): boolean {
    const env = process.env['ENVIRONMENT'] || 'production';
    return this.unleash?.isEnabled(flagName,{userId: clientId}) ?? false;
  }
}