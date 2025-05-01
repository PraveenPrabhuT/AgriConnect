pipeline {
    agent any
    environment {
        IMAGE_NAME = 'praveenprabhu504/node_pipeline-app'
        IMAGE_TAG = "latest"
        DOCKER_CREDENTIALS_ID = 'dockerhub-creds'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out code from ${env.GIT_URL}..."
                    checkout scm
                    echo "Checkout complete."
                }
            }
        }
        stage('Build Image') {
            steps {
                script {
                    echo "Building Docker image using docker-compose..."
                    bat 'docker-compose build --no-cache app'
                    echo "Docker image build complete."
                    bat "docker tag node_pipeline-app ${env.IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker push ${IMAGE_NAME}"
                        bat "docker logout"
                    }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying application using docker-compose..."
                    bat 'docker-compose down'
                    bat 'docker-compose up -d app'
                    echo "Deployment complete. Application should be running."
                }
            }
        }
    }

    
}
