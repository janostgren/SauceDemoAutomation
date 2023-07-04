import { defineConfig, devices } from '@playwright/test';
import { config as loadEnvConfig } from 'dotenv';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
//Choose environment based on a command-line argument or default to 'production'

let clientLink;

if (process.env.ENV === 'local') {
  require('dotenv').config({
    path: `./src/infra/envs/.env.local`
  });
  clientLink = process.env.CLIENT_LINK;
} else if (process.env.ENV === 'adhoc' && process.env.NAME) {
  require('dotenv').config({
    path: `./src/infra/envs/.env.adhoc`
  });
  clientLink = `https://${process.env.BRANCH_NAME}-client.saucedemo.com`;
  console.log('Running tests on adhoc: ', process.env.NAME);
} else {
  require('dotenv').config({
    path: `./src/infra/envs/.env.staging`
  });
  clientLink = process.env.CLIENT_LINK;
  console.log('Running tests on staging env: ', clientLink);
}






export default defineConfig({
  globalSetup: './src/infra/configs/global-setup.ts',
  testDir: './src/tests/',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
 // workers: process.env.CI ? 1 : undefined,
 workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: process.env.BASE_URL,
    baseURL: clientLink,
    headless: true,
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
