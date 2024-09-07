pipeline {
    agent any

    environment {
        NODE_VERSION = '18.17.1' // specify Node.js version
    }

    tools {
        nodejs "NodeJS ${NODE_VERSION}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Pull code from your Git repository
                git branch: 'master', url: 'https://github.com/ansahmd123/react-jenkins'
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
                bat 'cp -r build/* /var/www/html/'
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
