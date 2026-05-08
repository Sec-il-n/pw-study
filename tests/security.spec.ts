import { test, expect } from '@playwright/test';
import { PlaywrightSiteDocSearchPage } from './pages/PlaywrightSiteDocSearchPage';

test('Security: 未ログイン状態で管理ページにアクセスした際、ログインへリダイレクトされること', async ({ page }) => {
    const adminUrl = process.env.ADMIN_URL;
    test.skip(!adminUrl, 'ADMIN_URL is not set.');

    // ログインしていない状態で管理画面URLへ直接移動を試みる
    await page.goto(adminUrl!); // ※例としてのURL
  
    // ログインページへリダイレクトされる、または403エラーが出ることを確認
    await expect(page).toHaveURL(/.*login/);
  });

type SearchProbeCase = {
  name: string;
  query: string;
};

const searchProbeCases: SearchProbeCase[] = [
  { name: 'angle-brackets', query: '<probe-tag>sample</probe-tag>' },
  { name: 'single-double-quotes', query: `quote-check 'single' "double"` },
  { name: 'backticks-and-tilde', query: 'symbol-check `value` ~home' },
  { name: 'pipes-semicolons', query: 'separator-check alpha;beta|gamma' },
  { name: 'ampersands', query: 'entity-check a&b&&c' },
  { name: 'slashes', query: 'path-check ../tmp/../var/log' },
  { name: 'url-encoded-percent', query: '%3Cencoded%3E%2Fencoded%3E' },
  { name: 'double-encoded-percent', query: '%253Cdouble%2520encoded%253E' },
  { name: 'unicode-normalization', query: 'unicode-check e\u0301 and \u00E9' },
  { name: 'full-width-mix', query: 'Ｆｕｌｌｗｉｄｔｈ123 and ASCII' },
  { name: 'zero-width-space', query: 'zero\u200Bwidth\u200Bspace' },
  { name: 'rtl-marker', query: 'rtl\u202Echeck\u202Cmarker' },
  { name: 'line-breaks', query: 'line1\nline2\nline3' },
  { name: 'tab-carriage-return', query: 'tab\tseparated\rand-return' },
  { name: 'emoji-and-symbols', query: 'emoji-check 🔐🧪🧱' },
  { name: 'json-like-structure', query: '{"probe":"value","nest":{"a":1}}' },
  { name: 'xml-like-structure', query: '<root><node id="1"/></root>' },
  { name: 'very-long-repeated-token', query: `long-${'probe'.repeat(250)}` },
  { name: 'mixed-brackets', query: '[]{}()<>{} bracket-check' },
  { name: 'sql-keywords-like-text', query: 'keyword-check select from where group order' },
];

function testEachProbe(cases: SearchProbeCase[]): void {
  for (const probeCase of cases) {
    test(`Security: 検索入力の耐性チェック - ${probeCase.name}`, async ({ page }) => {
      const searchPage = new PlaywrightSiteDocSearchPage(page);
      await searchPage.goto();

      let dialogTriggered = false;
      page.on('dialog', async (dialog) => {
        dialogTriggered = true;
        await dialog.dismiss();
      });

      await searchPage.typeQuery(probeCase.query);
      await page.waitForTimeout(800);

      // 危険な文字種を入れてもスクリプト実行やクラッシュが起きないことを確認する。
      expect(dialogTriggered).toBeFalsy();
      await expect(page).toHaveURL(/playwright\.dev/i);
    });
  }
}

test.describe('Security: 検索窓への入力耐性（20パターン）', () => {
  testEachProbe(searchProbeCases);
});
  