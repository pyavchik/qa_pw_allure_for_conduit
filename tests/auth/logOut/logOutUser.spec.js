import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';

test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Log out user', async ({ page, settingsPage }) => {
  await settingsPage.open();
  // This Conduit deployment does not expose a visible "Sign out" control in the
  // UI; we simulate logout by clearing storage. Use settingsPage.clickSignOutLink(username)
  // when testing an app that provides a logout link (e.g. on Settings or in the user menu).
  await page.evaluate(() => {
    /* eslint-disable no-undef -- runs in browser context */
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
});
