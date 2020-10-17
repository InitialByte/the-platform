const puppeteer = require('puppeteer');
const assert = require('assert');
const {expect} = require('chai');
const package = require('../../../../package.json');

const {config} = package;
const {devServer = {}} = config;
const {host, port} = devServer;

let browser;
let page;
// Will run browser's UI, easy to debug.
const debug = false;

describe('Main web-site, smoke test.', () => {
  before(async () => {
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      headless: !debug,
      devtools: debug,
    });
    page = await browser.newPage();
  });

  it('Should run web-site.', async () => {
    await page.goto(`https://${host}:${port}`, {
      waitUntil: 'networkidle0',
    });

    expect(await page.title()).to.contain('the_platform');
  });

  after(async () => {
    await browser.close();
  });
});
