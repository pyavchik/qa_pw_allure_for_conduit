import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update username from settings', async ({ page, settingsPage }) => {
  const newUsername = `${faker.person.firstName()}_${faker.person.lastName()}`
    .replaceAll("'")
    .toLowerCase();

  await settingsPage.fillUsernameField(newUsername);
  await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes('user') &&
        ['PUT', 'PATCH'].includes(res.request().method()),
    ),
    settingsPage.clickUpdateSettingsButton(),
  ]);

  await page.reload();
  await expect(page.getByRole('link', { name: newUsername })).toBeVisible();
});
