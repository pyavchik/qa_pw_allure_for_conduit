import { test } from '../../_fixtures/fixtures';
import { expect } from '../../../src/common/helpers/pw';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Log out user', async ({ page }) => {
  await page.evaluate(() => {
    /* eslint-disable no-undef -- runs in browser context */
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
});
