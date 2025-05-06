# 🛠 Playwright Testing Framework with Allure Reporting using GitHub Actions for CI/CD.

This repository contains an automated Playwright testing setup integrated with **Allure Reporting**, using **GitHub Actions** for CI/CD. The setup includes parallel test execution, result merging, and a final generated Allure report.

The project is structured to provide a clean and efficient testing environment with configurations for linting, formatting, and pre-commit hooks to ensure clean code. It supports **TypeScript**, and includes necessary configurations for **ESLint**, **Prettier**, and **Husky** for pre-commit checks.

---

## 📌 Features

- ✅ **Parallel Test Execution** with Playwright’s shard support for faster test runs
- ✅ **CI/CD Integration** via **GitHub Actions**, automatically running tests on push and pull requests
- ✅ **Allure Reporting** for detailed and interactive test reports
- ✅ **Storage State Reuse** for faster test execution by saving and loading browser session state
- ✅ **Configurable via `.env`** for environment-specific settings (e.g., base URLs, credentials)
- ✅ **ESLint** integrated for maintaining consistent code style and preventing errors
- ✅ **Prettier** used for code formatting to ensure readable and clean code
- ✅ **Husky** pre-commit hooks to run linting and formatting checks before code is committed

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/StefanMinchew/PlaywrightTask.git
```

### 2️⃣ Install Dependencies

```sh
npm install
npx playwright install --with-deps
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root folder with the following content:

```ini

BASE_URL=URL

USER_EMAIL=username
USER_PASSWORD=password

```

---

## 📁 Project Structure

```
├── .github/
│   ├── workflows/
│   │   ├── run-tests.yaml                  # Run Playwright tests and upload results
├── husky/                                  # Husky configuration
├── playwright/
│   ├── components/                       
│   │   ├── Header.component.ts             # Header component methods and properties
│   ├── enums/                            
│   │   ├── formData.ts                     # Form data enums
│   │   ├── paths.ts                        # URL enums
│   ├── fixtures/                             
│   │   ├── base.fixutre.ts                 # Streamline and centralize the creation and management of page objects
│   ├── pages/    
│   │   ├── AccountCreatedPage.page.ts      # Account created page methods and properties                        
│   │   ├── Base.page.ts                    # Common page methods and properties
│   │   ├── Cart.page.ts                    # Cart page methods and properties
│   │   ├── HomePage.page.ts                # Home page methods and properties
│   │   ├── Login.page.ts                   # Login page methods and properties
│   │   ├── ProductsPage.page.ts            # Products page methods and properties
│   │   ├── SignupPage.page.ts              # Signup page methods and properties
│   ├── tests/                            
│   │   ├── login-logout.spec.ts            # Test Login and Logout Functionality
│   │   ├── registration.spec.ts            # Validate User Registration Process
│   │   ├── search-and-add-product.spec.ts  # Search and Add a Product to Cart
│   ├── types/                           
│   │   ├── formData.ts                     # Form data types and interfaces
│   │   ├── item.ts                         # Item types and interfaces
│   │   ├── users.ts                        # Users types and interfaces
│   ├── utils/                            
│   │   ├── cookieConsentHandler.ts         # Cookie consent utils
│   │   ├── generateData.ts                 # Generate data utils
│   │   ├── login.ts                        # Login utils
│   ├── login.setup.ts                      # Login setup
│── .env.example                            # Example environment variables
├── .prettierrc                             # Prettier configuration
├── .eslint.config.mjs                      # ESLint configuration
├── package.json                            # Project dependencies and scripts
├── playwright.config.ts                    # Playwright configuration
├── README.md                               # Project documentation
└── tsconfig.json                           # TypeScript configuration
```

---

## 🛠 Running Tests

To run the tests, use any of the scripts set in `package.json` or run:

```sh
npx playwright test
```

---

## 📂 Prettier Configuration (`.prettierrc`)

```ts
{
  "singleQuote": true,
  "trailingComma": "all",
  "semi": true,
  "arrowParens": "always",
  "printWidth": 80
}
```

---

## 📂 ESLint Configuration (`eslint.config.mjs`)

```ts
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    ignores: [
      'node_modules/',
      'playwright-report/',
      '.env',
      'README.md',
      '.husky/',
      '.github',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
  },
  tseslint.configs.recommended,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'no-console': ['warn', 'always'],
      'eqeqeq': ['warn', 'always'],
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn', 'always'],
      '@typescript-eslint/no-explicit-any': ['warn', 'always'],
      'prettier/prettier': 'error',
    },
  },
]);

```

---

## 📋 Page Object Model (POM)
The tests in the project follow the Page Object Model (POM) design pattern. This helps separate test logic from page-specific actions and selectors, making tests more maintainable.

```ts
Example: LoginPage.page.ts
const username = process.env.USER_EMAIL!;
const password = process.env.USER_PASSWORD!;

export class LoginPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page, Paths.Login);

    this.loginEmailInput = this.page.getByTestId('login-email');
    this.loginPasswordInput = this.page.getByTestId('login-password');
    this.loginButton = this.page.getByTestId('login-button');
    this.signupNameInput = this.page.getByTestId('signup-name');
    this.signupEmailInput = this.page.getByTestId('signup-email');
    this.signupButton = this.page.getByTestId('signup-button');
  }

  async loginGlobalSetup(): Promise<void> {
    await handleCookieConsent(this.page);
    await this.open();
    // eslint-disable-next-line no-console
    console.log('GlobalSetup: Performing UI login');
    await this.login(username, password);
    await this.page.context().storageState({ path: STORAGE_STATE_E2E });
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}

```

---

## 📂 Viewing Allure Reports from GitHub Actions Locally
After downloading the allure-results.zip artifact from GitHub Actions, you can view a full interactive Allure HTML report locally.

🕛 Steps

Unzip the allure-results.zip file into a convenient folder, for example:
C:\Users\<your_name>\Downloads\allure-results

Open Terminal (CMD or PowerShell) and run the following commands:
allure generate C:\Users\<your_name>\Downloads\allure-results --clean -o C:\Users\<your_name>\Downloads\allure-report
allure open C:\Users\<your_name>\Downloads\allure-report

Your browser will open automatically and display the beautiful Allure HTML report 🎉

```