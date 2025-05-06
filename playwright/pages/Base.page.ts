import { Page } from '@playwright/test';
import { Paths } from '../enums/paths';

export class BasePage {
  readonly page: Page;
  readonly _url: string;

  constructor(page: Page, url = Paths.Home) {
    this.page = page;
    this._url = url;
  }

  async open(): Promise<void> {
    await this.page.goto(this._url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }
}
