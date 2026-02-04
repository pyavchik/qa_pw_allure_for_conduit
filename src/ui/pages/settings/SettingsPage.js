import { expect, testStep } from '../../../common/helpers/pw';

export class SettingsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.getByPlaceholder('Username');
    this.emailField = page.getByPlaceholder('Email');
    this.passwordField = page.getByPlaceholder('New Password');
    this.imageUrlField = page.getByPlaceholder('URL of profile picture');
    this.bioField = page.getByPlaceholder('Short bio about you');
    this.updateSettingsButton = page.getByRole('button', {
      name: 'Update Settings',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Settings' page`, async () => {
      await this.page.goto('/settings');
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill the 'Username' field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillEmailField(email) {
    await this.step(`Fill the 'Email' field`, async () => {
      await this.emailField.fill(email);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill the 'New Password' field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async fillImageUrlField(url) {
    await this.step(`Fill the 'URL of profile picture' field`, async () => {
      await this.imageUrlField.fill(url);
    });
  }

  async fillBioField(bio) {
    await this.step(`Fill the 'Short bio about you' field`, async () => {
      await this.bioField.fill(bio);
    });
  }

  async clickUpdateSettingsButton() {
    await this.step(`Click the 'Update Settings' button`, async () => {
      await this.updateSettingsButton.click();
    });
  }

  async assertSettingsPageIsVisible() {
    await this.step(`Assert the 'Settings' page is visible`, async () => {
      await expect(this.updateSettingsButton).toBeVisible();
    });
  }

  async getUsernameFieldValue() {
    return this.usernameField.inputValue();
  }

  async getImageUrlFieldValue() {
    return this.imageUrlField.inputValue();
  }

  async getBioFieldValue() {
    return this.bioField.inputValue();
  }
}
