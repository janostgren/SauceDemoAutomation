import { expect, Locator, Page } from '@playwright/test';


export class Header {
  readonly page: Page;
  readonly header: Locator;
  readonly shoppingCartIcon: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByText('Swag Labs');
    this.shoppingCartIcon = page.locator('#shopping_cart_container a');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    
  }

 async openMenu(){
  await this.menuButton.click();
  await expect(this.page.getByText('All ItemsAboutLogoutReset App State')).toBeVisible();
 }

 async openCart(){
  await this.shoppingCartIcon.click();
 }

 async verifyCartBadgeUpdated(counter: number){
    await expect(this.shoppingCartIcon.filter({hasText: `${counter}`})).toBeVisible();
 }



 
}