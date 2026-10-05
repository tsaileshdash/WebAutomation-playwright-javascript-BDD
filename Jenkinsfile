pipeline {
  agent any

  options {
    timestamps()
  }

  parameters {
    choice(
      name: "TEST_SUITE",
      choices: ["all", "ui", "api"],
      description: "Choose which Cucumber scenarios to run"
    )
  }

  environment {
    CI = "true"
  }

  stages {
    stage("Install dependencies") {
      steps {
        dir("playwright-cucumber-framework") {
          sh "npm ci"
        }
      }
    }

    stage("Run tests") {
      steps {
        dir("playwright-cucumber-framework") {
          sh '''
            case "$TEST_SUITE" in
              all) npm test ;;
              ui) npm run test:ui ;;
              api) npm run test:api ;;
              *) echo "Unsupported TEST_SUITE: $TEST_SUITE" >&2; exit 2 ;;
            esac
          '''
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts(
        artifacts: "playwright-cucumber-framework/reports/cucumber-report.html",
        allowEmptyArchive: true
      )
    }
  }
}
