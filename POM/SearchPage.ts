import { Page, Locator } from '@playwright/test';

export class SearchPage {
  private readonly page: Page;
  private readonly searchResults: Locator;
  private readonly searchInput: Locator;
  private readonly locatorsLink: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Updated selectors for Playwright docs search
    this.searchResults = page.locator('.DocSearch-Hit, [data-testid="search-result"], .search-result').first();
    this.searchInput = page.locator('.DocSearch-Input, input[type="search"]');
    this.locatorsLink = page.locator('a[href*="/docs/locators"], .DocSearch-Hit a:has-text("Locators")').first();
    this.pageTitle = page.locator('h1');
  }

  async searchFor(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
  }

  async clickLocatorsLink() {
    await this.locatorsLink.first().click();
  }

  async navigateToLocators() {
    // Alternative direct navigation to locators page
    await this.page.goto('/docs/locators');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async waitForSearchResults() {
    await this.searchResults.first().waitFor({ state: 'visible' });
  }
}