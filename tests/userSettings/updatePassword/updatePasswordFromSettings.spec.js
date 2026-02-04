import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update password from settings', async ({ settingsPage }) => {
  const newPassword = faker.internet.password();

  await settingsPage.fillPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.assertSettingsPageIsVisible();
});
