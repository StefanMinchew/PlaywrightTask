import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly signupLoginLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly logoutLink: Locator;

  constructor(private page: Page) {
    this.signupLoginLink = this.page.locator('a[href="/login"]');
    this.productsLink = this.page.locator('a[href="/products"]');
    this.cartLink = this.page.locator('a[href="/view_cart"]');
    this.logoutLink = this.page.locator('a[href="/logout"]');
  }

  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async clickProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }
}
