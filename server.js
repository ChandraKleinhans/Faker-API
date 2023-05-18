const express = require("express");
const faker = require("@faker-js/faker");
const app = express();
const PORT = 8000;

// --- MIDDLEWARE ---
//make sure these lines are above any app.get or app.post code blocks
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CLASS DEFINITIONS
// User
const createUser = () => {
  const newUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
  };
  return newUser;
};

// Company
const createCompany = () => {
  const newCompany = {
    name: faker.company.companyName(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country()
    }
  };
  return newCompany;
}

//GET NEW USER
app.get("/api/users/new", (request, response) => {
  response.json({ user: createUser() });
});

//GET NEW COMPANY
app.get("/api/companies/new", (request, response) => {
  response.json({ company: createCompany() });
});

//GET COMPANY/USER
app.get("/api/user/company", (request, response) => {
  response.json({
    user: createUser(),
    company: createUser()
  });
});

const server = app.listen(8000, () =>
  console.log(`Server is locked and loaded on port ${server.address().port}!`)
);