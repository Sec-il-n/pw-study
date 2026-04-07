import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from './pages/PlaywrightHomePage';
import { SearchFlow } from './pages/SearchFlow';

// 各テストの前に実行される共通処理
test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test('検索フローのテスト', async ({ page }) => {
  const searchFlow = new SearchFlow(page);

  await searchFlow.searchAndVerify('Locators');
});

// import { test, expect } from '@playwright/test';
// import { PlaywrightHomePage } from './pages/PlaywrightHomePage';
// import { HeaderComponent } from './pages/components/HeaderComponent'; // 共通パーツ
// import { SearchFlow } from './pages/SearchFlow';                 // 共通フロー
// import { testData } from './data/testData';                     // データ

// test('高度な構造化パターンの実演', async ({ page }) => {
//   const homePage = new PlaywrightHomePage(page);
//   const header = new HeaderComponent(page);
//   const searchFlow = new SearchFlow(page);

//   // 1. データ駆動でURLを開く
//   await page.goto(testData.url);

//   // 2. 共通パーツ（ヘッダー）の操作
//   await expect(header.githubLink).toBeVisible();

//   // 3. 共通フロー（検索）の実行
//   // データファイルからキーワード「Locators」を取得して検索
//   await searchFlow.searchAndVerify(testData.keywords.locators);
// });