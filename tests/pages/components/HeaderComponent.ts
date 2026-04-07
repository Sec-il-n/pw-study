import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly discordLink: Locator;
  readonly githubLink: Locator; // ← ここが定義されている必要があります

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.discordLink = page.getByRole('link', { name: 'Discord' });
    this.githubLink = page.getByRole('link', { name: 'GitHub repository' }); // ← ここも！
  }

  async openSearch() {
    await this.searchButton.click();
  }
}

// import { type Locator, type Page } from '@playwright/test';

// /**
//  * 複数ページで共通のヘッダー領域を部品化（コンポーネント POM）
//  */
// export class HeaderComponent {
//   readonly page: Page;
//   /** ドキュメント検索を開くボタン（playwright.dev など） */
//   readonly searchButton: Locator;

//   constructor(page: Page) {
//     this.page = page;
//     this.searchButton = page.getByRole('button', { name: 'Search' });
//   }
// }
