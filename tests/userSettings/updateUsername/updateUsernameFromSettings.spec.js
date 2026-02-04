import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update username from settings', async ({ user, settingsPage }) => {
  const newUsername = `${faker.person.firstName()}_${faker.person.lastName()}`
    .replaceAll("'")
    .toLowerCase();

  await settingsPage.fillUsernameField(newUsername);
  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.assertSettingsPageIsVisible();
});
