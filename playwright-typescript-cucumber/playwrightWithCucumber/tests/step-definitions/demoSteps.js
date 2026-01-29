import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import DemoPage from '/pages/DemoPage';

const demoPage = new DemoPage();

Given('the user navigate to demoQA page', async function () {
    await demoPage.navigate();
});

When('select elements opcion', async function () {
});

When('select textbox opcion', async function () {
});

Then('the user look title {string}', async function (title) {
});

