module.exports = {
  default: {
    paths: ["features/**/*.feature"],

    require: [
      "step-definitions/**/*.steps.js",
      "support/**/*.js"
    ],

    format: [
      "progress",
      "json:reports/cucumber.json"
    ]
  }
};