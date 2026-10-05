# Playwright Cucumber Framework

A JavaScript test automation framework for browser UI and HTTP API scenarios, using Playwright and Cucumber.

## Requirements

- Node.js 22 or later
- npm

## Setup

From this directory, install the dependencies and the Chromium browser:

```sh
npm install
npx playwright install chromium
```

## Run tests

```sh
npm test
npm run test:ui
npm run test:api
```

The test scripts capture and validate Cucumber JSON results at `reports/cucumber.json` and progress output at `reports/cucumber-progress.txt`. Run `npm run report` to generate a browsable HTML report at `reports/cucumber-html-report/index.html`. Failed UI scenarios attach a screenshot to the Cucumber scenario result.

## Run in Jenkins

Configure a Jenkins Pipeline job to use `playwright-cucumber-framework/Jenkinsfile` as its script path. Install the **HTML Publisher** Jenkins plugin. The pipeline installs development dependencies, verifies Cucumber through `npm exec`, runs the project `npm test` script, validates its JSON output, and publishes the generated HTML report. It still generates and publishes the report when scenarios fail, then marks the build failed based on the test exit code. Report files are archived as build artifacts.

## Configuration

The sample UI scenario uses the SauceDemo login page and the sample API scenarios use JSONPlaceholder. Override the endpoints with environment variables:

```sh
BASE_URL=https://your-app.example.test npm run test:ui
API_BASE_URL=https://your-api.example.test npm run test:api
```

Additional options:

- `HEADLESS=false` runs Chromium with a visible browser.
- `TEST_TIMEOUT=15000` sets the Playwright UI and API request timeout in milliseconds.

The sample login credentials are in `test-data/users.json`; API payloads are in `test-data/apiData.json`.

## Project structure

- `features/` contains UI and API Gherkin scenarios.
- `step-definitions/` maps Gherkin steps to JavaScript.
- `pages/` contains UI page objects.
- `api/` contains API clients.
- `support/` contains the Cucumber World, browser launcher, and scenario hooks.
- `config/` and `test-data/` contain environment settings and sample test data.
- `utils/` contains shared logging, API, and JSON helpers.
# WebAutomation-playwright-javascript-BDD
