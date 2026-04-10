import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from './pages/PlaywrightHomePage';
import { PlaywrightSiteDocSearchPage } from './pages/PlaywrightSiteDocSearchPage';

/** ブラウザタイトル文言から、DocSearch に打ちやすい英単語（ハイフン付き可）を1つ選ぶ */
function pickKeywordFromTitleText(titleText: string): string {
  const normalized = titleText.replace(/\s+/g, ' ').trim();
  const words = normalized.split(/[\s\u00A0|]+/);
  const asciiWord = words.find((w) => /^[A-Za-z][A-Za-z-]*[A-Za-z]$/.test(w));
  if (asciiWord !== undefined) {
    return asciiWord;
  }
  return 'Playwright';
}

/** タイトル文字列に部分一致しないクエリ（小文字化して比較） */
function pickQueryNotInTitle(titleText: string): string {
  const lower = titleText.toLowerCase();
  let n = 0;
  let candidate = '__docsearch_neg__0';
  while (lower.includes(candidate.toLowerCase())) {
    n += 1;
    candidate = `__docsearch_neg__${n}`;
  }
  return candidate;
}

test.describe('playwright.dev ヘッダー DocSearch', () => {
  test('ホームのブラウザタイトルに含まれる語句で検索し、候補から該当ドキュメントへ遷移できること', async ({
    page,
  }) => {
    const home = new PlaywrightHomePage(page);
    const docSearch = new PlaywrightSiteDocSearchPage(page);

    await home.goto();

    const titleText = (await home.getDocumentTitle()).trim();
    expect(titleText.length).toBeGreaterThan(0);
    const query = pickKeywordFromTitleText(titleText);

    await docSearch.typeQuery(query);
    await docSearch.expectAtLeastOneSearchOption();

    await Promise.all([
      page.waitForURL(/playwright\.dev\/docs\//),
      docSearch.openFirstSearchOption(),
    ]);
  });

  test('ホームのブラウザタイトルに含まれない語句では検索結果が表示されないこと', async ({ page }) => {
    const home = new PlaywrightHomePage(page);
    const docSearch = new PlaywrightSiteDocSearchPage(page);

    await home.goto();

    const titleText = (await home.getDocumentTitle()).trim();
    expect(titleText.length).toBeGreaterThan(0);
    const query = pickQueryNotInTitle(titleText);

    await docSearch.typeQuery(query);
    await docSearch.expectNoSearchResultsMessage();
  });
});
