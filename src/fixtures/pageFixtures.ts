import { test as base } from "@playwright/test";
import { FormPage } from "../pages/formPageObject";
import { TablesPage } from "../pages/tablePageObject";

export type PageObjects = {
  formPage: FormPage;
  tablesPage: TablesPage;
};

export const test = base.extend<PageObjects>({
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },

  tablesPage: async ({ page }, use) => {
    const tablesPage = new TablesPage(page);
    await use(tablesPage);
  },
});
  
export { expect, Page, Locator, Response, BrowserContext } from "@playwright/test";