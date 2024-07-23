# Automation Practice - Cypress Tests

The Automation Exercise [website](http://www.automationpractice.pl/) is a full-fledged website built for automation practice purposes.

This project aims to complete all the tests cases in this readme file.

It implements all such tests cases using the Cypress testing framework. The test cases are outlined below.

# TEST CASE LIST

✅ = Automated Test Case implemented

- ✅ TC.01 Register User
- ✅ TC.02 Login User with correct email and password
- ✅ TC.03 Login User with incorrect email and password
- ✅ TC.04 Logout User
- ✅ TC.05 Register User with existing email
- ✅ TC.06 Contact Us Form
- ✅ TC.07 Verify All Products and product detail page
- ✅ TC.08 Search Product
- ✅ TC.09 Verify Subscription in home page
- ✅ TC.10 Verify Subscription in Cart page
- ✅ TC.11 Add Products in Cart
- ✅ TC.12 Verify Product quantity in Cart
- ✅ TC.13 Place Order: Login before Checkout
- ✅ TC.14 Remove Products From Cart
- ✅ TC.15 View Category Products
- ✅ TC.16 View & Cart Brand Products
- ✅ TC.17 Search Products and Verify Cart After Login

[(See test cases)](https://docs.google.com/spreadsheets/d/1vFFGPLw8oX3JjDEata74wquvOOXiplJdoiKZoYSFAQs) [(See test code)](cypress/e2e/automation-practice/automation-practice.cy.js)

## Installation - Cypress

For installing cypress cd to the project's root folder and run:

    npm install

## Running tests

For opening cypress client cd to the project's root folder and run:

    npx cypress open

## Features

 - Parsing and calculation of prices total in checkout
 - Test pyramid followed: 70/20/10
 - Boundary validation tests
 - Equivalence partitioning tests
 - React component tests
 - API tests
 - UI functional tests(mocked & stubbed)
 - End- to- end tests
 - Accessibility tests
 - Responsiveness test
 - Visual tests

## Uses

- Cypress
- Prettier
