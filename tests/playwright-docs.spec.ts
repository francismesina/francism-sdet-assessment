import { test, expect } from '@playwright/test';
import { HomePage } from '@POM/HomePage';
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
  
});