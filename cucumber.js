module.exports = {
  default: {
    paths: ["features/**/*.feature"],

    require: [
      "step-definitions/**/*.steps.js",
      "support/**/*.js"
    ],

    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber.json"
    ]
  }
};