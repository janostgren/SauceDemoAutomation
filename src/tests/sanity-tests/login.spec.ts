import { test, expect } from '../../infra/fixtures/fixtures';



test.describe.parallel('login tests', () => {


  test.beforeEach(async ({ loginPage }) => {
    // Go to the starting url before each test.
    await loginPage.goto();
    await loginPage.verifyPageLoaded();
  });
  
  test('Login with valid account credentials', async ({ loginPage, inventoryPage, testData }) => {
    
    
    await test.step('Fill in user name', async () => {
      await loginPage.fillUsername(testData.username!);
  
    });
  
    await test.step('Fill in user password', async () => {
      await loginPage.fillPassword(testData.password!);
    });
  
    await test.step('Perform login', async () => {
      await loginPage.loginButton.click();
    });
  
    await test.step('Verify user is logged in', async () => {
      await inventoryPage.verifyPageLoaded();
    });
  });
  
  
  
  test('Login with invalid account credentials', async ({ page, loginPage, testData }) => {
    await test.step('Fill in invalid user name', async () => {
      await loginPage.fillUsername(`${testData.username}+ 11`);   
    });

    await test.step('Fill in invalid user password', async() => {
      await loginPage.fillPassword(`${testData.password} + 11`)
    });

    await test.step('Attempt login', async() => {
      await loginPage.loginButton.click();
    });

    await test.step('Verify error message appears', async() => {
      await expect(page.locator('[data-test="error"]')).toBeVisible();
      await expect(page.getByText('Username and password do not match')).toBeVisible();
    });
    

  });


  test('Logout from an account', async ({ loginPage, inventoryPage,menuSection, header, testData }) => {
    await test.step('Perform Login with to a valid account', async()=> {
      await loginPage.login(testData.username!, testData.password!);
    });
  
    await test.step('Verify user is logged in', async () => {
      await inventoryPage.verifyPageLoaded();
    });
  
    await test.step('Open Menu', async() => {
      await header.openMenu();
    });
  
    await test.step('Perform Logout via Menu', async() => {
      await menuSection.performLogout();
    });
  
    await test.step('Verify Login Page loaded', async() => {
      await loginPage.verifyPageLoaded();
    });
  });
  
});
