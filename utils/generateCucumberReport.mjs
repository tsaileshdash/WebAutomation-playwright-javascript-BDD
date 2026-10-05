import { access, stat } from "node:fs/promises";
import { generate } from "multiple-cucumber-html-reporter";

const jsonDir = "./reports";
const reportPath = "./reports/cucumber-html-report";
const htmlReportPath = `${reportPath}/index.html`;

await access(`${jsonDir}/cucumber.json`);
await generate({
  jsonDir,
  reportPath,
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

const report = await stat(htmlReportPath);
if (!report.isFile() || report.size === 0) {
  throw new Error(`Cucumber HTML report was not generated at ${htmlReportPath}`);
}

console.info(`Cucumber HTML report generated: ${htmlReportPath}`);