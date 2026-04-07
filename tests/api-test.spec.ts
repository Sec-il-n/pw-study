import { test, expect } from '@playwright/test';

test('APIリクエストの送信と検証', async ({ request }) => {
  // 1. GETリクエストを送信（ダミーの投稿データを取得）
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

  // 2. ステータスコードが 200 (成功) であることを確認
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

 // 3. レスポンスの中身（JSON）を取得して検証
 const body = await response.json();
 console.log(body); // デバッグ用

 // 内容のチェック
 // .underline ではなく .toBeDefined() を使います
 expect(body).toBeDefined(); 
 expect(body.id).toBe(1);
 expect(typeof body.title).toBe('string');
});