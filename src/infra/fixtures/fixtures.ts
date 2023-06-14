import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { InventoryPage } from '../page-objects/inventory-page';
import { MenuSection } from '../page-objects/menu-section';
import { LockedOutUser, ProblemUser, StandardUser } from '../../tests/test-data/user-data';
import { Header } from '../page-objects/header';
import { CartPage } from '../page-objects/cart-page';
import { CheckoutStepOne } from '../page-objects/checkout-step-one-page';
import { CheckoutStepTwo } from '../page-objects/checkout-step-two-page';
import { CheckoutComplete } from '../page-objects/checkout-complete-page';



// Declare the types of your fixtures.
type MyFixtures = {

  //Pages fixtures  
  header: Header;
  menuSection: MenuSection;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOne: CheckoutStepOne;
  checkoutStepTwo: CheckoutStepTwo;
  checkoutComplete: CheckoutComplete;

  //Users fixtures
  standardUser: StandardUser;
  lockedOutUser: LockedOutUser;
  problemUser: ProblemUser;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({

    // Pages fixtures

    header: async ({ page }, use) => {
        // Set up the fixture.
        const header = new Header(page);
        
    
        // Use the fixture value in the test.
        await use(header);
    
        // Clean up the fixture.
        //await todoPage.removeAll();
      },  
      menuSection: async ({ page }, use) => {
    
        const menuSection = new MenuSection(page);
        await use(menuSection);
      },
  loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutStepOne: async ({ page }, use) => {
    
    const checkoutStepOne = new CheckoutStepOne(page);
    await use(checkoutStepOne);
  },

  checkoutStepTwo: async ({ page }, use) => {
    
    const checkoutStepTwo = new CheckoutStepTwo(page);
    await use(checkoutStepTwo);
  },

  checkoutComplete: async ({ page }, use) => {
    
    const checkoutComplete = new CheckoutComplete(page);
    await use(checkoutComplete);
  },

 

    //Users fixtures

    standardUser: async ({ page }, use) => {
    
        const standardUser = new StandardUser();
        await use(standardUser);
      },

      lockedOutUser: async ({ page }, use) => {
    
        const lockedOutUser = new LockedOutUser();
        await use(lockedOutUser);
      },

      problemUser: async ({ page }, use) => {
    
        const problemUser = new ProblemUser();
        await use(problemUser);
      },
 
});
export { expect } from '@playwright/test';