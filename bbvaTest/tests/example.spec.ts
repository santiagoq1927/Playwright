import { test, expect } from '@playwright/test';

import { ShadowRootUtils } from './Util/ShadowRootUtil';
import { HomePageElements } from './pageobjects/HomePageElements';
import { StartPageElements } from './pageobjects/StartPageElements';
import { MoreInformationPageElements } from './pageobjects/MoreInformationPageElements';


test('Interactuar con elementos dentro del Shadow DOM', async ({ page }) => {
  const shadowRootUtils = new ShadowRootUtils(page);
  

    await page.goto('https://qa-bbva-cells-files.s3.amazonaws.com/cells/apps/CO_CCOW_APP-ID-1017273_DSG/CuentaWebGlomo/release/3.13.0/cellsapp/web-qa/vulcanize/index.html');

    await shadowRootUtils.interactWithShadow('click',null,HomePageElements.firstShadow,HomePageElements.secondElementShadow,HomePageElements.btnMeInteresa);

    //start page

    await shadowRootUtils.interactWithShadow('sendkeys',"Carlos",StartPageElements.firstShadow, StartPageElements.inpName);
    await shadowRootUtils.interactWithShadow('sendkeys',"Gomez",StartPageElements.firstShadow, StartPageElements.inpFirstLastName);
    await shadowRootUtils.interactWithShadow('sendkeys',"Nieto",StartPageElements.firstShadow, StartPageElements.inpSecondLastName);
    await shadowRootUtils.interactWithShadow('scroll',null,StartPageElements.firstShadow, StartPageElements.inpBirthDate);
    await shadowRootUtils.interactWithShadow('sendkeys',"27/08/1990",StartPageElements.firstShadow, StartPageElements.inpBirthDate);
    await shadowRootUtils.interactWithShadow('scroll',null,StartPageElements.firstShadow, StartPageElements.inpCard);
    await shadowRootUtils.interactWithShadow('sendkeys',"1062783884",StartPageElements.firstShadow, StartPageElements.inpCard);
    await shadowRootUtils.interactWithShadow('scroll',null,StartPageElements.firstShadow, StartPageElements.inpExpCard);
    await shadowRootUtils.interactWithShadow('sendkeys',"02/01/2009",StartPageElements.firstShadow, StartPageElements.inpExpCard);
    await shadowRootUtils.interactWithShadow('scroll',null,StartPageElements.firstShadow, StartPageElements.inpPhone);
    await shadowRootUtils.interactWithShadow('sendkeys',"32256594166",StartPageElements.firstShadow, StartPageElements.inpPhone);
    await shadowRootUtils.interactWithShadow('scroll',null,StartPageElements.firstShadow, StartPageElements.inpEmail);
    await shadowRootUtils.interactWithShadow('sendkeys',"pruebas.bbva.calidad@gmail.com",StartPageElements.firstShadow, StartPageElements.inpEmail);
    await shadowRootUtils.interactWithShadow('clickjs',null,StartPageElements.firstShadow, StartPageElements.chkTyC);
    await shadowRootUtils.interactWithShadow('click',null,StartPageElements.firstShadow, StartPageElements.inpPhone);
    await shadowRootUtils.interactWithShadow('scroll',null,StartPageElements.firstShadow, StartPageElements.chkTyC);
    await shadowRootUtils.interactWithShadow('scroll',null,StartPageElements.firstShadow, StartPageElements.btnStart);
    await shadowRootUtils.interactWithShadow('click',null,StartPageElements.firstShadow, StartPageElements.btnStart);

    //need more information

    page.waitForSelector(MoreInformationPageElements.firstShadow);
    //await page.waitForSelector(MoreInformationPageElements.firstShadow, { state: 'visible' });
    //await page.waitForTimeout(100000);
    await shadowRootUtils.interactWithShadow('sendkeys',"123456",MoreInformationPageElements.firstShadow,MoreInformationPageElements.inpMonthly);
    await shadowRootUtils.interactWithShadow('click',null,MoreInformationPageElements.firstShadow,MoreInformationPageElements.btnSend);

    await page.pause();
});
