import { test } from '@playwright/test';

export const resetStorageState = (): void => {
  test.use({ storageState: { cookies: [], origins: [] } });
};
