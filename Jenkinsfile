pipeline {
    agent any
    environment {
        IMAGE_NAME = 'your-dockerhub-username/agriconnect'
        IMAGE_TAG = "build-${env.BUILD_NUMBER}"
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
                    sh 'docker-compose build --no-cache app'
                    echo "Docker image build complete."
                    sh "docker tag agriconnect_app ${env.IMAGE_NAME}:latest"
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    echo "Pushing Docker image to registry..."
                    withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo ${env.DOCKER_PASSWORD} | docker login -u ${env.DOCKER_USERNAME} --password-stdin"
                        sh "docker push ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                        sh "docker push ${env.IMAGE_NAME}:latest"
                    }
                    echo "Image push complete."
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying application using docker-compose..."
                    sh 'docker-compose down'
                    sh 'docker-compose up -d app'
                    echo "Deployment complete. Application should be running."
                }
            }
        }
    }

    
}
