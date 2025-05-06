import { STORAGE_STATE_E2E } from '../playwright.config';
import { test } from '../playwright/fixtures/base.fixture';
import * as fs from 'fs';

const loginData = [{ file: STORAGE_STATE_E2E }];
for (const { file } of loginData) {
  const threshold = 10 * 60 * 1000;
  const minutes = threshold / 60000;

  try {
    const stats = fs.existsSync(file) ? fs.statSync(file) : null;
    //If storagestate exists and is created less than threshold minutes ago, then skip login
    if (stats && stats.mtimeMs > new Date().getTime() - threshold) {
      // eslint-disable-next-line no-console
      console.log(
        `GlobalSetup: Storage State time < than ${minutes} minutes, skiping Login`,
      );
    } else {
      // eslint-disable-next-line no-console
      console.log('GlobalSetup: Performing login');

      test('Login', async ({ loginPage }) => {
        await loginPage.loginGlobalSetup();
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error checking file stats or performing login:', error);
    throw error;
  }
}
