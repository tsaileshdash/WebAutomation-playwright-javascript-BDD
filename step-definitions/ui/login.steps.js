const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");
const { users } = require("../../config/testData");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");

Given("I am on the login page", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When("I log in as the standard user", async function () {
  await this.loginPage.login(users.standard);
});

Then("I should see the {string} dashboard", async function (title) {
  this.dashboardPage = new DashboardPage(this.page);
  assert.equal(await this.dashboardPage.title(), title);
});
