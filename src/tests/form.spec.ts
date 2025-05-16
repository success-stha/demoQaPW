import path from 'path';
import { test, expect } from '../fixtures/pageFixtures';
import pageUrls from '../utils/pageUrls';

test.describe('Form Tests', () => {

  test.beforeEach(async ({ page, formPage }) => {
    console.log('Navigating to the form page:', pageUrls.formPage);
    await page.goto(pageUrls.formPage);
  });

  test('Verify form page has title', async ({ page, formPage }) => {
    console.log('Checking page title');
    await expect(page).toHaveTitle('DEMOQA');
    console.log('Page title verified.');
  });

  test('Verify form submission functionality', async ({ page, formPage }) => {
    console.log('Filling basic info');
    await formPage.fillBasicInfo('Success', 'Shrestha', 'success.shrestha@example.com', 'Male', '9998887777');

    console.log('Setting DOB');
    await formPage.setDateOfBirth('10 Mar 1996');

    console.log('Adding subject');
    await formPage.addSubject('Maths');

    console.log('Selecting hobby');
    await formPage.selectHobby('Reading');

    console.log('Uploading file');
    const filePath = path.resolve(__dirname, '../resources/sample.jpg');
    await formPage.uploadFile(filePath);

    console.log('Filling address');
    await formPage.fillAddress('123 Main Street, New York');

    console.log('Selecting state and city');
    await formPage.selectStateAndCity('Rajasthan', 'Jaipur');

    console.log('Submitting form');
    await formPage.submitForm();

    console.log('Verifying success modal');
    await expect(formPage.modalTitle, 'Submission successful message should be displayed').toHaveText('Thanks for submitting the form');
    await formPage.closeModal();
    console.log('Form submitted and modal closed.');
  });

  test('Verify required fields validation blocks submission', async ({ formPage }) => {
    console.log('Submitting empty form to check validation');
    await formPage.submitForm();
    await expect(formPage.modalTitle, 'Form should not submit').not.toBeVisible();
    console.log('Validation check passed. Form was not submitted.');
  });

  test('Verify multiple hobbies selection', async ({ page, formPage }) => {
    console.log('Selecting multiple hobbies');
    await formPage.selectHobby('Reading');
    await formPage.selectHobby('Music');
    await page.waitForTimeout(500); // wait to ensure checkboxes reflect selection
    const readingCheckbox = await formPage.getHobbyCheckbox('Reading');
    const musicCheckbox = await formPage.getHobbyCheckbox('Music');
    await expect(readingCheckbox).toBeChecked();
    await expect(musicCheckbox).toBeChecked();
    console.log('Both hobbies verified as selected.');
  });

  test('Verify form submission with multiple subjects', async ({ formPage }) => {
    console.log('Filling form with multiple subjects');
    await formPage.fillBasicInfo('Success', 'Shrestha', 'success.shrestha@example.com', 'Male', '9998887777');
    await formPage.setDateOfBirth('10 Mar 1996');
    await formPage.addSubject('Maths');
    await formPage.addSubject('English');
    await formPage.selectHobby('Sports');

    const filePath = path.resolve(__dirname, '../resources/sample.jpg');
    await formPage.uploadFile(filePath);
    await formPage.fillAddress('Kathmandu');
    await formPage.selectStateAndCity('NCR', 'Delhi');
    await formPage.submitForm();

    console.log('Verifying modal');
    await expect(formPage.modalTitle,'Message should be shown').toHaveText('Thanks for submitting the form');
    await formPage.closeModal();
    console.log('Form submitted successfully with multiple subjects.');
  });

  test('Verify invalid email blocks form submission', async ({ formPage }) => {
    console.log('Filling form with invalid email');
    await formPage.fillBasicInfo('Jake', 'Peralta', 'not-an-email', 'Male', '9876543210');
    await formPage.submitForm();
    await expect(formPage.modalTitle, 'Form should not be submitted').not.toBeVisible();
    console.log('Invalid email correctly blocked form submission.');
  });

  test('Verify form resets on navigation', async ({ page, formPage }) => {
    console.log('Filling form and navigating away');
    await formPage.fillBasicInfo('Test', 'Test', 'test.user@example.com', 'Other', '1231231234');
    await page.goto(pageUrls.home);
    console.log('Navigated to home. Going back...');
    await page.goBack();

    const firstNameValue = await formPage.getFirstNameValue();
    console.log('First name after navigation:', firstNameValue);
    await expect(firstNameValue,'Form should reset').toBe('');
    console.log('Form reset verified after navigation.');
  });

});
