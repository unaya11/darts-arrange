import { test, expect, Page } from '@playwright/test';

const getScoreInput = (page: Page) => page.getByPlaceholder('半角数字でスコアを入力してください');
test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

test('入力した条件と結果の表示が一致していること', async ({ page }) => {
  const inputScore: string = '100';
  const input = getScoreInput(page);
  const paragraphs = page.locator('#dialogBox p');

  await expect(input).toBeVisible({ timeout: 10000 });
  await input.fill(inputScore);
  await page.getByRole('button', { name: '計算' }).click();

  await expect(page.getByRole('heading', { name: `${inputScore} のアレンジ` })).toBeVisible();
  await expect(paragraphs.filter({ hasText: /^20-/ }).first()).toBeVisible();
  await expect(page.locator('#dialogBox')).toContainText('60-16-24');
  await expect(paragraphs.filter({ hasText: /^(?!(20|60)-)\d+-/ })).toHaveCount(0);
  await expect(page.locator('#dialogBox')).not.toContainText(/-50$/);
});

test('とじるボタンが動作すること', async ({ page }) => {
  const inputScore: string = '100';
  const input = getScoreInput(page);

  await expect(input).toBeVisible({ timeout: 10000 });
  await input.fill(inputScore);
  await page.getByRole('button', { name: '計算' }).click();
  await page.getByRole('button', { name: 'とじる' }).click();

  await expect(page.getByRole('button', { name: '計算' })).toBeVisible();
});

test('上がり目が無い場合にエラー表示が出ること', async ({ page }) => {
  const input = getScoreInput(page);

  await expect(input).toBeVisible({ timeout: 10000 });
  await input.fill('169');
  await page.getByRole('button', { name: '計算' }).click();

  await expect(page.locator('#errorMessage')).toContainText(
    '選択した条件での上がり目が存在しません',
  );
});
test('入力が無い場合にエラー表示が出ること', async ({ page }) => {
  const input = getScoreInput(page);

  await expect(input).toBeVisible({ timeout: 10000 });
  await page.getByRole('button', { name: '計算' }).click();

  await expect(page.locator('#errorMessage')).toContainText('半角数字を入力してください');
});
test('数字が入力できないこと', async ({ page }) => {
  const input = getScoreInput(page);
  await expect(input).toBeVisible({ timeout: 10000 });
  await input.pressSequentially('abc');

  await expect(input).toHaveValue('');
});
test('エラー表示が出た後に正常に動作した場合、エラー表示が消える事', async ({ page }) => {
  const input = getScoreInput(page);
  const inputScore: string = '100';

  await expect(input).toBeVisible({ timeout: 10000 });
  await input.fill('169');
  await page.getByRole('button', { name: '計算' }).click();

  await expect(page.locator('#errorMessage')).toContainText(
    '選択した条件での上がり目が存在しません',
  );

  await expect(input).toBeVisible({ timeout: 10000 });
  await input.fill(inputScore);
  await page.getByRole('button', { name: '計算' }).click();
  await page.getByRole('button', { name: 'とじる' }).click();

  await expect(page.locator('#errorMessage')).toContainText('');
});
test('1本目の指定欄のチェックボックスの動作確認', async ({ page }) => {
  const firstGroup = page.locator('#firstTargetGroup');
  const allCheckboxes = firstGroup.locator('.first-checks');
  const selectAll = firstGroup.getByRole('checkbox', { name: '全て選択' });
  await selectAll.click();

  const checks = await allCheckboxes.all();
  for (const check of checks) {
    await expect(check).toBeChecked();
  }

  await selectAll.click();

  for (const check of checks) {
    await expect(check).not.toBeChecked();
  }
});
test('3本目の指定欄のチェックボックスの動作確認', async ({ page }) => {
  const firstGroup = page.locator('#thirdTargetGroup');
  const allCheckboxes = firstGroup.locator('.third-checks');
  const selectAll = firstGroup.getByRole('checkbox', { name: '全て選択' });
  await selectAll.click();

  const checks = await allCheckboxes.all();
  for (const check of checks) {
    await expect(check).toBeChecked();
  }

  await selectAll.click();

  for (const check of checks) {
    await expect(check).not.toBeChecked();
  }
});
