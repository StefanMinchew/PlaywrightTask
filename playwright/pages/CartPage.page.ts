import { Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { Paths } from '../enums/paths';
import { IItem } from '../types/item';

export class CartPage extends BasePage {
  readonly productRow: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page, Paths.Cart);

    this.productRow = this.page.locator('tr[id^="product-"]');
    this.deleteButton = this.page.locator('.cart_quantity_delete');
  }

  async getCartItemDetails(index: number): Promise<IItem> {
    const getProductRow = this.productRow.nth(index);
    const name = await getProductRow
      .locator('.cart_description h4 a')
      .innerText();
    const quantity = await getProductRow
      .locator('.cart_quantity button')
      .innerText();
    const price = await getProductRow.locator('.cart_price p').innerText();
    const total = await getProductRow
      .locator('.cart_total .cart_total_price')
      .innerText();

    return { name, quantity, price, total };
  }

  async clearCart(): Promise<void> {
    const count = await this.deleteButton.count();

    for (let i = 0; i < count; i++) {
      await this.deleteButton.first().click();
      await this.page.waitForLoadState('networkidle');
    }
  }
}
