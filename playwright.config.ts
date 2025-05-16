import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'always' }]],
  
  use: {
    viewport: null,                 
    launchOptions: {
      args: ['--start-maximized'], 
    },
    headless: false,                
    trace: 'on-first-retry',
    baseURL: 'https://demoqa.com/',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,             
        launchOptions: {
          args: ['--start-maximized'],
        },
        headless: false,
      },
    },
  ],
});
