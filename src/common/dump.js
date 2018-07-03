import faker from 'faker';

export const fakerStudent = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  gender: 'male',
  birthday: faker.date.past(),
  email: faker.internet.email(),
  telephone: faker.phone.phoneNumber(),
  subjects: [ "5b3a4a6e8b459304f861affa"]
};

export const fakerSubject = {
  name: faker.name.jobTitle(),
  teachers: ["5b3a45b0138a9a03ce3d6e7e"],
};

export const fakerTeacher = {
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  gender: 'male',
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
};
