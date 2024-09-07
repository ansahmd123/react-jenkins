pipeline {
    agent any

    environment {
        NODE_VERSION = '18.17.1' // specify Node.js version
    }

    tools {
        nodejs "NodeJS ${NODE_VERSION}"
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
                // first clean the build directory and then build the project
                bat 'npm run clean'
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Deploy or copy build files to your server
                // Example for copying to a static server directory
                bat 'xcopy /s /i /y build\\* D:\\react-jenkins\\jenkins-builds'
                bat 'npx serve -s build -l 3000'
            }
        }
        
        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

    }

    post {
        always {
            // Clean up workspace after pipeline execution
            cleanWs()
        }
    }
}
