import { expect, test } from '../fixtures/base.fixture';
import { IItem } from '../types/item';

test('Search and Add Product to Cart', async ({ productsPage, cartPage }) => {
  const searchQuery = 'Jeans';
  let productDetails: IItem;
  const itemIndex = 0;

  await test.step('CLEANUP: Ensure cart is empty before test', async () => {
    await cartPage.open();
    await cartPage.clearCart();
  });

  await test.step('GIVEN: John navigates to the products page', async () => {
    await productsPage.open();
  });

  await test.step(`WHEN: He uses the search bar to search for ${searchQuery}`, async () => {
    await productsPage.searchProduct(searchQuery);
  });

  await test.step('THEN: Verifies that relevant search results are displayed', async () => {
    await productsPage.assertSearchResultsMatchQuery(searchQuery);
  });

  await test.step('WHEN: Clicks on a product and add it to the cart', async () => {
    const productItem = await productsPage.getProductDetails(itemIndex);
    productDetails = { name: productItem.name, price: productItem.price };
    await productsPage.addProductToCart(itemIndex);
  });

  await test.step('THEN: Goes to cart and validate the item details', async () => {
    await cartPage.open();
    const cartItemDetails = await cartPage.getCartItemDetails(itemIndex);

    expect.soft(cartItemDetails.name).toBe(productDetails.name);
    expect.soft(cartItemDetails.price).toBe(productDetails.price);
    expect.soft(cartItemDetails.quantity).toBe('1');
    expect.soft(cartItemDetails.total).toBe(productDetails.price);
  });
});
