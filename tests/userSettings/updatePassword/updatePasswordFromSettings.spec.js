import { test } from '../../_fixtures/fixtures';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, user, settingsPage }) => {
  await signUpUser(page, user);
  await settingsPage.open();
});

test('Update password from settings', async ({
  page,
  user,
  settingsPage,
  signInPage,
  homePage,
}) => {
  const newPassword = faker.internet.password();

  await settingsPage.fillPasswordField(newPassword);
  await settingsPage.clickUpdateSettingsButton();

  await page.evaluate(() => {
    /* eslint-disable no-undef -- runs in browser context */
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.goto('/');
  await signInPage.open();
  await signInPage.fillEmailField(user.email);
  await signInPage.fillPasswordField(newPassword);
  await signInPage.clickSignInButton();

  await homePage.assertYourFeedTabIsVisible();
});
