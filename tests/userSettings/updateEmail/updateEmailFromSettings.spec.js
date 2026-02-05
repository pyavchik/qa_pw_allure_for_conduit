import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update email from settings', async ({ page, settingsPage }) => {
  const newEmail = faker.internet.email().toLowerCase();

  await settingsPage.fillEmailField(newEmail);
  await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes('user') &&
        ['PUT', 'PATCH'].includes(res.request().method()),
    ),
    settingsPage.clickUpdateSettingsButton(),
  ]);

  await page.reload();
  await expect(settingsPage.emailField).toHaveValue(newEmail);
});
