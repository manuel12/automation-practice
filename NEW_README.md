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

### 3. Create User Stories for each of the buckets of functionality:

#### Checkout:

_Checkout - Shopping Cart Summary:_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---shopping-cart-summary)
[(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=0#gid=0) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/checkout-shopping-cart.cy.js)

_Checkout - Sign In:_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---sign-in) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=915695272#gid=915695272)

_Checkout - Address:_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---address)
[(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=920336277#gid=920336277) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/checkout-address.cy.js)

_Checkout - Shipping:_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---shipping) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=2056914532#gid=2056914532) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/checkout-shipping.cy.js)

_Checkout - Payment:_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Checkout#checkout---payment) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=1952648824#gid=1952648824) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/checkout-payment.cy.js)

#### Shopping Cart:

_Shopping Cart - Dropdown List:_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Shopping-Cart) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=1537670328#gid=1537670328) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/shopping-cart-dropdown-list.cy.js)

#### Product Detail Page(PDP):

_Product Detail Page (PDP):_

[(See User Stories)](<https://github.com/manuel12/automation-practice/wiki/Product-Detail-Page-(PDP)>) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=369993529#gid=369993529) [(See test code)](<https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/product-detail-page-(PDP).cy.js>)

#### Authentication:

_Authentication - Login_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#login) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=664641807#gid=664641807) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-login.cy.js)

_Authentication - Register_

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)

#### Catalogue:

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)

#### Search:

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)

#### My Account:

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)

#### Contact Us:

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)

#### Subscribe:

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)

#### Main Page:

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)

#### Footer:

[(See User Stories)](https://github.com/manuel12/automation-practice/wiki/Authentication#register) [(See test cases)](https://docs.google.com/spreadsheets/d/1kpXr_fUrFI_Shkw83WUotIL5QqlGDOvn_Qg5z7SKuLU/edit?gid=618115181#gid=618115181) [(See test code)](https://github.com/manuel12/automation-practice/blob/master/cypress/e2e/automation-practice/auth-register.cy.js)
