// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
//   console.log("✅ テストが成功しました！");
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

// import { test, expect } from '@playwright/test';

// test('基本操作：検索とクリック', async ({ page }) => {
//   // 1. Navigation（移動）
//   await page.goto('https://playwright.dev/');

//   // 2. Click & Fill（操作）
//   // 検索ボタン（虫眼鏡）をクリック
//   await page.getByRole('button', { name: 'Search' }).click();

//   // 検索窓に "locators" と入力
//   await page.getByPlaceholder('Search docs').fill('locators');

//   // 3. Assertion（検証）
//   // 最初の検索結果に "Locators" という文字があることを確認
//   await expect(page.locator('.DocSearch-Hit-title').first()).toContainText('Locators');
// });

// import { test, expect } from '@playwright/test';

// test('要素特定のバリエーション', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // 1. Role（役割）で探す：最も推奨
//   const getStarted = page.getByRole('link', { name: 'Get started' });
//   await getStarted.click();

//   // 2. テキストそのもので探す⇩エラー
//   // await expect(page.getByText('Installation')).toBeVisible();
//   // 修正後：役割（見出し）を指定して1つに絞り込む
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

//   // 3. ラベル（inputタグの隣の文字）で探す
//   // ※ 検索窓などの入力項目に有効
//   // await page.getByLabel('Search').fill('test');
// });

// import { test, expect } from '@playwright/test';

// test('いろいろな検証パターン', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // 1. 要素が見えることを確認（厳格モード回避版）
//   // 役割（heading）を指定して1つに絞り込む
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
//   // await expect(page.getByRole('heading', { name: 'Playwright enables reliable' }).locator('span')).toContainText('Playwright');
  
//   // 2. 文字列の検証
//   const title = page.locator('.navbar__title');
//   await expect(title).toContainText('Playwright');

//   // 3. 否定の検証（「〜ではないこと」を確認）
//   // ボタンが隠れている、あるいは存在しないことを確認したい時
//   await expect(page.getByText('存在しない文字')).not.toBeVisible();
// });

import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from './pages/PlaywrightHomePage.ts'; // 作成した部品をインポート

test('POMを使ったテスト例', async ({ page }) => {
  // 1. ページの設計図から実体を作る
  const homePage = new PlaywrightHomePage(page);

  // 2. 部品に定義されたアクションを呼び出す
  await homePage.goto();
  await homePage.clickGetStarted();

  // 3. 検証（ページ遷移が成功したか）
  await expect(page).toHaveURL(/.*intro/);
});
