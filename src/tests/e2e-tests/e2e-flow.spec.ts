import { test } from '../../infra/fixtures/fixtures';



test.describe.parallel('login tests', () => {

  test.beforeEach(async ({ loginPage, inventoryPage, testData }) => {
    // Login to standard user before each test.
    await loginPage.goto();
    await loginPage.verifyPageLoaded();
    await loginPage.login(testData.username!, testData.password!);
    await inventoryPage.verifyPageLoaded();
  });

  test('Complete purchasing the first item with a Standard User', async ({ inventoryPage, cartPage,checkoutStepOne, checkoutStepTwo,checkoutComplete, header, testData }) => {
    let counter=0;
    let items: string[] = [];

    await test.step('Add first item to cart', async () => {
      await inventoryPage.addItemToCart(testData.desiredItemName!);
      counter++;
      items.push(testData.desiredItemName!);
    });

    await test.step('Verify items amount updated in the cart badge', async() => {
      await header.verifyCartBadgeUpdated(counter);
    });

    await test.step('Open Cart', async() =>{
      await header.openCart();
    });

    await test.step('Verify Cart Page loaded', async() => {
      await cartPage.verifyPageLoaded();
    });

    await test.step('Verify added items displayed in the cart', async() => {
      await cartPage.verifyAddedItemsDisplayed(items);
    });

    await test.step('Proceed to checkout', async() =>{
      await cartPage.proceedToCheckout();
    });

    await test.step('Verify CheckOut: Your Information Page loaded', async() => {
      await checkoutStepOne.verifyPageLoaded();
    });

    await test.step('Attempt checking out without filling details', async() => {
      await checkoutStepOne.continue();
    });

    await test.step('Verify First Name error message is displayed', async() => {
      await checkoutStepOne.verifyErrorMessageDisplayed('First Name');
    });

    await test.step('Fill in first name', async() => {
      await checkoutStepOne.fillFirstName(testData.username!);
    });

    await test.step('Attempt checking out without filling last name', async() => {
      await checkoutStepOne.continue();
    });

    await test.step('Verify Last Name error message is displayed', async() => {
      await checkoutStepOne.verifyErrorMessageDisplayed('Last Name');
    });

    await test.step('Fill in last name', async() => {
      await checkoutStepOne.fillLastName(testData.lastName!);
    });

    await test.step('Attempt checking out without filling postal code', async() => {
      await checkoutStepOne.continue();
    });

    await test.step('Verify Postal Code error message is displayed', async() => {
      await checkoutStepOne.verifyErrorMessageDisplayed('Postal Code');
    });

    await test.step('Fill in postal code', async() => {
      await checkoutStepOne.fillInZipCode(testData.zipCode!);
    });

    await test.step('Continue with Checkout', async() => {
      await checkoutStepOne.continue();
    });
    
    await test.step('Verify Checkout: Overview Page loaded', async() => {
      await checkoutStepTwo.verifyPageLoaded();
    });

    await test.step('Verify added items are displayed in the order overview', async() => {
      await checkoutStepTwo.verifyAddedItemsDisplayed(items);
    });

    await test.step('Finish Checkout', async() => {
      await checkoutStepTwo.finish();
    });

    await test.step('Verify Checkout Complete Page loaded', async() => {
      await checkoutComplete.verifyPageLoaded();
    });

    await test.step('Return back home to Inventory Page', async() => {
      await checkoutComplete.returnBackHome();
    });

    await test.step('Verify Inventory Page loaded', async() => {
      await inventoryPage.verifyPageLoaded();
    });



  });

  test('Cancel purchasing the first item after adding it to the cart with a Standard User', async ({ inventoryPage, cartPage,checkoutStepOne, checkoutStepTwo,checkoutComplete, header, testData }) => {
    let counter=0;
    let items: string[] = [];

    await test.step('Add first item to cart', async () => {
      await inventoryPage.addItemToCart(testData.desiredItemName!);
      counter++;
      items.push(testData.desiredItemName!);
    });

    await test.step('Verify items amount updated in the cart badge', async() => {
      await header.verifyCartBadgeUpdated(counter);
    });

    await test.step('Open Cart', async() =>{
      await header.openCart();
    });

    await test.step('Verify Cart Page loaded', async() => {
      await cartPage.verifyPageLoaded();
    });

    await test.step('Verify added items displayed in the cart', async() => {
      await cartPage.verifyAddedItemsDisplayed(items);
    });

    await test.step('Remove item from cart', async() => {
      await cartPage.removeItemFromCart(testData.desiredItemName!);
    });

    await test.step('Verify removed item is not displayed in the cart anymore', async() => {
      await cartPage.verifyItemNotDisplayed(testData.desiredItemName!);
    });


  });


});









