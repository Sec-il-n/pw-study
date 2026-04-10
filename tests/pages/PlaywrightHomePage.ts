// tests/pages/PlaywrightHomePage.ts
import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlaywrightHomePage extends BasePage {
  readonly getStartedLink: Locator;
  readonly writingTestsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.writingTestsLink = page.getByRole('link', { name: 'Writing tests', exact: true });
  }

  // トップページを開く
  async goto(): Promise<void> {
    await this.page.goto('https://playwright.dev/');
  }

  /** ホーム表示後のブラウザタイトル（ページに表記されるタイトル文言の根拠） */
  async getDocumentTitle(): Promise<string> {
    return this.page.title();
  }

  // 「Get started」リンクをクリック
  async clickGetStarted(): Promise<void> {
    await this.getStartedLink.click();
  }

  // サイドメニューの「Writing tests」をクリック
  async clickWritingTests(): Promise<void> {
    await this.writingTestsLink.click();
  }
}

// import { type Locator, type Page } from '@playwright/test';

// export class PlaywrightHomePage {
//   readonly page: Page;
//   readonly getStartedLink: Locator;
//   readonly writingTestsLink: Locator; // 追加

//   constructor(page: Page) {
//     this.page = page;
//     this.getStartedLink = page.getByRole('link', { name: 'Get started' });
//     // サイドメニューの "Writing tests" を特定
//     this.writingTestsLink = page.getByRole('link', { name: 'Writing tests', exact: true });
//   }

//   async goto() {
//     await this.page.goto('https://playwright.dev/');
//   }

//   async clickGetStarted() {
//     await this.getStartedLink.click();
//   }

//   // 追加：サイドメニューをクリックする操作
//   async clickWritingTests() {
//     await this.writingTestsLink.click();
//   }
// }



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