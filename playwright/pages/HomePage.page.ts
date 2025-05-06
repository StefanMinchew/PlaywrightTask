import { Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { Paths } from '../enums/paths';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, Paths.Home);
  }
}
