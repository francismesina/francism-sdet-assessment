import { Page, Locator, expect } from '@playwright/test';

export class ReleaseNotesPage {
  private readonly page: Page;
  private readonly getStartedMenu: Locator;
  private readonly getStartedMenuItems: Locator;
  private readonly sidebarNavigation: Locator;
  private readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Locator for the "Get Started" menu in the top left navigation
    this.getStartedMenu = page.locator('nav').locator('text="Get started"').first();
    this.getStartedMenuItems = page.locator('[data-testid="sidebar-nav"] >> text="Get started"');
    this.sidebarNavigation = page.locator('[data-testid="sidebar-nav"]');
    this.pageTitle = page.locator('h1');
  }

  async navigate() {
    await this.page.goto('/docs/release-notes');
  }

  async clickGetStartedMenu() {
    await this.getStartedMenu.click();
  }

  async getGetStartedMenuState(): Promise<string> {
    // Check if the menu is expanded or collapsed
    const isExpanded = await this.getStartedMenu.getAttribute('aria-expanded');
    return isExpanded || 'false';
  }

  async validateMenuCollapsed() {
    // Wait for menu to collapse and validate state
    await expect(this.getStartedMenu).toHaveAttribute('aria-expanded', 'false');
  }

  async validateMenuExpanded() {
    await expect(this.getStartedMenu).toHaveAttribute('aria-expanded', 'true');
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.textContent() || '';
  }

  // Alternative method to find Get Started menu by different selectors
  async findGetStartedMenuAlternative() {
    // Try different approaches to locate the Get Started menu
    const menuSelectors = [
      'button:has-text("Get started")',
      '[role="button"]:has-text("Get started")',
      '.menu-item:has-text("Get started")',
      'nav [data-testid*="get-started"]'
    ];

    for (const selector of menuSelectors) {
      const element = this.page.locator(selector);
      if (await element.isVisible()) {
        return element;
      }
    }
    
    return this.getStartedMenu; // fallback to original selector
  }
}