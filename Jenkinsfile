pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timestamps()
    }

    stages {
        stage('Prepare Environment') {
            steps {
                // Pull code from your Git repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build the React app
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy or copy build files to your server
                // Example for copying to a static server directory
                bat 'rmdir /s /q D:\\react-jenkins\\jenkins-builds'
                bat 'xcopy /s /i /y build\\* D:\\react-jenkins\\jenkins-builds'
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Post-Build Actions') {
            steps {
                // Clean up workspace after pipeline execution
                cleanWs()
            }
        }

    }
}
