import { test as base } from "@playwright/test";
import { FormPage } from "../pages/formPageObject";

export type PageObjects = {
    formPage: FormPage;
};
  
export const test = base.extend<PageObjects>({
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },
});
  
export { expect, Page, Locator, Response, BrowserContext } from "@playwright/test";