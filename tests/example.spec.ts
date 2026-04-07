import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from './pages/PlaywrightHomePage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
});

test('サイドメニューを使った確実な遷移テスト', async ({ page }) => {
  const homePage = new PlaywrightHomePage(page);

  // 1. Get Started をクリック (Installation ページへ)
  await homePage.clickGetStarted();

  // 2. サイドメニューの "Writing tests" をクリック
  await homePage.clickWritingTests();

  // 3. URLが /docs/intro ではなく /docs/writing-tests になったか検証
  await expect(page).toHaveURL(/.*writing-tests/);//PASS
  // await expect(page).toHaveURL(/.*error-page/);//FAIL
  // 4. 見出しが "Writing tests" になっているか検証
  await expect(page.getByRole('heading', { name: 'Writing tests' })).toBeVisible();
});

// import { test, expect } from '@playwright/test';
// import { PlaywrightHomePage } from './pages/PlaywrightHomePage.ts'; // 部品を読み込む

// test('POMを使ったクリーンなテスト', async ({ page }) => {
//   // 1. ページのインスタンスを作成
//   const homePage = new PlaywrightHomePage(page);

//   // 2. 部品のメソッドを呼び出す
//   // 「どう探すか」は部品側に隠れているので、テスト側はスッキリ！
//   await homePage.goto();
//   await homePage.clickGetStarted();

//   // 3. 検証
//   await expect(page).toHaveURL(/.*intro/);
// });