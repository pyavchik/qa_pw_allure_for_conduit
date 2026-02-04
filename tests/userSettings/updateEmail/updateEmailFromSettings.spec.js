import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update email from settings', async ({ settingsPage }) => {
  const newEmail = faker.internet.email().toLowerCase();

  await settingsPage.fillEmailField(newEmail);
  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.assertSettingsPageIsVisible();
});
