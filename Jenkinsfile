pipeline {

    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Environment Check') {
            steps {
                sh '''
                    echo "PATH=$PATH"
                    echo "Node:"
                    which node
                    node --version

                    echo "NPM:"
                    which npm
                    npm --version

                    echo "Git:"
                    git --version
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                dir('playwright-cucumber-framework') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install Playwright Chromium') {
            steps {
                dir('playwright-cucumber-framework') {
                    sh 'npx playwright install chromium'
                }
            }
        }

        stage('Run tests') {
            steps {
                dir('playwright-cucumber-framework') {
                    sh 'npm test'
                }
            }
        }
    }

    post {

        always {
            cucumber(
                buildStatus: 'UNSTABLE',
                fileIncludePattern: '**/cucumber.json',
                jsonReportDirectory: 'playwright-cucumber-framework/reports',
                trendsLimit: 10
            )

            archiveArtifacts(
                artifacts: 'playwright-cucumber-framework/reports/**/*',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Cucumber tests PASSED'
        }

        failure {
            echo 'Cucumber tests FAILED'
        }
    }
}