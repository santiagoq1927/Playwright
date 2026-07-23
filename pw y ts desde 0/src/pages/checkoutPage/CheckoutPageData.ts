import { faker } from '@faker-js/faker';

export class CheckoutPageData {
    get checkoutData() {
        return {
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode()
        };
    }
}