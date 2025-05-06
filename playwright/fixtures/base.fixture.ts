import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.page';
import { HeaderComponent } from '../components/Header.component';
import { LoginPage } from '../pages/LoginPage.page';
import { CartPage } from '../pages/CartPage.page';
import { SignUpPage } from '../pages/SignupPage.page';
import { AccountCreatedPage } from '../pages/AccountCreatedPage.page';
import { ProductsPage } from '../pages/ProductsPage.page';

type MyFixtures = {
  homePage: HomePage;
  signUpPage: SignUpPage;
  loginPage: LoginPage;
  cartPage: CartPage;
  header: HeaderComponent;
  accountCreatedPage: AccountCreatedPage;
  productsPage: ProductsPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect } from '@playwright/test';
