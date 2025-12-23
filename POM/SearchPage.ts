import { Page, Locator } from '@playwright/test';

export class SearchPage {
  private readonly page: Page;
  private readonly searchResults: Locator;
  private readonly searchInput: Locator;
  private readonly locatorsLink: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchResults = page.locator('[data-testid="search-result"]');
    this.searchInput = page.locator('input[type="search"]');
    this.locatorsLink = page.locator('a[href*="/docs/locators"]');
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