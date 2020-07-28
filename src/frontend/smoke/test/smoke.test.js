const puppeteer = require('puppeteer');
const assert = require('assert');
const {config} = require('../../../../package.json');

const {devServer = {}} = config;
const {host, port} = devServer;

let browser;
let page;
// Will run browser's UI, easy to debug.
const debug = false;

describe('Main web-site, smoke test.', () => {
  before(async () => {
    browser = await puppeteer.launch({
      headless: !debug,
      devtools: debug,
    });
    page = await browser.newPage();
  });

  it('Should run web-site.', async () => {
    await page.goto(`https://${host}:${port}`, {
      waitUntil: 'networkidle0',
    });

    const result = await page.$('#app > ul');

    console.log('results', result.length);
  });

  after(async () => {
    await browser.close();
  });
});
