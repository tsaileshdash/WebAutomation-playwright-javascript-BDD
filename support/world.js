const { setWorldConstructor } = require("@cucumber/cucumber");

class CustomWorld {
  constructor({ attach, log }) {
    this.attach = attach;
    this.log = log;
    this.browser = undefined;
    this.context = undefined;
    this.page = undefined;
    this.apiContext = undefined;
    this.apiResponse = undefined;
    this.loginPage = undefined;
    this.dashboardPage = undefined;
    this.userApi = undefined;
  }
}

setWorldConstructor(CustomWorld);
