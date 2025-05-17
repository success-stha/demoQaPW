import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class TablesPage extends BasePage {
  readonly addButton: Locator;
  readonly searchBox: Locator;
  readonly rows: Locator;
  readonly submitButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly ageInput: Locator;
  readonly salaryInput: Locator;
  readonly departmentInput: Locator;

  constructor(page: Page) {
    super(page);
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.searchBox = page.getByPlaceholder('Type to search');
    this.rows = page.locator('.rt-tbody .rt-tr-group');
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.getByPlaceholder('Age');
    this.salaryInput = page.getByPlaceholder('Salary');
    this.departmentInput = page.getByPlaceholder('Department');
  }

  async addNewRecord({ firstName, lastName, email, age, salary, department }) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
    await this.submitButton.click();
  }

  async editRow(index: number, newFirstName: string) {
    await this.rows.nth(index).getByTitle('Edit').click();
    await this.firstNameInput.fill(newFirstName);
    await this.submitButton.click();
  }

  async deleteRow(index: number) {
    await this.rows.nth(index).getByTitle('Delete').click();
  }

  async getRowText(index: number): Promise<string> {
    return this.rows.nth(index).innerText();
  }

  async search(value: string) {
    await this.searchBox.fill(value);
  }
}


