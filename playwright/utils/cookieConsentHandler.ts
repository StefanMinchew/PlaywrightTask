import { expect, Page } from '@playwright/test';

export async function handleCookieConsent(page: Page): Promise<void> {
  await page.addLocatorHandler(
    page.getByRole('button', { name: 'Consent' }),
    async () => {
      await page.getByRole('button', { name: 'Consent' }).click();
      await expect(
        page.getByRole('button', { name: 'Consent' }),
      ).not.toBeVisible();
    },
  );
}
