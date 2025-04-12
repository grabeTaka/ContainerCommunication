import { faker } from '@faker-js/faker';

export const userPayload = {
    name: faker.person.fullName(),
    email:  faker.internet.email(),
    address:  faker.location.streetAddress(),
    coordinates: [faker.location.latitude(), faker.location.longitude()],
};