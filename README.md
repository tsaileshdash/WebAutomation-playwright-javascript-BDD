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

The default Cucumber profile writes JSON results to `reports/cucumber.json`. Run `npm run report` to generate a browsable HTML report under `reports/html/`. Failed UI scenarios attach a screenshot to the Cucumber scenario result.

## Run in Jenkins

Configure a Jenkins Pipeline job to use `playwright-cucumber-framework/Jenkinsfile` as its script path. Install the **HTML Publisher** Jenkins plugin. The pipeline generates the HTML report from Cucumber JSON after the test run and adds a **Cucumber HTML Report** link to the build page. It archives report files from `reports/` even when tests fail.

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
