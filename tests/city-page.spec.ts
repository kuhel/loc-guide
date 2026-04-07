import { test, expect } from '@playwright/test';

test.describe('City page — Barcelona', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/barcelona');
  });

  // Page title
  test('page title contains city name', async ({ page }) => {
    await expect(page).toHaveTitle(/Barcelona/i);
  });

  // Hero
  test('hero section exists with id="top"', async ({ page }) => {
    await expect(page.locator('section#top.hero')).toBeVisible();
  });

  test('hero image is visible and uses city slug in src', async ({ page }) => {
    const img = page.locator('section#top img.hero-img');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('src', /barcelona/);
  });

  test('hero city name h1 is displayed', async ({ page }) => {
    const title = page.locator('section#top h1.hero-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Barcelona');
  });

  test('hero has branding text', async ({ page }) => {
    await expect(page.locator('.hero-branding-text')).toBeVisible();
  });

  // Intro section
  test('intro section exists below hero', async ({ page }) => {
    await expect(page.locator('section#intro')).toBeVisible();
  });

  test('intro text is in section#intro, not inside section#top', async ({ page }) => {
    await expect(page.locator('section#intro .intro-text')).toBeVisible();
    await expect(page.locator('section#top .intro-text')).not.toBeAttached();
  });

  // SpotGrid
  test('spot cards are rendered', async ({ page }) => {
    await page.waitForSelector('section#spots button');
    const cards = page.locator('section#spots button');
    await expect(cards.first()).toBeVisible();
  });

  test('spot card images have portrait dimensions in src', async ({ page }) => {
    await page.waitForSelector('section#spots button img');
    const img = page.locator('section#spots button img').first();
    await expect(img).toHaveAttribute('src', /400\/500/);
  });

  test('filter buttons are rendered', async ({ page }) => {
    await page.waitForSelector('section#spots button');
    // Find "All" filter button (not a spot card)
    const allBtn = page.locator('section#spots').getByRole('button', { name: /^all$/i });
    await expect(allBtn).toBeVisible();
  });

  // Modal
  test('clicking a spot card opens modal', async ({ page }) => {
    await page.waitForSelector('section#spots button img');
    await page.locator('section#spots button:has(img)').first().click();
    await expect(page.locator('[role="dialog"][aria-modal="true"]')).toBeVisible();
  });

  test('modal closes on Escape key', async ({ page }) => {
    await page.waitForSelector('section#spots button img');
    await page.locator('section#spots button:has(img)').first().click();
    const modal = page.locator('[role="dialog"][aria-modal="true"]');
    await expect(modal).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('modal has close button', async ({ page }) => {
    await page.waitForSelector('section#spots button img');
    await page.locator('section#spots button:has(img)').first().click();
    const modal = page.locator('[role="dialog"][aria-modal="true"]');
    await expect(modal).toBeVisible();
    const closeBtn = modal.locator('button[aria-label="Close"]');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  // StickyNav
  test('sticky nav is visible', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
  });

  test('sticky nav has 5 icon buttons', async ({ page }) => {
    await expect(page.locator('nav button[data-nav-id]')).toHaveCount(5);
  });

  test('nav button data-nav-id values are correct', async ({ page }) => {
    for (const id of ['top', 'intro', 'spots', 'itineraries', 'lexicon']) {
      await expect(page.locator(`nav button[data-nav-id="${id}"]`)).toBeAttached();
    }
  });

  test('nav buttons have aria-labels', async ({ page }) => {
    const topBtn = page.locator('nav button[data-nav-id="top"]');
    await expect(topBtn).toHaveAttribute('aria-label', /Back to Top/i);
    const lexBtn = page.locator('nav button[data-nav-id="lexicon"]');
    await expect(lexBtn).toHaveAttribute('aria-label', /Vernacular/i);
  });

  test('clicking nav spots button scrolls to spots section', async ({ page }) => {
    await page.locator('nav button[data-nav-id="spots"]').click();
    await page.waitForTimeout(800);
    await expect(page.locator('section#spots')).toBeInViewport();
  });

  // Lexicon
  test('lexicon section has 2-column layout', async ({ page }) => {
    await expect(page.locator('section#lexicon')).toBeVisible();
    await expect(page.locator('.lexicon-layout')).toBeVisible();
    await expect(page.locator('.lexicon-title')).toContainText('Vernacular');
    await expect(page.locator('.lexicon-list')).toBeVisible();
  });

  test('lexicon items render word, pronunciation, and meaning', async ({ page }) => {
    const firstItem = page.locator('.lexicon-item').first();
    await expect(firstItem.locator('.word')).toBeVisible();
    await expect(firstItem.locator('.pronunciation')).toBeVisible();
    await expect(firstItem.locator('.meaning')).toBeVisible();
  });

  // Footer
  test('"End of Transmission." text is present', async ({ page }) => {
    await expect(page.locator('.eot-text')).toBeVisible();
    await expect(page.locator('.eot-text')).toContainText('End of Transmission');
  });

  test('site footer is visible', async ({ page }) => {
    await expect(page.locator('footer.site-footer')).toBeVisible();
  });

  // Itinerary navigation
  test('itinerary card link navigates to itinerary page', async ({ page }) => {
    const card = page.locator('section#itineraries a').first();
    const href = await card.getAttribute('href');
    await card.click();
    await expect(page).toHaveURL(/\/barcelona\/itinerary\//);
    await expect(page.locator('.back-link')).toBeVisible();
  });
});

test.describe('City page — Istanbul', () => {
  test('istanbul page loads and shows city name in hero', async ({ page }) => {
    await page.goto('/istanbul');
    const title = page.locator('section#top h1.hero-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Istanbul');
  });
});
