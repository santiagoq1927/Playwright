import {test, expect} from '@playwright/test'
import { Register } from '../../pageobjects/register/Register';
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';
import { SummaryRegister } from '../../pageobjects/register/SummaryRegister';

test('register', async({page}, testInfo) => {

    const register = new Register(page);
    const navigateTo = new NavigateTo(page);

    const name = 'Adrian';
    const lastName = 'Ramos';
    const age = '28';
    const country = 'Colombia';
    const email = 'ramos@gmail.com';
    const tittlePage = 'Summary'

    await navigateTo.loginPageRegister();
    await register.enterDatesRegister(name,lastName,age,country,email);
    await page.screenshot({path:'screenshots/register1.png', fullPage:true});

    const [summaryPage] = await Promise.all(
        [
            page.waitForEvent('popup'),
            register.sleectSaveRegister()
        ]
    )

    const summaryRegister = new SummaryRegister(summaryPage);
    await summaryPage.waitForLoadState();
    await expect(summaryPage).toHaveTitle(tittlePage);
        
    expect(await summaryRegister.textActualName()).toContain(name); 
    expect(await summaryRegister.textActualLastaName()).toContain(lastName);
    expect(await summaryRegister.textActualAge()).toContain(age);

    await summaryPage.screenshot({path:'screenshots/register2.png',fullPage:true});
    await page.pause();

});
