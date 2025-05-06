import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { BasePage } from './Base.page';
import { SignupFormData } from '../types/formData';

export class SignUpPage extends BasePage {
  readonly name: Locator;
  readonly password: Locator;
  readonly day: Locator;
  readonly month: Locator;
  readonly year: Locator;
  readonly newsletter: Locator;
  readonly specialOffers: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;
  readonly company: Locator;
  readonly address2: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page, Paths.SignUp);

    this.name = this.page.getByTestId('name');
    this.password = this.page.getByTestId('password');
    this.day = this.page.getByTestId('days');
    this.month = this.page.getByTestId('months');
    this.year = this.page.getByTestId('years');
    this.newsletter = this.page.getByTestId('newsletter');
    this.specialOffers = this.page.getByTestId('optin');
    this.firstName = this.page.getByTestId('first_name');
    this.lastName = this.page.getByTestId('last_name');
    this.address = this.page.getByTestId('address');
    this.country = this.page.getByTestId('country');
    this.state = this.page.getByTestId('state');
    this.city = this.page.getByTestId('city');
    this.zipcode = this.page.getByTestId('zipcode');
    this.mobileNumber = this.page.getByTestId('mobile_number');
    this.company = this.page.getByTestId('company');
    this.address2 = this.page.getByTestId('address2');
    this.createAccountButton = this.page.getByTestId('create-account');
  }

  async fillSignUpForm(data: SignupFormData): Promise<void> {
    if (data.title) {
      await this.page
        .getByTestId('title')
        .locator(`[value="${data.title}"]`)
        .check();
    }

    if (data.name) await this.name.fill(data.name);

    await this.password.fill(data.password);

    if (data.day) await this.day.selectOption(data.day);
    if (data.month) await this.month.selectOption(data.month);
    if (data.year) await this.year.selectOption(data.year);

    if (data.newsletter) await this.newsletter.check();
    if (data.specialOffers) await this.specialOffers.check();

    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);

    if (data.company) await this.company.fill(data.company);

    await this.address.fill(data.address);

    if (data.address2) await this.address2.fill(data.address2);

    await this.country.selectOption(data.country);
    await this.state.fill(data.state);
    await this.city.fill(data.city);
    await this.zipcode.fill(data.zipcode);
    await this.mobileNumber.fill(data.mobileNumber);

    await this.clickCreateAccount();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }
}
