import { expect, Locator, Page } from '@playwright/test';
import { removeHyphensInString } from '../../helpers/helpers';


export class CheckoutComplete {
  readonly page: Page;
  readonly url: string;
  readonly thankyouText: Locator;
  readonly subText: Locator;
  readonly ponyImage: Locator;
  readonly backHomeButton: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = `${process.env.BASE_URL}/checkout-complete.html`;
    this.thankyouText = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.subText= page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get')
    this.ponyImage= page.getByRole('img', { name: 'Pony Express' });
    this.backHomeButton = page.locator('[data-test="back-to-products"]')
    this.footer = page.getByText('TwitterFacebookLinkedIn© 2023 Sauce Labs. All Rights Reserved. Terms of Service ');
    
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async verifyPageLoaded(){
    await expect(this.page).toHaveURL(this.url);
    await expect(this.thankyouText).toBeVisible();
    await expect(this.subText).toBeVisible();
    await expect(this.ponyImage).toBeVisible();
  }

  async returnBackHome(){
    await this.backHomeButton.click();
  }
  
 





 
}