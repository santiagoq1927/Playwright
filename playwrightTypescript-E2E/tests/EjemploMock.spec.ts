import {test,expect} from '@playwright/test';

test('Hace mock de una fruta que no viene en el API real', async ({ page }) => {
    
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{name:'Melocoton', id:27}];
        await route.fulfill({json});
    })

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Melocoton')).toBeVisible();
});

test('Obtengo la respuesta real y le agrego algo no tan real', async ({ page }) => {
    
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({name: 'Duvan Vergara', id:200});
        await route.fulfill({response,json});
    })

    await page.goto('https://demo.playwright.dev/api-mocking');

    await expect(page.getByText('Duvan Vergara', {exact:true})).toBeVisible();
});