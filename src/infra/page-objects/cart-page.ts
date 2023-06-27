import { expect, Locator, Page } from '@playwright/test';
import { removeHyphensInString } from '../../helpers/helpers';
import { GLOBAL_PARAMS } from '../configs/global-params';


export class CartPage {
  readonly page: Page;
  readonly url: string;
  readonly yourCartTitle: Locator;
  readonly qtyTableColumn: Locator;
  readonly descriptionTableColumn: Locator;
  readonly continueShoppingButton : Locator;
  readonly checkoutButton: Locator;
  readonly menuButton: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = `${GLOBAL_PARAMS.HOME}cart.html`;
    this.yourCartTitle = page.getByText('Your Cart');
    this.qtyTableColumn= page.getByText('QTY');
    this.descriptionTableColumn= page.getByText('Description');
    this.continueShoppingButton= page.locator('[data-test="continue-shopping"]');
    this.checkoutButton= page.locator('[data-test="checkout"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.footer = page.getByText('TwitterFacebookLinkedIn© 2023 Sauce Labs. All Rights Reserved. Terms of Service ');
    
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async verifyPageLoaded(){
    await expect(this.page).toHaveURL(this.url);
    await expect(this.yourCartTitle).toBeVisible();
  }


 async removeItemFromCart(item:'sauce-labs-bike-light' | 'sauce-labs-backpack' | 'sauce-labs-bolt-t-shirt' | 'sauce-labs-fleece-jacket'){
  await this.page.locator(`[data-test="remove-${item}"]`).click();
 }

 async verifyAddedItemsDisplayed(items: string[]) {
  for (const item of items) {
    await expect(this.page.getByRole('link', { name: `${removeHyphensInString(item)}` })).toBeVisible();
  }
}

async verifyItemNotDisplayed(item: string){
  await expect(this.page.getByRole('link', { name: `${removeHyphensInString(item)}` })).toBeHidden();
}

async continueShopping(){
  await this.continueShoppingButton.click();
}

async proceedToCheckout(){
  await this.checkoutButton.click();
}





 
}