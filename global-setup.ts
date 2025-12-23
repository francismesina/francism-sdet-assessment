import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // This will be used later for setting up auth state
  console.log('Global setup completed');
}

export default globalSetup;