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

        stage('Prepare Cucumber reports') {
            steps {
                dir('playwright-cucumber-framework') {
                    sh 'mkdir -p reports && rm -f reports/cucumber.json'
                }
            }
        }

        stage('Run tests') {
            steps {
                dir('playwright-cucumber-framework') {
                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {
                        sh '''
                            npm test
                            test -s reports/cucumber.json
                        '''
                    }
                }
            }
        }
    }

    post {

        always {
            dir('playwright-cucumber-framework') {
                script {
                    if (fileExists('reports/cucumber.json')) {
                        echo 'Generating Cucumber HTML report...'
                        sh 'npm run report'

                        echo 'Publishing Cucumber HTML report...'
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports/html',
                            reportFiles: 'index.html',
                            reportName: 'Cucumber HTML Report'
                        ])
                    } else {
                        echo 'Cucumber JSON report was not generated; no HTML report to publish.'
                    }
                }

                echo 'Archiving Cucumber reports...'
                archiveArtifacts(
                    artifacts: 'reports/**/*',
                    allowEmptyArchive: true
                )
            }
        }

        success {
            echo 'Cucumber tests PASSED'
        }

        failure {
            echo 'Cucumber tests FAILED'
        }
    }
}