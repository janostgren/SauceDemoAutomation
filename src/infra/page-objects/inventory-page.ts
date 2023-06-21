import { expect, Locator, Page } from '@playwright/test';
const { LINKS } = require(`../configs/constants`);


export class InventoryPage {
  readonly page: Page;
  readonly url: string;
  readonly productsTitle: Locator;
  readonly sortingDropDownList: Locator;
  readonly shoppingCartIcon: Locator;
  readonly menuButton: Locator;
  readonly footer: Locator;

  constructor(page: Page, baseURL: any) {
    this.page = page;
    this.url = `${baseURL}/inventory.html`;
    this.productsTitle = page.getByText('Products');
    this.sortingDropDownList = page.locator('[data-test="product_sort_container"]');
    this.shoppingCartIcon = page.locator('#shopping_cart_container a');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.footer = page.getByText('TwitterFacebookLinkedIn© 2023 Sauce Labs. All Rights Reserved. Terms of Service ');
    
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async verifyPageLoaded(){
    await expect(this.page).toHaveURL(this.url);
    await expect(this.productsTitle).toBeVisible();
  }


 async sortProducts(filter: 'az'| 'za' |'lohi' |'hilo') {
  await this.page.locator('[data-test="product_sort_container"]').selectOption(filter);
 }


 async addItemToCart(item:'sauce-labs-bike-light' | 'sauce-labs-backpack' | 'sauce-labs-bolt-t-shirt' | 'sauce-labs-fleece-jacket'){
  await this.page.locator(`[data-test="add-to-cart-${item}"]`).click();
 }

 async removeItemFromCart(item:'sauce-labs-bike-light' | 'sauce-labs-backpack' | 'sauce-labs-bolt-t-shirt' | 'sauce-labs-fleece-jacket'){
  await this.page.locator(`[data-test="remove-${item}"]`).click();
 }

 



 
}