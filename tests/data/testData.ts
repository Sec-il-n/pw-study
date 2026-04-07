export const testData = {
  url: 'https://playwright.dev/',
  keywords: {
    locators: 'Locators',
    assertions: 'Assertions',
    trace: 'Trace Viewer'
  },
  expectedTitles: {
    home: 'Playwright enables reliable end-to-end testing for modern web apps.'
  }
};

// /** データ駆動テスト用：URL・入力値・期待値をテストから切り離す */

// export const playwrightDocsBaseUrl = 'https://playwright.dev/';

// export type DocSearchCase = {
//   query: string;
//   expectedInFirstHit: string;
// };

// export const docSearchCases: DocSearchCase[] = [
//   { query: 'locators', expectedInFirstHit: 'Locators' },
// ];
