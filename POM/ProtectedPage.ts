import { Page, Locator, expect } from '@playwright/test';

export class ProtectedPage {
  private readonly page: Page;
  private readonly protectedContent: Locator;
  private readonly userInfo: Locator;
  private readonly logoutButton: Locator;
  private readonly accessDeniedMessage: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.protectedContent = page.locator('[data-testid="protected-content"], .protected-content');
    this.userInfo = page.locator('[data-testid="user-info"], .user-info');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.accessDeniedMessage = page.locator('.access-denied, .unauthorized, [data-testid="access-denied"]');
    this.pageTitle = page.locator('h1, h2').first();
  }

  async navigate() {
    await this.page.goto('/protected');
  }

  async isProtectedContentVisible(): Promise<boolean> {
    return await this.protectedContent.isVisible();
  }

  async isAccessDenied(): Promise<boolean> {
    return await this.accessDeniedMessage.isVisible();
  }

  async getUserInfo(): Promise<string> {
    if (await this.userInfo.isVisible()) {
      return await this.userInfo.textContent() || '';
    }
    return '';
  }

  async validateAuthenticatedAccess() {
    // Validate that user can access protected content
    await expect(this.protectedContent).toBeVisible();
    await expect(this.page).not.toHaveURL(/login/); // Shouldn't redirect to login
  }

  async validateUnauthenticatedAccess() {
    // Validate that unauthorized users are blocked or redirected
    try {
      await expect(this.accessDeniedMessage).toBeVisible();
    } catch {
      // Alternative: check if redirected to login page
      await expect(this.page).toHaveURL(/login/);
    }
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async logout() {
    if (await this.logoutButton.isVisible()) {
      await this.logoutButton.click();
    }
  }

  // Method to wait for page to load completely
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  // Method to check current authentication state
  async getAuthenticationState(): Promise<'authenticated' | 'unauthenticated' | 'unknown'> {
    if (await this.isProtectedContentVisible()) {
      return 'authenticated';
    } else if (await this.isAccessDenied() || this.page.url().includes('/login')) {
      return 'unauthenticated';
    }
    return 'unknown';
  }
}