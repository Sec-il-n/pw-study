// import { test, expect } from '@playwright/test';
// import { PlaywrightHomePage } from './pages/PlaywrightHomePage.ts';
// import { SearchFlow } from './pages/SearchFlow.ts';
// import { docSearchCases } from './data/testData.ts';

// test.describe('ドキュメント検索（データ駆動）', () => {
//   for (const { query, expectedInFirstHit } of docSearchCases) {
//     test(`検索: "${query}" → 先頭ヒットに ${expectedInFirstHit}`, async ({ page }) => {
//       const homePage = new PlaywrightHomePage(page);
//       await homePage.goto();

//       const flow = new SearchFlow(page);
//       await flow.searchDocs(query);
//       await flow.expectFirstHitTitleContains(expectedInFirstHit);
//     });
//   }
// });
