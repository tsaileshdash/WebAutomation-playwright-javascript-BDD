const { When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");
const { apiData } = require("../../config/testData");
const UserApi = require("../../api/UserApi");
const { parseJson, assertStatus } = require("../../utils/apiUtils");
const logger = require("../../utils/logger");

When("I request the users list", async function () {
  this.userApi = new UserApi(this.apiContext);
  this.apiResponse = await this.userApi.getUsers();
});

Then("the users response should contain at least one user", async function () {
  assertStatus(this.apiResponse, 200);
  const users = await parseJson(this.apiResponse);
  assert.ok(Array.isArray(users) && users.length > 0, "Expected a non-empty users array");
  logger.info(`Retrieved ${users.length} users`);
});

When("I create a user using the test data", async function () {
  this.userApi = new UserApi(this.apiContext);
  this.apiResponse = await this.userApi.createUser(apiData.newUser);
});

Then("the user should be created successfully", async function () {
  assertStatus(this.apiResponse, 201);
  const createdUser = await parseJson(this.apiResponse);
  assert.equal(createdUser.name, apiData.newUser.name);
  assert.equal(createdUser.job, apiData.newUser.job);
  assert.ok(createdUser.id !== undefined, "Expected the created user to have an id");
});
