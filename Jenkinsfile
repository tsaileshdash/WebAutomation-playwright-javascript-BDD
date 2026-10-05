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

                        npm ci --include=dev

                        npm exec -- cucumber-js --version
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

                    script {
                        env.CUCUMBER_TEST_STATUS = sh(
                            returnStatus: true,
                            script: '''
                                set +e
                                npm test
                                test_status=$?

                                if [ -s reports/cucumber-progress.txt ]; then
                                    cat reports/cucumber-progress.txt
                                fi

                                if [ ! -s reports/cucumber.json ]; then
                                    echo "Cucumber did not produce a JSON report." >&2
                                    test_status=1
                                elif ! node -e 'const fs = require("node:fs"); const report = JSON.parse(fs.readFileSync("reports/cucumber.json", "utf8")); if (!Array.isArray(report) || report.length === 0) throw new Error("Cucumber JSON report is empty");'; then
                                    echo "Cucumber JSON report is invalid." >&2
                                    test_status=1
                                fi

                                exit "$test_status"
                            '''
                        ).toString()
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
                            npm run report
                            test -s reports/cucumber-html-report/index.html
                            echo "HTML report generated at reports/cucumber-html-report/index.html"
                        else
                            echo "No Cucumber JSON was produced; HTML report generation is skipped."
                        fi
                    '''
                }
            }
        }

        stage('Set Test Result') {
            steps {
                script {
                    if (env.CUCUMBER_TEST_STATUS != '0') {
                        error("Cucumber tests failed (exit status ${env.CUCUMBER_TEST_STATUS}). See the test output and published report.")
                    }
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