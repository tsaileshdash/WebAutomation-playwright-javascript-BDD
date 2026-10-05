const { chromium } = require("playwright");

async function launchBrowser() {
  const headless = process.env.HEADLESS !== "false";
  return chromium.launch({ headless });
}

module.exports = { launchBrowser };
