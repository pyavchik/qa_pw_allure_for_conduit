import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Add profile picture URL from settings', async ({ settingsPage }) => {
  const imageUrl = faker.image.avatar();

  await settingsPage.fillImageUrlField(imageUrl);
  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.assertSettingsPageIsVisible();
});
