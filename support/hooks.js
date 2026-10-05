const {
  Before,
  After,
  Status,
  setDefaultTimeout
} = require("@cucumber/cucumber");

const { request } = require("playwright");

const environments = require("../config/environments");
const { launchBrowser } = require("./browser");

// Cucumber step timeout
setDefaultTimeout(30 * 1000);

Before(async function ({ pickle }) {

  this.apiContext = await request.newContext({
    baseURL: environments.apiBaseUrl,
    extraHTTPHeaders: {
      Accept: "application/json"
    },
    timeout: 30 * 1000
  });

  if (pickle.tags.some((tag) => tag.name === "@ui")) {

    this.browser = await launchBrowser();

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

    this.page.setDefaultTimeout(30 * 1000);
  }
});

After(async function ({ result }) {

  try {

    if (result?.status === Status.FAILED && this.page) {

      await this.attach(
        await this.page.screenshot({ fullPage: true }),
        "image/png"
      );
    }

  } finally {

    await this.apiContext?.dispose();
    await this.context?.close();
    await this.browser?.close();

  }
});