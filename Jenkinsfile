pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'angular-frontend'
        BACKEND_DIR = 'spring-backend'
        FRONTEND_IMAGE = 'ctay456aa/angular-frontend/frontend:latest'
        BACKEND_IMAGE = 'ctay456aa/angular-frontend/backend:latest'
        DOCKER_CREDENTIALS_ID = 'docker-credentials'  // Replace with your Docker Hub credentials ID
    }

    stages {
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    // Build Docker image for frontend (Angular)
                    dir(FRONTEND_DIR) {
                        sh 'docker build -t ${FRONTEND_IMAGE} .'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    // Build Docker image for backend (Spring Boot)
                    dir(BACKEND_DIR) {
                        sh 'docker build -t ${BACKEND_IMAGE} .'
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    // Log in to Docker Hub and push images
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                            docker push ${FRONTEND_IMAGE}
                            docker push ${BACKEND_IMAGE}
                        '''
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Apply Kubernetes deployment YAML files
                    sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                    sh 'kubectl apply -f k8s/backend-deployment.yaml'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}
