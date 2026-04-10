import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlaywrightSiteDocSearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://playwright.dev/');
  }

  async openDocSearch(): Promise<void> {
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  private get searchInput() {
    return this.page.getByPlaceholder('Search docs');
  }

  async typeQuery(query: string): Promise<void> {
    await this.openDocSearch();
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(query);
  }

  async expectAtLeastOneSearchOption(): Promise<void> {
    await expect(this.page.getByRole('option').first()).toBeVisible();
  }

  async openFirstSearchOption(): Promise<void> {
    await this.page.getByRole('option').first().click();
  }

  async expectNoSearchResultsMessage(): Promise<void> {
    await expect(this.page.getByText(/no results/i)).toBeVisible();
  }
}
