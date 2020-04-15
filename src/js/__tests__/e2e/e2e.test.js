import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

describe('validator form', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });
  test('should add .valid class for valid card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.validator_form');
    const input = await form.$('.validator_input');
    await input.type('371449635398431');
    const submit = await form.$('.validator_btn');
    submit.click();
    await page.waitForSelector('.valid');
  });
  test('should add .invalid class for invalid card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.validator_form');
    const input = await form.$('.validator_input');
    await input.type('364592364859234');
    const submit = await form.$('.validator_btn');
    submit.click();
    await page.waitForSelector('.invalid');
  });
});
