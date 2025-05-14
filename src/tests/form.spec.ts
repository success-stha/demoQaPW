import { test, expect } from '../fixtures/pageFixtures';
import pageUrls from '../utils/pageUrls';

test.describe('Form Tests', () => {

  test.beforeEach(async ({ page ,formPage}) => {
    console.log(pageUrls.formPage);
    await page.goto(pageUrls.formPage);    
  })
  

  test('Verify form page has title', async ({ page , formPage}) => {
    await expect(page).toHaveTitle('DEMOQA');
});

})


