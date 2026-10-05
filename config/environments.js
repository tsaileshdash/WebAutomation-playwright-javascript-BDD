const environments = {
  baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
  apiBaseUrl: process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com",
  timeout: Number(process.env.TEST_TIMEOUT || 10000)
};

if (!Number.isFinite(environments.timeout) || environments.timeout <= 0) {
  throw new Error("TEST_TIMEOUT must be a positive number of milliseconds");
}

module.exports = environments;
