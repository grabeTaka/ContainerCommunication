import { faker } from '@faker-js/faker';

export const userPayloadMock = {
    name: faker.person.fullName(),
    email:  faker.internet.email(),
    address:  faker.location.streetAddress(),
    coordinates: [faker.location.latitude(), faker.location.longitude()],
};

export const userPayloadMockCreate = {
    name: faker.person.fullName(),
    email:  faker.internet.email(),
    address:  faker.location.streetAddress()
};