import { faker } from '@faker-js/faker';
import { UserCredentials } from '../types/users';
import { SignupFormData } from '../types/formData';
import { Country } from '../enums/formData';

export function generateUser(): UserCredentials {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const username = `${firstName}_${lastName}`.toLowerCase().replace(/\s/g, '');

  const email = faker.internet.email({ firstName, lastName }).toLowerCase();

  return { username, email };
}

export function generateSignUpFormData(
  overrides: Partial<SignupFormData> = {},
): SignupFormData {
  const countries: Country[] = Object.values(Country);

  const data: SignupFormData = {
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    country: faker.helpers.arrayElement(countries),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number({ style: 'human' }),
    ...overrides,
  };

  return data;
}
