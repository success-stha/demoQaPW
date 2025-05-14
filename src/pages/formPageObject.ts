import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FormPage extends BasePage {
  readonly formHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.formHeader = page.locator(`//h1(text()='Web Tables')`);
  }
}
