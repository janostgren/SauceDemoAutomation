import { expect, Locator, Page } from '@playwright/test';

export const goBackToPreviousPage = async (page: Page) => {
    await page.goBack();
  };

export const uploadFile = async (locator: Locator, page: Page) => {
  const [fileChooser] = await Promise.all([
    // It is important to call waitForEvent before click to set up waiting.

    page.waitForEvent('filechooser'),

    // Opens the file chooser.
    await locator.click()
  ]);
  await fileChooser.setFiles('src/test-data/testFile.jpg');
};

// Get page after a specific action (e.g. clicking a link)
export const getNewPage = async (locator: Locator, page: Page) => {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    await locator.click() // Opens a new tab
  ]);
  return newPage;
};

export const verifyPageLoaded = async (page: Page, header: Locator, url: string) => {
  await expect(page).toHaveURL(url);
  await expect(header).toBeVisible();
};

export const dragToValue = async (slider: Locator, targetTextLocator: Locator, targetValue: number) => {
  if (parseInt((await targetTextLocator.innerText()).replace('%', '')) < targetValue) {
    try {
      await slider.click();
      await slider.press('ArrowRight');
    } catch (error) {
      throw new Error('Couldnt drag slider to the right');
    }
  }
  if (parseInt((await targetTextLocator.innerText()).replace('%', '')) > targetValue) {
    try {
      await slider.click();
      await slider.press('ArrowLeft');
    } catch (error) {
      throw new Error('couldnt drag slider to the left');
    }
  }
};

export const dragSliderToTargetValue = async (slider: Locator, actualTextLocator: Locator, targetValue: number) => {
  let targetReached: boolean = false;
  if (parseInt((await actualTextLocator.innerText()).replace('%', '')) === targetValue) {
    targetReached = true;
  }
  while (!targetReached) {
    await dragToValue(slider, actualTextLocator, targetValue);
    if (parseInt((await actualTextLocator.innerText()).replace('%', '')) === targetValue) {
      targetReached = true;
    }
  }
};


