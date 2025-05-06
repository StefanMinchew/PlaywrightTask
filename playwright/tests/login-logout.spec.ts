import { expect, test } from '../fixtures/base.fixture';
import { handleCookieConsent } from '../utils/cookieConsentHandler';
import { resetStorageState } from '../utils/login';

resetStorageState();

test('Test Login and Logout Functionality', async ({
  homePage,
  loginPage,
  header,
}) => {
  const email = process.env.USER_EMAIL!;
  const username = email.match(/^([^@]+)/)?.[1];

  await test.step('GIVEN: John navigates to the website', async () => {
    await handleCookieConsent(homePage.page);
    await homePage.open();
  });

  await test.step('WHEN: He clicks on the Signup / Login link', async () => {
    await header.clickSignupLogin();
  });

  await test.step('AND: Enter valid login credentials', async () => {
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
  });

  await test.step('THEN: Verifies the user is logged in successfully', async () => {
    await expect(header.logoutLink).toBeVisible();
    await expect(
      homePage.page.getByText(`Logged in as ${username}`),
    ).toBeVisible();
  });

  await test.step('WHEN: Logouts by clicking on the logout button', async () => {
    await header.clickLogout();
  });

  await test.step('THEN: Verifies the user is logged out successfully', async () => {
    await expect(header.signupLoginLink).toBeVisible();
    await expect(
      homePage.page.getByText(`Logged in as ${username}`),
    ).not.toBeVisible();
  });
});
