const { Before, After, Status } = require("@cucumber/cucumber");
const { request } = require("playwright");
const environments = require("../config/environments");
const { launchBrowser } = require("./browser");

Before(async function ({ pickle }) {
  this.apiContext = await request.newContext({
    baseURL: environments.apiBaseUrl,
    extraHTTPHeaders: { Accept: "application/json" },
    timeout: environments.timeout
  });

  if (pickle.tags.some((tag) => tag.name === "@ui")) {
    this.browser = await launchBrowser();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(environments.timeout);
  }
});

After(async function ({ result }) {
  try {
    if (result?.status === Status.FAILED && this.page) {
      await this.attach(await this.page.screenshot({ fullPage: true }), "image/png");
    }
  } finally {
    await this.apiContext?.dispose();
    await this.context?.close();
    await this.browser?.close();
  }
});
