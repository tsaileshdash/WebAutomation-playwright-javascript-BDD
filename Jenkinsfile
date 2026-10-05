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

                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {
                        sh 'npm test'
                    }

                    echo 'Checking generated Cucumber reports...'

                    sh '''
                        echo "===== REPORT DIRECTORY ====="

                        if [ -d reports ]; then
                            ls -lah reports
                        else
                            echo "Reports directory does not exist."
                        fi

                        echo "===== REPORT FILES ====="

                        find reports -maxdepth 2 -type f -print 2>/dev/null || true
                    '''
                }
            }
        }

        stage('Generate Cucumber Report') {
            steps {
                dir('playwright-cucumber-framework') {

                    sh '''
                        if [ -s reports/cucumber.json ]; then

                            echo "Cucumber JSON report found."
                            echo "Generating HTML report..."

                            npm run report

                        else

                            echo "Cucumber JSON report was not generated."

                        fi
                    '''
                }
            }
        }
    }

    post {

        always {

            dir('playwright-cucumber-framework') {

                script {

                    if (fileExists('reports/cucumber-html-report/index.html')) {

                        echo 'Cucumber HTML report found.'

                        echo 'Publishing Cucumber HTML report...'

                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports/cucumber-html-report',
                            reportFiles: 'index.html',
                            reportName: 'Cucumber HTML Report'
                        ])

                    } else {

                        echo 'Cucumber HTML report was not generated.'

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