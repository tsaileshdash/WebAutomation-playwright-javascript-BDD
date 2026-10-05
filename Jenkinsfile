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
                    which node
                    which npm
                    node --version
                    npm --version
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

        stage('Install Playwright Browsers') {
            steps {
                dir('playwright-cucumber-framework') {
                    sh 'npx playwright install'
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
            archiveArtifacts artifacts: 'playwright-cucumber-framework/reports/**/*', 
                             allowEmptyArchive: true
        }

        success {
            echo 'Cucumber tests PASSED'
        }

        failure {
            echo 'Cucumber tests FAILED'
        }
    }
}