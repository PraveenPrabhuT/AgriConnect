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
                    echo "Pushing Docker image to Docker Hub..."
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        bat "docker login -u ${env.DOCKER_USERNAME} -p ${env.DOCKER_PASSWORD}"
                        bat "docker push ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                    }
                    echo "Docker image pushed to Docker Hub."
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
