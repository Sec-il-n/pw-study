import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from './pages/PlaywrightHomePage';
import { PlaywrightSiteDocSearchPage } from './pages/PlaywrightSiteDocSearchPage';

test('Security: 未ログイン状態で管理ページにアクセスした際、ログインへリダイレクトされること', async ({ page }) => {
    
    const adminUrl = process.env.ADMIN_URL;
    if (!adminUrl) {
      throw new Error('ADMIN_URL is not set. Please define it in your .env file.');
    }
    // ログインしていない状態で管理画面URLへ直接移動を試みる
    await page.goto(adminUrl); // ※例としてのURL
  
    // ログインページへリダイレクトされる、または403エラーが出ることを確認
    await expect(page).toHaveURL(/.*login/);
  });

test('Security: 検索窓にXSSペイロードを入力しても実行されないこと', async ({ page }) => {
    const searchPage = new PlaywrightSiteDocSearchPage(page);
    await page.goto('/');
  
    // 悪意のあるスクリプト（ペイロード）
    const xssPayload = '<script>alert("XSS")</script>';
    
    await searchPage.typeQuery(xssPayload);
  
    // 安全なサイトなら、タグが「無害化（エスケープ）」されてそのまま表示されるか、
    // あるいは何もヒットしないはず。
    // スクリプトが実行されてダイアログが出るようなことがあれば脆弱性あり。
    await expect(page.getByText(xssPayload)).toBeVisible();
  });
  