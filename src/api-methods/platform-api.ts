

import { apiTimeout } from '../infra/configs/global-setup';
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import ENV from '../infra/envs/env';
import EntityExample from '../shared-models/entity-example';
import {findAndUpdateObjectInArray} from '../helpers/helpers';


export default class PlatformAPI {
  apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async authMethod(securityToken: string) {
    let response = await this.apiContext.post(`${ENV.INT_API_PATH}/admin/login`, {
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': `${securityToken}`
      },
      timeout: apiTimeout
    });

    expect(response.status()).toBe(200);
    response = await response.json();
  }


  async createEntity(data: any, entities: EntityExample[], entityType: 'example', authToken: string) {
    let response = await this.apiContext.post(`${ENV.INT_API_PATH}/${entityType}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': authToken!
      },
      timeout: apiTimeout
    });

    expect(response.status()).toBe(200);
    response = await response.json();

    findAndUpdateObjectInArray(entities, response.data.entityData, response.data.entityId);
  }
}

