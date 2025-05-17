# 📘 DemoQA Playwright Automation Project

This project contains automated test cases using **Playwright** for the [DemoQA](https://demoqa.com/) demo site. The project covers:

1. **Form Functionality** - UI tests on the Practice Form  
2. **Web Tables** - UI tests for performing CRUD operations  
3. **Books API** - API tests for book-related endpoints# 📘 DemoQA Playwright Automation Project


## Installation

1. **Clone the Repository**

2. **Install Dependencies**
   <pre> npm install </pre>
   
4. **Install Playwright Browsers**
   <pre> npx playwright install </pre>

## Run Tests

**All Tests**
<pre> npx playwright test </pre>

**Run a Specific Test File**
<pre> npx playwright test src/tests/form.spec.ts </pre> 
<pre> npx playwright test src/tests/table.spec.ts </pre>  
<pre> npx playwright test src/tests/bookapi.spec.ts </pre>
