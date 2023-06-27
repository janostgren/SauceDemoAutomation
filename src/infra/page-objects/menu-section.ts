import { expect, Locator, Page } from '@playwright/test';
import { GLOBAL_PARAMS } from '../configs/global-params';


export class MenuSection {
  readonly page: Page;
  readonly baseURL: string
  readonly menuElement: Locator;
  readonly allItems: Locator;
  readonly about: Locator;
  readonly logout: Locator;
  readonly resetAppState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = GLOBAL_PARAMS.HOME;
    this.menuElement = page.getByText('All ItemsAboutLogoutReset App State');
    this.allItems = page.getByRole('link', { name: 'All Items' });
    this.about = page.getByRole('link', { name: 'About' });
    this.logout = page.getByRole('link', { name: 'Logout' });
    this.resetAppState = page.getByRole('link', { name: 'Reset App State' });
  }

  
  async verifyMenuOpened(){
    await expect(this.menuElement).toBeVisible();
  }

  async openAllItems(){
    await this.allItems.click();
  }

  async openAbout(){
    await this.about.click();
    await expect(this.page).toHaveURL(`${this.baseURL}/about`);
  }


  async performLogout(){
    await this.logout.click();
    await expect(this.page).toHaveURL(this.baseURL);
  }

  async performResetAppState(){
    await this.resetAppState.click();
  }
 
}