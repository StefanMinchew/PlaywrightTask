import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { BasePage } from './Base.page';
import { STORAGE_STATE_E2E } from '../../playwright.config';
import { handleCookieConsent } from '../utils/cookieConsentHandler';

const username = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

export class LoginPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page, Paths.Login);

    this.loginEmailInput = this.page.getByTestId('login-email');
    this.loginPasswordInput = this.page.getByTestId('login-password');
    this.loginButton = this.page.getByTestId('login-button');
    this.signupNameInput = this.page.getByTestId('signup-name');
    this.signupEmailInput = this.page.getByTestId('signup-email');
    this.signupButton = this.page.getByTestId('signup-button');
  }

  async loginGlobalSetup(): Promise<void> {
    await handleCookieConsent(this.page);
    await this.open();
    // eslint-disable-next-line no-console
    console.log('GlobalSetup: Performing UI login');
    await this.login(username, password);
    await this.page.context().storageState({ path: STORAGE_STATE_E2E });
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
