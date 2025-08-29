import {test, expect} from '@playwright/test'
import {fa, faker} from '@faker-js/faker'
import { NavigateTo } from '../../pageobjects/navigate/NavigateTo';
import { ProductManagment } from '../../pageobjects/car-shop/ProductManagment';
import { ViewCar } from '../../pageobjects/car-shop/ViewCar';
import { CheckoutShop } from '../../pageobjects/car-shop/CheckoutShop';
import { checkPrime } from 'crypto';
import { SummaryShop } from '../../pageobjects/car-shop/SummaryShop';

test('shopping-car', async({page}) => {

    const navigateTo = new NavigateTo(page);
    const productManagment = new ProductManagment(page);
    const viewCar = new ViewCar(page);
    const checkoutShop = new CheckoutShop(page);
    const summaryShop = new SummaryShop(page);
    const expCart = '12/12';

    navigateTo.loginPageCarShop();

    for(let i=0;i<3;i++){
        await productManagment.selectAddProductOne();
    }
    await productManagment.selectAddProductTwo();
    await productManagment.selectAddProductThree();
    await productManagment.selectViewCar();

    expect(await viewCar.textQuantityProductOne()).toEqual('3');
    expect(await viewCar.textQuantityProductTwo()).toEqual('1');
    expect(await viewCar.textQuantityProductThree()).toEqual('1');

    await viewCar.selectCheckOut();

    await checkoutShop.enterPersonalInformation(faker.person.fullName(),faker.internet.email(),faker.location.streetAddress());
    await checkoutShop.selectPaumentInformation();
    await checkoutShop.enterPaymentInformation(faker.finance.creditCardNumber(),expCart,faker.finance.creditCardCVV())

    await checkoutShop.selectPayment();

    expect(await summaryShop.textPaymentConfirmation()).toEqual('¡Tu compra fue exitosa!');
    await page.pause();

});