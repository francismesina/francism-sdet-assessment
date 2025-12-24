import { test, expect } from '@playwright/test';
import { LoginPage } from '@POM/LoginPage';
import { TestData } from '../utils/TestData';

test.describe('Authentication Service Tests', () => {
  test('PW-AUTH-01: Successful login through UI and validation of authenticated state', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await page.goto(TestData.authServiceUrl);

    // Act
    await loginPage.login(TestData.validCredentials.username, TestData.validCredentials.password);
    await loginPage.saveAuthState();

    // Assert
    await loginPage.validateSuccessfulLogin();
    expect(await loginPage.isLoggedIn()).toBeTruthy();
    console.log('✓ Successfully logged in and authenticated state validated');
  });

  test('PW-AUTH-02: Login attempt with invalid credentials and error validation', async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    await page.goto(TestData.authServiceUrl);

    // Act
    await loginPage.login(TestData.invalidCredentials.username, TestData.invalidCredentials.password);

    // Assert
    await loginPage.validateFailedLogin('Invalid username or password');
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    console.log('✓ Invalid login attempt shows error message');
  });
});
