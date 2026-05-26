const { test, expect } = require('@playwright/test');

test.describe('Porsche Cockpit Portfolio E2E Engineering Suite', () => {
    
    test.beforeEach(async ({ page }) => {
        // Since we are running local tests, we point to the local server or index.html
        // Playwright test runs typically serve the project locally.
        await page.goto('/');
    });

    // 1. DOM Integrity, Porsche Theme, and Assets Checks
    test('1. Should load structural DOM elements and enforce Porsche Acid Green theme variables', async ({ page }) => {
        // Assert page title contains Abhyudaya Sinha
        await expect(page).toHaveTitle(/Abhyudaya Sinha/);
        
        // Assert theme attribute is set to acid (Acid Green theme lock)
        const htmlTheme = await page.getAttribute('html', 'data-theme');
        expect(htmlTheme).toBe('acid');
        
        // Assert critical sections exist
        await expect(page.locator('#home')).toBeVisible();
        await expect(page.locator('#about')).toBeVisible();
        await expect(page.locator('#skills')).toBeVisible();
        await expect(page.locator('#projects')).toBeVisible();
        await expect(page.locator('#recruiter-cockpit')).toBeVisible();
        await expect(page.locator('#contact')).toBeVisible();
    });

    // 2. Lenis Smooth Scroll Navigation and Anchor Offsets
    test('2. Should smoothly navigate to anchors via header nav links', async ({ page }) => {
        // Verify anchor link clicks trigger correct page location offsets
        const skillsLink = page.locator('nav a[href="#skills"]');
        await expect(skillsLink).toBeVisible();
        await skillsLink.click();
        
        // Wait for smooth scroll movement
        await page.waitForTimeout(1000);
        
        // Verify that the viewport has scrolled past the hero section (scrollY > 0)
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeGreaterThan(0);
    });

    // 3. Interactive Fleet Category Filter Transitions
    test('3. Should filter Fleet projects grid cleanly between Power BI and Tableau editions', async ({ page }) => {
        // Total project cards initially
        const totalCards = await page.locator('.project-card').count();
        expect(totalCards).toBeGreaterThan(0);
        
        // Click Power BI Edition filter
        const pbiFilterBtn = page.locator('button.filter-btn[data-filter="pbi"]');
        await expect(pbiFilterBtn).toBeVisible();
        await pbiFilterBtn.click();
        await page.waitForTimeout(600); // Wait for GSAP transitions
        
        // Assert Tableau cards are hidden or have opacity 0/display none
        const tableauCard = page.locator('#projHospital');
        const tableauDisplay = await tableauCard.evaluate(el => getComputedStyle(el).display);
        expect(tableauDisplay).toBe('none');
        
        // Click Tableau Edition filter
        const tabFilterBtn = page.locator('button.filter-btn[data-filter="tab"]');
        await expect(tabFilterBtn).toBeVisible();
        await tabFilterBtn.click();
        await page.waitForTimeout(600); // Wait for GSAP transitions
        
        // Assert Power BI cards are hidden
        const pbiCard = page.locator('#projCovid');
        const pbiDisplay = await pbiCard.evaluate(el => getComputedStyle(el).display);
        expect(pbiDisplay).toBe('none');
    });

    // 4. Recruiter high-fidelity ATS print layout visibility matches
    test('4. Should maintain clean highlightable elements and verify printable ATS Resume structures', async ({ page }) => {
        // Assert high-access Mode Elements exist
        const copyTechBtn = page.locator('#copyTechBtn');
        await expect(copyTechBtn).toBeVisible();
        
        // Verify clipboard interactions
        await copyTechBtn.click();
        // Since clipboard permission may require special configuration in headless environments,
        // we can assert that the button UI updates to success state
        await expect(copyTechBtn).toContainText(/COPIED/);

        // Verify ATS Resume Paper contains crucial recruiter parseable text
        const resumePaper = page.locator('#atsResumePaper');
        await expect(resumePaper).toBeVisible();
        await expect(resumePaper).toContainText('ABHYUDAYA SINHA');
        await expect(resumePaper).toContainText('abhyudayasinha04@gmail.com');
        await expect(resumePaper).toContainText('Python');
        await expect(resumePaper).toContainText('SQL');
        await expect(resumePaper).toContainText('Tableau');
    });
});
