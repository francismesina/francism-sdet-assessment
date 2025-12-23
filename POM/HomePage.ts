import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly mainHeading: Locator;
  private readonly searchButton: Locator;
  private readonly searchInput: Locator;
  private readonly footer: Locator;
  private readonly getStartedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainHeading = page.locator('h1').first();
    this.searchButton = page.locator('[aria-label="Search"]');
    this.searchInput = page.locator('input[placeholder*="Search docs"]');
    this.footer = page.locator('footer');
    this.getStartedButton = page.locator('text="Get started"').first();
  }

  async navigate() {
    await this.page.goto('/');
  }

  async getMainHeadingText(): Promise<string> {
    return await this.mainHeading.textContent() || '';
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async searchFor(searchTerm: string) {
    await this.clickSearch();
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
  }

  async getFooterText(): Promise<string> {
    return await this.footer.textContent() || '';
  }

  async assertFooterCopyright() {
    // Use regex to match copyright text with any year
    await expect(this.footer).toContainText(/Copyright © \d{4} Microsoft/);
  }

  async clickGetStarted() {
    await this.getStartedButton.click();
  }

  // Visual testing method
  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }
}