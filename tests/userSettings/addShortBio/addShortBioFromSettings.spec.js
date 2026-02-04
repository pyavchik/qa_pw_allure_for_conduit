import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Add short bio from settings', async ({ settingsPage }) => {
  const shortBio = faker.person.bio();

  await settingsPage.fillBioField(shortBio);
  await settingsPage.clickUpdateSettingsButton();

  await settingsPage.assertSettingsPageIsVisible();
});
