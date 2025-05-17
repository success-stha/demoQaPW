# 📘 DemoQA Playwright Automation Project

This project contains automated test cases using **Playwright** for the [DemoQA](https://demoqa.com/) demo site. The project covers:

1. **Form Functionality** - UI tests on the Practice Form  
2. **Web Tables** - UI tests for performing CRUD operations  
3. **Books API** - API tests for book-related endpoints# 📘 DemoQA Playwright Automation Project


## Installation

1. **Clone the Repository**

2. **Install Dependencies** - npm install
   
3. **Install Playwright Browsers** - npx playwright install

## Run Tests

**All Tests**
npx playwright test

**Run a Specific Test File**
npx playwright test src/tests/form.spec.ts
npx playwright test src/tests/table.spec.ts
npx playwright test src/tests/bookapi.spec.ts
