// This file sets all pre-ren methods

import { APIRequestContext, request } from '@playwright/test';


export const generateToken = async () => {
  let token = "";
  const apiRequestContext: APIRequestContext = await request.newContext(); // will be used while generating Token via API request
  // Getting token
  return token;
};


