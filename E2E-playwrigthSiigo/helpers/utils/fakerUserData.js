const { faker } = require('@faker-js/faker');

faker.locale = 'es';

function createThirdUserData() {
    return {
        identification: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
        dv: '1',
        codeBranch: faker.number.int({ min: 0, max: 9 }).toString(),

        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        businessName: faker.company.name(),

        address: faker.location.streetAddress(),
        email: faker.internet.email(),

        phoneIndicative: faker.number.int({ min: 10, max: 99 }).toString(),
        phoneNumber: faker.phone.number('3#########'),
        phoneExtention: faker.number.int({ min: 100, max: 999 }).toString(),

        secondPhoneIndicative: faker.number.int({ min: 10, max: 99 }).toString(),
        secondPhone: faker.phone.number('3#########'),
        secondPhoneExtention: faker.number.int({ min: 100, max: 999 }).toString(),

        billingEmail: faker.internet.email(),
        billingIndicative: faker.number.int({ min: 1, max: 99 }).toString(),
        billingPhone: '312254555',
        billingRegime: 2,
        billingPostalCode: faker.location.zipCode(),

        bankTitularName: faker.person.fullName(),
        typeID: 'Cédula de ciudadanía',
        bankTitularId: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
        bankName: 'BANCOLOMBIA',
        accountType: 'Ahorros',
        accountNumber: faker.finance.accountNumber(10),

        contactName: faker.person.firstName(),
        contactLastName: faker.person.lastName(),
        contactEmail: faker.internet.email(),
        contactJob: faker.person.jobTitle(),
        contactIndicative: faker.number.int({ min: 1, max: 99 }).toString(),
        contactPhone: '3112344234'
    };
}
module.exports = {createThirdUserData};