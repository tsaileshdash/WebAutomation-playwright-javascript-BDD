# Playwright Cucumber Framework

A JavaScript test automation framework for browser UI and HTTP API scenarios, using Playwright and Cucumber.

## Requirements

- Node.js 18 or later
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

The default Cucumber profile writes an HTML report to `reports/cucumber-report.html`. Failed UI scenarios attach a screenshot to the Cucumber report.

## Run in Jenkins

Configure a Jenkins Pipeline job to use `playwright-cucumber-framework/Jenkinsfile` as its script path. The Jenkins controller/agent must have the Docker Pipeline plugin and access to pull and run Docker images. The pipeline uses the official Playwright `v1.63.0-noble` image, matching the locked Playwright version, and offers an `all`, `ui`, or `api` suite parameter. The Cucumber HTML report is archived after each build, including failed test runs.

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
