import report from "multiple-cucumber-html-reporter";

report.generate({
  jsonDir: "./reports",
  reportPath: "./reports/cucumber-html-report",

  metadata: {
    browser: {
      name: "chromium",
      version: "latest"
    },

    device: "Jenkins",

    platform: {
      name: "macOS",
      version: "Jenkins"
    }
  },

  customData: {
    title: "Cucumber Automation Report",

    data: [
      {
        label: "Project",
        value: "Playwright Cucumber Framework"
      },
      {
        label: "Environment",
        value: "Jenkins"
      }
    ]
  }
});