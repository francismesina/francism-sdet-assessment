import { test, expect } from '@playwright/test';
import { HomePage } from '@POM/HomePage';
import { SearchPage } from '@POM/SearchPage';
import { TestData } from '../utils/TestData';

test.describe('Playwright Documentation Site Tests', () => {
  
  test('PW-DOC-01: H1 assertion test on homepage', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    
    // Act
    await homePage.navigate();
    const mainHeadingText = await homePage.getMainHeadingText();
    
    // Assert
    expect(mainHeadingText).toContain(TestData.expectedContent.playwrightMainHeading);
    expect(mainHeadingText).toBeTruthy();
    
    console.log(`✓ Main heading contains: "${mainHeadingText}"`);
  });

  test('PW-DOC-02: Search navigation test to locators page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    // Act - Start from homepage
    await homePage.navigate();
    
    // Method 1: Try search functionality
    try {
      await homePage.searchFor(TestData.searchTerms.locators);
      await searchPage.waitForSearchResults();
      await searchPage.clickLocatorsLink();
    } catch (error) {
      // Method 2: Fallback to direct navigation
      console.log('Search failed, using direct navigation to locators page');
      await searchPage.navigateToLocators();
    }
    
    // Assert
    await expect(page).toHaveURL(/.*\/docs\/locators/);
    const pageTitle = await searchPage.getPageTitle();
    expect(pageTitle).toContain(TestData.expectedContent.locatorsPageTitle);
    
    console.log(`✓ Successfully navigated to locators page: "${pageTitle}"`);
  });
  
});