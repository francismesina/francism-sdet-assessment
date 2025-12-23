/**
 * Test Data Utilities
 * Manages test credentials and configuration from environment variables
 */

export class TestData {
  // Authentication credentials
  static get validCredentials() {
    return {
      username: process.env.TEST_USERNAME || 'testuser',
      password: process.env.TEST_PASSWORD || 'testpass'
    };
  }

  static get invalidCredentials() {
    return {
      username: 'invaliduser',
      password: 'wrongpassword'
    };
  }

  // URLs
  static get playwrightDocsUrl() {
    return process.env.PLAYWRIGHT_DOCS_URL || 'https://playwright.dev';
  }

  static get authServiceUrl() {
    return process.env.AUTH_SERVICE_URL || 'http://localhost:3000';
  }

  // Test configuration
  static get timeout() {
    return parseInt(process.env.TIMEOUT || '30000');
  }

  static get isHeadedMode() {
    return process.env.HEADED_MODE === 'true';
  }

  // Storage state paths
  static get authStoragePath() {
    return './auth-state.json';
  }

  // Search terms for testing
  static get searchTerms() {
    return {
      locators: 'locators',
      installation: 'installation',
      testing: 'testing'
    };
  }

  // Expected text content
  static get expectedContent() {
    return {
      playwrightMainHeading: 'Playwright',
      copyrightPattern: /Copyright © \d{4} Microsoft/,
      locatorsPageTitle: 'Locators'
    };
  }
}