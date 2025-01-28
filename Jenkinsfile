pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'angular-frontend'
        BACKEND_DIR = 'spring-backend'
        FRONTEND_IMAGE = 'ctay456aa/angular-frontend:latest'
        BACKEND_IMAGE = 'ctay456aa/angular-frontend:latest'
        DOCKER_CREDENTIALS_ID = 'docker-credentials'
    }

    stages {
        stage('Determine Changes') {
            steps {
                script {
                    def changes = sh(
                        script: 'git diff --name-only HEAD HEAD~1',
                        returnStdout: true
                    ).trim().split('\n')
                    
                    env.BUILD_FRONTEND = changes.any { it.startsWith(FRONTEND_DIR) }.toString()
                    env.BUILD_BACKEND = changes.any { it.startsWith(BACKEND_DIR) }.toString()
                    
                    echo "Frontend changes detected: ${env.BUILD_FRONTEND}"
                    echo "Backend changes detected: ${env.BUILD_BACKEND}"
                }
            }
        }

        stage('Build Frontend Docker Image') {
            when {
                expression { env.BUILD_FRONTEND == 'true' }
            }
            steps {
                script {
                    dir(FRONTEND_DIR) {
                        sh 'docker build -t ${FRONTEND_IMAGE} .'
                    }
                }
            }
        }

        stage('Build Backend Docker Image') {
            when {
                expression { env.BUILD_BACKEND == 'true' }
            }
            steps {
                script {
                    dir(BACKEND_DIR) {
                        sh 'docker build -t ${BACKEND_IMAGE} .'
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        if (env.BUILD_FRONTEND == 'true') {
                            sh '''
                                echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                                docker push ${FRONTEND_IMAGE}
                            '''
                        }

                        if (env.BUILD_BACKEND == 'true') {
                            sh '''
                                echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                                docker push ${BACKEND_IMAGE}
                            '''
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    if (env.BUILD_FRONTEND == 'true') {
                        sh 'kubectl apply -f k8s/frontend-deployment.yaml'
                    }

                    if (env.BUILD_BACKEND == 'true') {
                        sh 'kubectl apply -f k8s/backend-deployment.yaml'
                    }
                }
            }
        }

        stage('Cleanup Docker Images') {
            steps {
                script {
                    echo 'Cleaning up unused Docker images...'
                    // Remove all Docker images related to the build
                    sh '''
                        docker rmi -f ${FRONTEND_IMAGE} || true
                        docker rmi -f ${BACKEND_IMAGE} || true
                        docker system prune -f --all || true
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment successful! All images have been cleaned up.'
        }

        failure {
            echo 'Deployment failed! Cleaning up Docker images.'
            script {
                sh 'docker system prune -f --all || true'
            }
        }
    }
}
