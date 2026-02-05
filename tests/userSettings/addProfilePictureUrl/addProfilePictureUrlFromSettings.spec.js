import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Add profile picture URL from settings', async ({
  page,
  user,
  settingsPage,
}) => {
  const imageUrl = faker.image.avatar();

  await settingsPage.fillImageUrlField(imageUrl);
  await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes('user') &&
        ['PUT', 'PATCH'].includes(res.request().method()),
    ),
    settingsPage.clickUpdateSettingsButton(),
  ]);

  await page.goto(`/profile/${user.username}`);
  await expect(page.getByRole('img', { name: "User's profile image" }))
    .toHaveAttribute('src', imageUrl);
});
