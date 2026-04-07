import { type Page, expect } from '@playwright/test';

export class SearchFlow {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async searchAndVerify(keyword: string) {
    // 1. 検索ボタンをクリック
    await this.page.getByRole('button', { name: 'Search' }).click();
    
    // 2. 検索入力欄を特定
    const searchInput = this.page.getByPlaceholder('Search docs');
    
    // 【修正ポイント】
    // 入力欄が表示され、操作可能になるのを明示的に待ってから入力する
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(keyword);
    
    // 3. Enterを押す
    await searchInput.press('Enter');

    // 4. 見出しが表示されるのを待つ
    await expect(this.page.getByRole('heading', { name: keyword, exact: false })).toBeVisible();
  }
}

// import { expect, type Page } from '@playwright/test';
// import { HeaderComponent } from './components/HeaderComponent';

// /**
//  * 複数ステップにまたがる「検索」操作を1か所にまとめる（フロー / シナリオヘルパー）
//  */
// export class SearchFlow {
//   private readonly page: Page;
//   private readonly header: HeaderComponent;

//   constructor(page: Page) {
//     this.page = page;
//     this.header = new HeaderComponent(page);
//   }

//   async openDocSearch() {
//     await this.header.searchButton.click();
//   }

//   async searchDocs(query: string) {
//     await this.openDocSearch();
//     await this.page.getByPlaceholder('Search docs').fill(query);
//   }

//   async expectFirstHitTitleContains(text: string | RegExp) {
//     // DocSearch はヒットを role="option" として公開しているため、
//     // class 依存を避けて getByRole で検証する
//     await expect(this.page.getByRole('option', { name: text }).first()).toBeVisible();
//   }
// }
