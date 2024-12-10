# Automation Practice Test Plan

## Description:

The objective of this project is to showcase the test process for [http//www.automationpractice.com](http://www.automationpractice.pl/)

## Testing Process:

1. Create an account on the application
2. Do exploratory testing / use the application as an user would
3. Divide the app into different buckets of functionality
4. Prioritize buckets of functionality depending on risk
5. Create User Stories for each of the buckets of functionality
6. Create Test Cases for each of the User Stories
7. Create detailed test cases in a spreadsheet
8. Create automated test scripts from detailed test cases (only high prio)

### 3. Divide the app into different buckets of functionality:

#### The following buckets of functionality have been indentified:

- Main Page
- Authentication
- My Account
- Contact Us
- Search
- Catalogue
- Shopping Cart
- Product Detail Page(PDP)
- Checkout
- Subscribe
- Footer

### 4. Prioritize buckets of functionality depening on risk:

_High prio_

- Checkout
- Shopping Cart
- Product Detail Page(PDP)
- Authentication
- Catalogue
- Search

_Low prio_

- My Account
- Contact Us
- Subscribe
- Main Page
- Footer

### 4. Create User Stories for each of the buckets of functionality:

Each bucket of functionality will be made of a _Description_ where the specific functionality is described, followed by _User Stories_ of such functinality.

These in turn are compromised of at least as many _Test Cases_ derived from them.

In the wiki lists these test case names can be found beneath the user story they belong to.

Each test case name will represent a _test case in a spreadsheet_(complete with test data, test steps and expected and actual resutls) AND a _test script in a test suit_(complete with test data, automated test steps and test assertions).

Buckets of functionality can then be broken down the following way:

- Bucket of functionality:

  - User Stories:

    - Test cases (spreadsheet):

      - Test data
      - Test steps
      - Expected and actual results

    - Test scripts (code):
      - Test data
      - Automated test steps
      - Automated test assertions

You can click on the links below. Each bucket of functionality will link to their own wiki page, where their description, user stories and test case names are displayed. At the bottom of each wiki page there are links to both the spreadsheet test cases and the test scripts representing them.

_High Prio Buckets_

- [Checkout](https://github.com/manuel12/automation-practice/wiki/Checkout):

  - [Shopping Cart](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---shopping-cart-summary)
  - [Sign In](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---sign-in)
  - [Address](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---address)
  - [Shipping](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---shipping)
  - [Payment](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---payment)

- [Shopping Cart](https://github.com/manuel12/automation-practice/wiki/Shopping-Cart)

- [Product Detail Page](<https://github.com/manuel12/automation-practice/wiki/Product-Detail-Page-(PDP)>)

- [Authentication](https://github.com/manuel12/automation-practice/wiki/Authentication)

- [Catalogue](https://github.com/manuel12/automation-practice/wiki/Catalogue)

- [Search](https://github.com/manuel12/automation-practice/wiki/Search)

_Low Prio Buckets_

- [My Account](https://github.com/manuel12/automation-practice/wiki/-Account)

- [Contact Us](https://github.com/manuel12/automation-practice/wiki/Contact-Us)

- [Subscribe](https://github.com/manuel12/automation-practice/wiki/Subscribe)

- [Main Page](https://github.com/manuel12/automation-practice/wiki/Main-Page)

- [Footer](https://github.com/manuel12/automation-practice/wiki/Footer)
