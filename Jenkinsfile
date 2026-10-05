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

        stage('Generate Cucumber Report') {
            steps {
                dir('playwright-cucumber-framework') {
                    sh 'npm run report'
                }
            }
        }
    }

    post {

        always {

            echo 'Archiving Cucumber reports...'

            archiveArtifacts(
                artifacts: 'playwright-cucumber-framework/reports/**/*',
                allowEmptyArchive: true
            )

            echo 'Publishing Cucumber HTML report...'

            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-cucumber-framework/reports/cucumber-html-report',
                reportFiles: 'index.html',
                reportName: 'Cucumber HTML Report'
            ])
        }

        success {
            echo 'Cucumber tests PASSED'
        }

        failure {
            echo 'Cucumber tests FAILED'
        }
    }
}