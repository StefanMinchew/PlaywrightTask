import { Paths } from '../enums/paths';
import { expect, test } from '../fixtures/base.fixture';
import { handleCookieConsent } from '../utils/cookieConsentHandler';
import { generateSignUpFormData, generateUser } from '../utils/generateData';
import { resetStorageState } from '../utils/login';

resetStorageState();

test('Validate User Registration Process', async ({
  homePage,
  signUpPage,
  loginPage,
  accountCreatedPage,
  header,
}) => {
  const user = generateUser();
  const signUpFormRequiredOnlyData = generateSignUpFormData();

  await test.step('GIVEN: John navigates to the website', async () => {
    await handleCookieConsent(homePage.page);
    await homePage.open();
  });

  await test.step('WHEN: He clicks on the Signup / Login link', async () => {
    await header.clickSignupLogin();
  });

  await test.step('AND: Enters a new email address and a name in the registration form and signs', async () => {
    await loginPage.signup(user.username, user.email);
  });

  await test.step('AND: Fills in all required fields in the registration form', async () => {
    await Promise.all([
      signUpPage.page.waitForResponse(
        (response) =>
          response.url().includes('/account_created') &&
          response.status() === 200,
      ),
      signUpPage.fillSignUpForm(signUpFormRequiredOnlyData),
    ]);
  });

  await test.step('THEN: The the account is created successfully', async () => {
    await expect(accountCreatedPage.page).toHaveURL(
      `${process.env.BASE_URL}${Paths.Account_created}`,
    );
    await expect(accountCreatedPage.accountCreatedMessage).toHaveText(
      'Account Created!',
    );
  });
});
