import { test } from '../../infra/fixtures/fixtures';

test.beforeEach(async ({ loginPage, inventoryPage, standardUser }) => {
  // Go to the starting url before each test.
  await loginPage.goto();
  await loginPage.verifyPageLoaded();
  await loginPage.login(standardUser.username!, standardUser.password!);
  await inventoryPage.verifyPageLoaded();
});


test.describe("Complete purchasing the first item with a Standard User", () => {
  let counter=0;
  let items: string[] = [];
  

  test("Add first item to cart", async ({ inventoryPage, standardUser }) => {
    await inventoryPage.addItemToCart(standardUser.desiredItemName!);
    counter++;
    items.push(standardUser.desiredItemName!);
  });


  test("Verify items amount updated in the cart badge", async ({ header }) => {
    await header.verifyCartBadgeUpdated(counter);
  });
  

  test("Open Cart", async ({ header }) => {
    await header.openCart();
  });

  test("Verify Cart Page loaded", async ({ cartPage }) => {
    await cartPage.verifyPageLoaded();
  });

  test("Verify added items are displayed in the cart", async ({ cartPage }) => {
    await cartPage.verifyAddedItemsDisplayed(items);
  });

  test("Proceed to checkout", async ({ cartPage }) => {
    await cartPage.proceedToCheckout();
  });

  test("Verify CheckOut: Your Information Page loaded", async ({ checkoutStepOne }) => {
    await checkoutStepOne.verifyPageLoaded();
  });

  test("Attempt checking out without filling details", async ({ checkoutStepOne }) => {
    await checkoutStepOne.continue();
  });

  test("Verify First Name error message is displayed", async ({ checkoutStepOne }) => {
    await checkoutStepOne.verifyErrorMessageDisplayed('First Name');
  });

  test("Fill in first name", async ({ checkoutStepOne, standardUser }) => {
    await checkoutStepOne.fillFirstName(standardUser.username!);
  });

  test("Attempt checking out without filling last name", async ({ checkoutStepOne }) => {
    await checkoutStepOne.continue();
  });

  test("Verify First Name error message is displayed", async ({ checkoutStepOne }) => {
    await checkoutStepOne.verifyErrorMessageDisplayed('Last Name');
  });

  test("Fill in last name", async ({ checkoutStepOne, standardUser }) => {
    await checkoutStepOne.fillLastName(standardUser.lastName!);
  });

  test("Attempt checking out without filling postal code", async ({ checkoutStepOne }) => {
    await checkoutStepOne.continue();
  });

  test("Verify First Name error message is displayed", async ({ checkoutStepOne }) => {
    await checkoutStepOne.verifyErrorMessageDisplayed('Postal Code');
  });

  test("Fill in zip code", async ({ checkoutStepOne, standardUser }) => {
    await checkoutStepOne.fillInZipCode(standardUser.zipCode!);
  });

  test("Continue with Checkout", async ({ checkoutStepOne }) => {
    await checkoutStepOne.continue();
  });

  test("Verify Checkout: Overview Page loaded", async ({ checkoutStepTwo }) => {
    await checkoutStepTwo.verifyPageLoaded();
  });

  test("Verify added items are displayed in the order overview", async ({ checkoutStepTwo }) => {
    await checkoutStepTwo.verifyAddedItemsDisplayed(items);
  });
  
  test("Finish checkout", async ({ checkoutStepTwo }) => {
    await checkoutStepTwo.finish();
  });

  test("Verify Checkout Complete Page loaded", async ({ checkoutComplete }) => {
    await checkoutComplete.verifyPageLoaded();
  });

  test("Return back home to Inventory Page", async ({ checkoutComplete }) => {
    await checkoutComplete.returnBackHome();
  });

  test("Verify Inventory Page loaded", async ({ inventoryPage }) => {
    await inventoryPage.verifyPageLoaded();
  });

});

test.describe("Cancel purchasing the first item after adding it to the cart with a Standard User", () => {
  let counter=0;
  let items: string[] = [];
  

  test("Add first item to cart", async ({ inventoryPage, standardUser }) => {
    await inventoryPage.addItemToCart(standardUser.desiredItemName!);
    counter++;
    items.push(standardUser.desiredItemName!);
  });


  test("Verify items amount updated in the cart badge", async ({ header }) => {
    await header.verifyCartBadgeUpdated(counter);
  });
  

  test("Open Cart", async ({ header }) => {
    await header.openCart();
  });

  test("Verify Cart Page loaded", async ({ cartPage }) => {
    await cartPage.verifyPageLoaded();
  });

  test("Verify added items are displayed in the cart", async ({ cartPage }) => {
    await cartPage.verifyAddedItemsDisplayed(items);
  });

  test("Remove item from cart", async ({ cartPage, standardUser }) => {
    await cartPage.removeItemFromCart(standardUser.desiredItemName!);
  });

  test("Verify removed item is not displayed in the cart anymore", async ({ cartPage, standardUser }) => {
    await cartPage.verifyItemNotDisplayed(standardUser.desiredItemName!);
  });
});


