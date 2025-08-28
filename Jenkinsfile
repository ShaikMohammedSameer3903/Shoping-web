pipeline {
    agent any

    stages {
        // The initial checkout is done automatically by Jenkins, so this stage isn't needed.
        /*
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ShaikMohammedSameer3903/Shoping-web.git'
            }
        }
        */

        stage('Build & Run with Docker Compose') {
            steps {
                bat '''
                    docker-compose down
                    docker-compose build
                    docker-compose up -d
                '''
            }
        }
    }

    post {
        always {
            bat 'docker-compose ps'
        }
    }
}
