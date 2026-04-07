
import { type Locator, type Page } from '@playwright/test';

export class PlaywrightHomePage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly writingTestsLink: Locator; // 追加

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    // サイドメニューの "Writing tests" を特定
    this.writingTestsLink = page.getByRole('link', { name: 'Writing tests', exact: true });
  }

  async goto() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  // 追加：サイドメニューをクリックする操作
  async clickWritingTests() {
    await this.writingTestsLink.click();
  }
}

// import { type Locator, type Page } from '@playwright/test';

// export class PlaywrightHomePage {
//   // プロパティの定義（このページにある要素）
//   readonly page: Page;
//   readonly getStartedLink: Locator;

//   // コンストラクタ（初期化処理：No.11の知識！）
//   constructor(page: Page) {
//     this.page = page;
//     this.getStartedLink = page.getByRole('link', { name: 'Get started' });
//   }

//   // メソッド（このページでできる操作）
//   async goto() {
//     await this.page.goto('https://playwright.dev/');
//   }

//   async clickGetStarted() {
//     await this.getStartedLink.click();
//   }
// }