import { test, expect } from '../fixtures/pageFixtures';
import { TablesPage } from '../pages/tablePageObject';
import pageUrls from '../utils/pageUrls';

test.describe('Table Tests', () => {

  test.beforeEach(async ({ page }) => {
    console.log(`Navigating to Web Tables page: ${pageUrls.tablePage}`);
    await page.goto(pageUrls.tablePage);
  });

  test('Verify adding and displaying a new record', async ({tablesPage}) => {
    const newUser = {
      firstName: 'Success',
      lastName: 'Shrestha',
      email: 'success@it.com',
      age: '29',
      salary: '850000',
      department: 'IT',
    };

    console.log('Adding new record:', newUser);
    await tablesPage.addNewRecord(newUser);

    const rowText = await tablesPage.getRowText(3);
    console.log('Verifying added row text:', rowText);

    expect(rowText.includes(newUser.firstName), 'New record first name should be present in the row').toBe(true);
    expect(rowText.includes(newUser.email), 'New record email should be present in the row').toBe(true);
  });

  test('Verify editing an existing record', async ({tablesPage}) => {
    const newFirstName = 'EditedName';
    console.log(`Editing first name of row index 1 to: ${newFirstName}`);
    await tablesPage.editRow(1, newFirstName);

    const updatedRow = await tablesPage.getRowText(1);
    console.log('Updated row text:', updatedRow);

    expect(updatedRow.includes(newFirstName), 'Edited row should contain the new first name').toBe(true);
  });

  test('Verify deleting a record', async ({tablesPage}) => {
    const initialText = await tablesPage.getRowText(0);
    console.log('Initial first row text before deletion:', initialText);

    await tablesPage.deleteRow(0);
    const newText = await tablesPage.getRowText(0);
    console.log('First row text after deletion:', newText);

    expect(newText !== initialText, 'Row text after deletion should be different').toBe(true);
  });

  test('Verify searching for an existing record', async ({tablesPage}) => {
    const searchTerm = 'Cierra';
    console.log(`Searching for record with term: ${searchTerm}`);
    await tablesPage.search(searchTerm);

    const rowsCount = await tablesPage.rows.count();
    console.log(`Number of matching rows found: ${rowsCount}`);
    await expect(rowsCount, 'There should be at least one matching row').toBeGreaterThan(0);

    const resultText = await tablesPage.getRowText(0);
    console.log('First matching row text:', resultText);
    expect(resultText.includes(searchTerm), 'Search result should contain the search term').toBe(true);
  });

  test('Verify searching for a non-existing record shows no result', async ({ page, tablesPage}) => {
    const invalidSearch = 'NonExistentUserXYZ';
    console.log(`Searching for non-existent term: ${invalidSearch}`);
    await tablesPage.search(invalidSearch);

    const noRowsText = await page.getByText('No rows found');
    console.log('Verifying "No rows found" message is visible');
    await expect(noRowsText, '"No rows found" message should be visible').toBeVisible();
  });

});
