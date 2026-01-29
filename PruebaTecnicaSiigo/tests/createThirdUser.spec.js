const { test } = require('@playwright/test');
const LoginPage = require('../pages/login/LoginPage');
const HomePage = require('../pages/home/HomePage');
const UserProfilePage = require('../pages/user-profile/UserProfilePage');
const CreateThirdUserPage = require('../pages/create-third/CreateThirdUserPage');
const { createThirdUserData } = require('../helpers/utils/fakerUserData');


test.beforeEach(async ({page})=>{
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigate('/');
    await loginPage.login('retoautomationsiigo2@yopmail.com','J1h4{zMTV3');
    await homePage.validateTitle('RA S.A.S ');
    await homePage.accesClientThird();
});

test('Crear un tercero con más de un teléfono, datos de facturación y envió, datos bancarios y contacto', async ({ page }) => {
    const userProfilePage = new UserProfilePage(page);
    const createThirdUserPage = new CreateThirdUserPage(page);
    const userData = createThirdUserData();

    await createThirdUserPage.dataBasicSectionPage.enterBasicDataPerson(userData.identification,userData.dv,userData.codeBranch,userData.firstName,userData.lastName,userData.businessName,userData.address);
    await createThirdUserPage.dataBasicSectionPage.enterPrincipalPhone(userData.phoneIndicative,userData.phoneNumber,userData.phoneExtention);
    await createThirdUserPage.dataBasicSectionPage.enterSecondPhone(userData.secondPhoneIndicative,userData.secondPhone,userData.secondPhoneExtention);
    await createThirdUserPage.billingShippingSectionPage.enterBillingShipping(userData.billingEmail,userData.billingIndicative,userData.billingPhone,userData.billingRegime,userData.billingPostalCode);
    await createThirdUserPage.bankDetailsSectionPage.selectBanksDetail();
    await createThirdUserPage.bankDetailsSectionPage.enterBanksDetail(userData.bankTitularName,userData.typeID,userData.bankTitularId,userData.bankName,userData.accountType,userData.accountNumber);
    await createThirdUserPage.contactSectionPage.selectContactSection();
    await createThirdUserPage.contactSectionPage.enterContactData(userData.contactName,userData.contactLastName,userData.contactEmail,userData.contactJob,userData.contactIndicative,userData.contactPhone);

    await createThirdUserPage.selectSave();

    const name = await userProfilePage.getNameUserProfile();
    const id = await userProfilePage.getIDUserProfile();
    await userProfilePage.validateTitle();
    await userProfilePage.validateNameUserProfile(name);
    await userProfilePage.validateIDUserProfile(id);
    await userProfilePage.validateActiveState();

    //validacion datos basicos
    const typeBasicData = await userProfilePage.getTypeBasicData();
    const idBasicData = await userProfilePage.getIDBasicData();
    const nameBasicData = await userProfilePage.getNameBasicData();
    const lastnameBasicData = await userProfilePage.getLastnameBasicData();
    await userProfilePage.validateBasicDataSection(typeBasicData,idBasicData,nameBasicData,lastnameBasicData);

    //validacion facturacion y entrega
    const emailBillingData = await userProfilePage.getEmailBllingData();
    const regimenBillingData = await userProfilePage.getRegimeBillingData();
    await userProfilePage.validateBillingDataSection(emailBillingData,regimenBillingData);

    //validacion datos bancarios
    const idTitulatBankData = await userProfilePage.getIDTitulatBankData();
    const bankTitulatData = await userProfilePage.getBankTitulatData();
    const accountNumberBankData = await userProfilePage.getNumberAccountBankData();
    await userProfilePage.validateBankDataSection(idTitulatBankData,bankTitulatData,accountNumberBankData);

    //validacion contactos
    const emailContactData = await userProfilePage.getEmailContactData();
    const phoneContactData = await userProfilePage.getPhoneContactData();
    await userProfilePage.validateContactDataSection(emailContactData,phoneContactData);

    await userProfilePage.screenshot();
});