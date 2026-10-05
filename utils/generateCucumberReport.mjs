import report from "multiple-cucumber-html-reporter";

console.log("======================================");
console.log("GENERATING CUCUMBER HTML REPORT");
console.log("======================================");

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
      },
      {
        label: "Report",
        value: "Cucumber HTML Report"
      }
    ]
  }
});

console.log("======================================");
console.log("CUCUMBER HTML REPORT GENERATED");
console.log("======================================");
console.log("Report location:");
console.log("./reports/cucumber-html-report/index.html");