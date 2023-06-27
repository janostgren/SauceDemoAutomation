import { expect, Locator, Page } from '@playwright/test';
import { removeHyphensInString } from '../../helpers/helpers';


export class CheckoutStepOne {
  readonly page: Page;
  readonly url: string;
  readonly yourInformationTitle: Locator;
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly zipInputField: Locator;
  readonly cancelButton: Locator;
  readonly continueButton : Locator;
  readonly footer: Locator;

  constructor(page: Page, baseURL : any) {
    this.page = page;
    this.url = `${baseURL}/checkout-step-one.html`;
    this.yourInformationTitle = page.getByText('Checkout: Your Information');
    this.firstNameInputField = page.locator('[data-test="firstName"]');
    this.lastNameInputField = page.locator('[data-test="lastName"]');
    this.zipInputField = page.locator('[data-test="postalCode"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.footer = page.getByText('TwitterFacebookLinkedIn© 2023 Sauce Labs. All Rights Reserved. Terms of Service ');
    
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async verifyPageLoaded(){
    await expect(this.page).toHaveURL(this.url);
    await expect(this.yourInformationTitle).toBeVisible();
  }
  
  async fillFirstName(firstName: string){
    await this.firstNameInputField.fill(firstName);
  }

  async fillLastName(lastName: string){
    await this.lastNameInputField.fill(lastName);
  }

  async fillInZipCode(zipCode: string){
    await this.zipInputField.fill(zipCode);
  }

  async verifyErrorMessageDisplayed(error:'First Name' | 'Last Name' |'Postal Code' ){
    await expect(this.page.locator('div').filter({ hasText: `Error: ${error} is required`}).nth(1)).toBeVisible();
  }



async continue(){
  await this.continueButton.click();
}

async cancel(){
  await this.cancelButton.click();
}





 
}