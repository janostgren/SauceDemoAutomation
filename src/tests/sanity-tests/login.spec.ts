import { test, expect } from '../../infra/fixtures/fixtures';
const { USER_CREDENTIALS } = require(`../../infra/configs/constants`);

// test.beforeEach(async ({ loginPage }) => {
//   // Go to the starting url before each test.
//   await loginPage.goto();
//   await loginPage.verifyPageLoaded();
// });




test('Login with valid account credentials', async ({ loginPage, inventoryPage, standardUser }) => {
  await test.step('Go to Login Page', async () => {
    await loginPage.goto();
    await loginPage.verifyPageLoaded();   });

  await test.step('Fill in user name', async () => {
    await loginPage.fillUsername(standardUser.username!);

  });

  await test.step('Fill in user password', async () => {
    await loginPage.fillPassword(standardUser.password!);
  });

  await test.step('Perform login', async () => {
    await loginPage.loginButton.click();
  });

  await test.step('Verify user is logged in', async () => {
    await inventoryPage.verifyPageLoaded();
  });
});








// test.describe("Login with valid account credentials", () => {
  

//   test("Go to Login Page", async ({ loginPage }) => {
//     await loginPage.goto();
//     await loginPage.verifyPageLoaded();  });
  
//   test("Fill in user name", async ({ loginPage, standardUser }) => {
//     await loginPage.fillUsername(standardUser.username!);
//   });


//   test("Fill in user password", async ({ loginPage, standardUser }) => {
//     await loginPage.fillPassword(standardUser.password!);
//   });

//   test("Perform login", async ({ loginPage }) => {
//     await loginPage.loginButton.click();
//   });

//   test("Verify user is logged in", async ({ inventoryPage }) => {
//     await inventoryPage.verifyPageLoaded();
//   });
  
// });

// // test.describe("Logout", () => {
  

// //   test("Verify Inventory Page loaded", async ({ inventoryPage }) => {
// //     await inventoryPage.verifyPageLoaded();
// //   });
  
// //   test("Open menu", async ({ header }) => {
// //     await header.openMenu();
// //   });

// //   test("Perform Logout via Menu", async ({ menuSection }) => {
// //     await menuSection.performLogout();
// //   });

// //   test("Verify Login Page loaded", async ({ loginPage }) => {
// //     await loginPage.verifyPageLoaded();
// //   });


  
// // });

// // test.describe("Login with invalid account credentials", () => {
  
// //   test("Fill in invalid user name", async ({ loginPage }) => {
// //     await loginPage.fillUsername(`${USER_CREDENTIALS.user1.username}+ 11`);
// //   });

// //   test("Fill in user invalid password", async ({ loginPage }) => {
// //     await loginPage.fillPassword(`${USER_CREDENTIALS.user1.password} +11`);
// //   });

// //   test("Attempt logging in", async ({ loginPage }) => {
// //     await loginPage.loginButton.click();
// //   });

// //   test("Verify login error message appears", async ({ page }) => {
// //     await expect(page.locator('[data-test="error"]')).toBeVisible();
// //     await expect(page.getByText('Username and password do not match')).toBeVisible();
// //   });
  
// // });