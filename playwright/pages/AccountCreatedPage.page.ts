import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { Paths } from '../enums/paths';

export class AccountCreatedPage extends BasePage {
  readonly accountCreatedMessage: Locator;

  constructor(page: Page) {
    super(page, Paths.Account_created);

    this.accountCreatedMessage = this.page.getByTestId('account-created');
  }
}
