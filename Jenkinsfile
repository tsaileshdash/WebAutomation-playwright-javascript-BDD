pipeline {

    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Environment Check') {
            steps {
                sh '''
                    echo "======================================"
                    echo "ENVIRONMENT CHECK"
                    echo "======================================"

                    echo "PATH=$PATH"

                    echo ""
                    echo "Node:"
                    which node
                    node --version

                    echo ""
                    echo "NPM:"
                    which npm
                    npm --version

                    echo ""
                    echo "Git:"
                    git --version
                '''
            }
        }


        stage('Install Dependencies') {
            steps {

                dir('playwright-cucumber-framework') {

                    sh '''
                        echo "======================================"
                        echo "INSTALLING NPM DEPENDENCIES"
                        echo "======================================"

                        npm ci
                    '''
                }
            }
        }


        stage('Install Playwright Chromium') {
            steps {

                dir('playwright-cucumber-framework') {

                    sh '''
                        echo "======================================"
                        echo "INSTALLING PLAYWRIGHT CHROMIUM"
                        echo "======================================"

                        npx playwright install chromium
                    '''
                }
            }
        }


        stage('Run Cucumber Tests') {
            steps {

                dir('playwright-cucumber-framework') {

                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {

                        sh '''
                            echo "======================================"
                            echo "CLEANING REPORT DIRECTORY"
                            echo "======================================"

                            rm -rf reports

                            mkdir -p reports


                            echo "======================================"
                            echo "RUNNING CUCUMBER TESTS"
                            echo "======================================"

                            npm test


                            echo "======================================"
                            echo "CHECKING CUCUMBER JSON REPORT"
                            echo "======================================"

                            echo "Report directory:"

                            ls -lah reports


                            echo ""
                            echo "Report files:"

                            find reports -maxdepth 2 -type f -print || true


                            echo ""
                            echo "Checking cucumber.json..."

                            if [ -s reports/cucumber.json ]; then

                                echo "SUCCESS: Cucumber JSON report found."

                                ls -lh reports/cucumber.json

                            else

                                echo "ERROR: Cucumber JSON report was NOT generated."

                                exit 1

                            fi
                        '''
                    }
                }
            }
        }


        stage('Generate Cucumber HTML Report') {
            steps {

                dir('playwright-cucumber-framework') {

                    sh '''
                        echo "======================================"
                        echo "GENERATING CUCUMBER HTML REPORT"
                        echo "======================================"

                        if [ -s reports/cucumber.json ]; then

                            echo "Cucumber JSON report found."

                            echo ""
                            echo "Running HTML report generator..."

                            npm run report

                            echo ""
                            echo "======================================"
                            echo "CHECKING HTML REPORT"
                            echo "======================================"

                            if [ -f reports/cucumber-html-report/index.html ]; then

                                echo "SUCCESS: Cucumber HTML report generated."

                                ls -lah reports/cucumber-html-report

                            else

                                echo "ERROR: Cucumber HTML report was NOT generated."

                                exit 1

                            fi

                        else

                            echo "ERROR: Cucumber JSON report does not exist."

                            exit 1

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

                    echo "======================================"
                    echo "PUBLISHING CUCUMBER REPORT"
                    echo "======================================"

                    if (fileExists('reports/cucumber-html-report/index.html')) {

                        echo "Cucumber HTML report found."

                        echo "Publishing Cucumber HTML report..."

                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports/cucumber-html-report',
                            reportFiles: 'index.html',
                            reportName: 'Cucumber HTML Report'
                        ])

                    } else {

                        echo "Cucumber HTML report was NOT generated."

                    }


                    echo "======================================"
                    echo "ARCHIVING REPORTS"
                    echo "======================================"

                    archiveArtifacts(
                        artifacts: 'reports/**/*',
                        allowEmptyArchive: true
                    )
                }
            }
        }


        success {

            echo "======================================"
            echo "CUCUMBER TESTS PASSED"
            echo "CUCUMBER REPORT GENERATED"
            echo "======================================"
        }


        failure {

            echo "======================================"
            echo "CUCUMBER TESTS FAILED"
            echo "======================================"
        }
    }
}