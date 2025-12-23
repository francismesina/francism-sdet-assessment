import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;
  private readonly welcomeMessage: Locator;
  private readonly logoutButton: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error, .alert-danger, [data-testid="error"]');
    this.welcomeMessage = page.locator('.success, .welcome, [data-testid="welcome"]');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.pageTitle = page.locator('h1, h2').first();
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.textContent() || '';
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async getWelcomeMessage(): Promise<string> {
    await this.welcomeMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.welcomeMessage.textContent() || '';
  }

  async isLoggedIn(): Promise<boolean> {
    // Check if logout button is visible, indicating user is logged in
    return await this.logoutButton.isVisible();
  }

  async logout() {
    if (await this.isLoggedIn()) {
      await this.logoutButton.click();
    }
  }

  async saveAuthState(storageStatePath: string = './auth-state.json') {
    // Save authentication state after successful login
    await this.page.context().storageState({ path: storageStatePath });
  }

  // Method to login with environment credentials
  async loginWithEnvCredentials() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpass';
    await this.login(username, password);
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  // Method to validate successful login state
  async validateSuccessfulLogin() {
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  // Method to validate failed login
  async validateFailedLogin(expectedErrorText?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedErrorText) {
      await expect(this.errorMessage).toContainText(expectedErrorText);
    }
  }
}