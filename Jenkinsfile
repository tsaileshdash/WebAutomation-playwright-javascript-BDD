pipeline {

    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        /*
         * ============================================
         * ENVIRONMENT CHECK
         * ============================================
         */

        stage('Environment Check') {

            steps {

                sh '''
                    echo "======================================"
                    echo "ENVIRONMENT CHECK"
                    echo "======================================"

                    echo ""
                    echo "PATH:"
                    echo "$PATH"

                    echo ""
                    echo "NODE:"
                    which node
                    node --version

                    echo ""
                    echo "NPM:"
                    which npm
                    npm --version

                    echo ""
                    echo "GIT:"
                    git --version
                '''
            }
        }


        /*
         * ============================================
         * INSTALL NPM DEPENDENCIES
         * ============================================
         */

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


        /*
         * ============================================
         * INSTALL PLAYWRIGHT CHROMIUM
         * ============================================
         */

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


        /*
         * ============================================
         * RUN CUCUMBER TESTS
         * ============================================
         */

        stage('Run Cucumber Tests') {

            steps {

                dir('playwright-cucumber-framework') {

                    catchError(
                        buildResult: 'FAILURE',
                        stageResult: 'FAILURE'
                    ) {

                        sh '''
                            echo "======================================"
                            echo "PREPARING REPORT DIRECTORY"
                            echo "======================================"

                            rm -rf reports

                            mkdir -p reports

                            echo ""
                            echo "Reports directory created:"
                            ls -lah reports


                            echo ""
                            echo "======================================"
                            echo "RUNNING CUCUMBER TESTS"
                            echo "======================================"

                            npm test


                            echo ""
                            echo "======================================"
                            echo "CUCUMBER TEST EXECUTION COMPLETED"
                            echo "======================================"


                            echo ""
                            echo "======================================"
                            echo "CHECKING CUCUMBER JSON REPORT"
                            echo "======================================"


                            echo ""
                            echo "Reports directory:"
                            ls -lah reports


                            echo ""
                            echo "Report files:"
                            find reports -maxdepth 2 -type f -print || true


                            echo ""
                            echo "Checking cucumber.json..."


                            if [ -f reports/cucumber.json ]; then

                                echo ""
                                echo "SUCCESS: cucumber.json EXISTS"

                                ls -lh reports/cucumber.json

                                echo ""
                                echo "Cucumber JSON file size:"

                                wc -c reports/cucumber.json

                            else

                                echo ""
                                echo "ERROR: cucumber.json DOES NOT EXIST"

                                echo ""
                                echo "Contents of reports directory:"

                                ls -lah reports

                                exit 1

                            fi
                        '''
                    }
                }
            }
        }


        /*
         * ============================================
         * GENERATE HTML REPORT
         * ============================================
         */

        stage('Generate Cucumber HTML Report') {

            steps {

                dir('playwright-cucumber-framework') {

                    sh '''
                        echo "======================================"
                        echo "GENERATING CUCUMBER HTML REPORT"
                        echo "======================================"


                        if [ -s reports/cucumber.json ]; then

                            echo ""
                            echo "Cucumber JSON report FOUND."

                            echo ""
                            echo "Running report generator..."

                            npm run report


                            echo ""
                            echo "======================================"
                            echo "CHECKING HTML REPORT"
                            echo "======================================"


                            if [ -f reports/cucumber-html-report/index.html ]; then

                                echo ""
                                echo "SUCCESS: Cucumber HTML report generated."

                                echo ""
                                echo "HTML report directory:"

                                ls -lah reports/cucumber-html-report

                                echo ""
                                echo "HTML report file:"

                                ls -lh reports/cucumber-html-report/index.html

                            else

                                echo ""
                                echo "ERROR: Cucumber HTML report was NOT generated."

                                exit 1

                            fi

                        else

                            echo ""
                            echo "ERROR: cucumber.json is missing or empty."

                            exit 1

                        fi
                    '''
                }
            }
        }
    }


    /*
     * ================================================
     * POST ACTIONS
     * ================================================
     */

    post {

        always {

            dir('playwright-cucumber-framework') {

                script {

                    echo "======================================"
                    echo "PUBLISHING CUCUMBER HTML REPORT"
                    echo "======================================"


                    if (fileExists(
                        'reports/cucumber-html-report/index.html'
                    )) {

                        echo ""
                        echo "Cucumber HTML report FOUND."

                        echo ""
                        echo "Publishing report to Jenkins..."


                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'reports/cucumber-html-report',
                            reportFiles: 'index.html',
                            reportName: 'Cucumber HTML Report'
                        ])


                        echo ""
                        echo "Cucumber HTML Report published successfully."

                    } else {

                        echo ""
                        echo "Cucumber HTML report was NOT generated."

                    }


                    /*
                     * =================================
                     * ARCHIVE REPORT FILES
                     * =================================
                     */

                    echo ""
                    echo "======================================"
                    echo "ARCHIVING REPORT FILES"
                    echo "======================================"


                    archiveArtifacts(
                        artifacts: 'reports/**/*',
                        allowEmptyArchive: true
                    )
                }
            }
        }


        /*
         * ============================================
         * BUILD SUCCESS
         * ============================================
         */

        success {

            echo ""
            echo "======================================"
            echo "CUCUMBER TESTS PASSED"
            echo "CUCUMBER HTML REPORT GENERATED"
            echo "======================================"
        }


        /*
         * ============================================
         * BUILD FAILURE
         * ============================================
         */

        failure {

            echo ""
            echo "======================================"
            echo "CUCUMBER TESTS OR REPORT GENERATION FAILED"
            echo "======================================"
        }
    }
}