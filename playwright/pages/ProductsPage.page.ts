import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './Base.page';
import { Paths } from '../enums/paths';
import { IItem } from '../types/item';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productItems: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly modal: Locator;

  constructor(page: Page) {
    super(page, Paths.Products);

    this.searchInput = this.page.getByPlaceholder('Search Product');
    this.searchButton = this.page.locator('#submit_search');
    this.productItems = this.page.locator('.product-image-wrapper');
    this.productName = this.page.locator('.productinfo p');
    this.productPrice = this.page.locator('.productinfo h2');
    this.modal = this.page.locator('#cartModal');
  }

  async searchProduct(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async assertSearchResultsMatchQuery(query: string): Promise<void> {
    const resultCount = await this.productItems.count();
    const nameCount = await this.productName.count();

    expect(nameCount).toBe(resultCount);

    for (let i = 0; i < nameCount; i++) {
      const name = await this.productName.nth(i).innerText();
      expect(name.toLowerCase()).toContain(query.toLowerCase());
    }
  }
  async getProductDetails(index: number): Promise<IItem> {
    const productItem = this.productItems.nth(index);
    const name = await productItem.locator('.productinfo p').innerText();
    const price = await productItem.locator('.productinfo h2').innerText();
    return { name, price };
  }

  async addProductToCart(index: number): Promise<void> {
    const productItem = this.productItems.nth(index);

    await productItem.hover();

    const addToCartButton = productItem.locator('.productinfo .add-to-cart');

    await addToCartButton.click();
    await expect(this.modal).toBeVisible();
    await this.modal.getByRole('button', { name: 'Continue Shopping' }).click();
  }
}
