import { expect, Locator, Page } from '@playwright/test';
import process from 'process';



export class LoginPage {
  readonly page: Page;
  readonly url: string;
  readonly usernameInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page, baseURL: any) {
    this.page = page;
    this.url = baseURL;
    this.usernameInputField = page.locator('[data-test="username"]');
    this.passwordInputField = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
  }

  async goto() {
    console.log(`url: ${this.url}`);
    await this.page.goto(this.url);
  }

  async verifyPageLoaded(){
    await expect(this.page).toHaveURL(this.url);
    await expect(this.usernameInputField).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);

    await this.loginButton.click();
  }

  async fillUsername(username:string){
    await this.usernameInputField.click();
    await this.usernameInputField.fill(username);
  }

  async fillPassword(password: string){
    await this.passwordInputField.click();
    await this.passwordInputField.fill(password);
  }


 
}