import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FormPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly mobileNumber: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectInput: Locator;
  readonly uploadPicture: Locator;
  readonly currentAddress: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly modalTitle: Locator;
  readonly closeModalButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#userEmail');
    this.mobileNumber = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectInput = page.locator('#subjectsInput');
    this.uploadPicture = page.locator('#uploadPicture');
    this.currentAddress = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitButton = page.locator('#submit');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
    this.closeModalButton = page.locator('#closeLargeModal');
  }

   genderRadio = (gender: string): Locator =>
    this.page.locator(`//label[contains(text(), "${gender}")]`);

  hobbiesCheckbox = (hobby: string): Locator =>
    this.page.locator(`//label[contains(text(), "${hobby}")]`);

  dropdownOption = (value: string): Locator =>
    this.page.locator(`//div[contains(@class,"option") and text()="${value}"]`);

  async fillBasicInfo(firstName: string, lastName: string, email: string, gender: string, mobile: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.genderRadio(gender).click();
    await this.mobileNumber.fill(mobile);
  }

  async setDateOfBirth(date: string) {
    await this.dateOfBirthInput.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.type(date);
    await this.page.keyboard.press('Enter');
  }

  async addSubject(subject: string) {
    await this.subjectInput.fill(subject);
    await this.page.waitForTimeout(800);
    await this.page.keyboard.press('Tab');
  }

  async selectHobby(hobby: string) {
    await this.hobbiesCheckbox(hobby).click();
  }

  async uploadFile(filePath: string) {
    await this.uploadPicture.setInputFiles(filePath);
  }

  async fillAddress(address: string) {
    await this.currentAddress.fill(address);
  }

  async selectStateAndCity(state: string, city: string) {
    await this.stateDropdown.click();
    await this.page.waitForTimeout(600);
    await this.dropdownOption(state).click({force:true});
    await this.cityDropdown.click();
    await this.page.waitForTimeout(600);
    await this.dropdownOption(city).click();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async closeModal() {
    await this.closeModalButton.click();
  }

  async isSubmissionSuccessful(): Promise<boolean> {
    return this.modalTitle.isVisible();
  }

  getHobbyCheckbox(hobby: string): Locator {
    return this.page.getByLabel(hobby, { exact: true });
  }

  async getFirstNameValue(): Promise<string> {
    return this.page.locator('#firstName').inputValue();
  }

}
