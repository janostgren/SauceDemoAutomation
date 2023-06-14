import { expect, Locator, Page } from '@playwright/test';
import { removeHyphensInString } from '../../helpers/helpers';
const { LINKS } = require(`../configs/constants`);


export class CheckoutStepTwo {
  readonly page: Page;
  readonly url: string;
  readonly overviewTitle: Locator;
  readonly yourCartTitle: Locator;
  readonly qtyTableColumn: Locator;
  readonly descriptionTableColumn: Locator;
  readonly cancelButton: Locator;
  readonly finishButton : Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = `${process.env.BASE_URL}/checkout-step-two.html`;
    this.overviewTitle = page.getByText('Checkout: Overview')
    this.qtyTableColumn= page.getByText('QTY');
    this.descriptionTableColumn= page.getByText('Description');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.footer = page.getByText('TwitterFacebookLinkedIn© 2023 Sauce Labs. All Rights Reserved. Terms of Service ');
    
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async verifyPageLoaded(){
    await expect(this.page).toHaveURL(this.url);
    await expect(this.overviewTitle).toBeVisible();
  }
  
  async verifyAddedItemsDisplayed(items: string[]) {
    for (const item of items) {
      await expect(this.page.getByRole('link', { name: `${removeHyphensInString(item)}` })).toBeVisible();
    }
  }
  async verifyErrorMessageDisplayed(error:'First Name' | 'Last Name' |'Postal Code' ){
    await expect(this.page.locator('div').filter({ hasText: `Error: ${error} is required`}).nth(1)).toBeVisible();
  }



async finish(){
  await this.finishButton.click();
}

async cancel(){
  await this.cancelButton.click();
}





 
}