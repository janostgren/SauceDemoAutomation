import { FullConfig } from '@playwright/test';

import ENV from '../envs/env';

import { generateToken } from './preRun';

async function globalSetup(config: FullConfig) {
  if (process.env.ENV === 'adhoc' && process.env.NAME) {
    // If its adhoc ci, use the internal kubernetes address
    if (process.env.CI === 'true') {
      console.log('Connected to Adhoc with CI variables');
      require('dotenv').config({
        path: `./envs/.env.adhoc-ci`
      });
      process.env.CLIENT_LINK = `http://client`;
      process.env.GATEWAY_PATH = `http://gateway`;
      process.env.INTERNAL_API_PATH = `http://api`;
    } else {
      require('dotenv').config({
        path: `./envs/.env.adhoc`
      });
      process.env.CLIENT_LINK = `https://${process.env.NAME}-client.saucedemo.com`;
      process.env.GATEWAY_PATH = `https://${process.env.NAME}-gateway.saucedemo.com`;
      process.env.INTERNAL_API_PATH = `https://${process.env.NAME}-api.saucedemo.com`;
    }

    // In order to keep the ENV values also out of the condition scope
    ENV.CLIENT_LINK = process.env.CLIENT_LINK;
    ENV.GATEWAY_PATH = process.env.GATEWAY_PATH;
    ENV.INT_API_PATH = process.env.INTERNAL_API_PATH;
  }

  process.env.TOKEN = await generateToken();
}

export default globalSetup;
export const apiTimeout = 120 * 1000;
