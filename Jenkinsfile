pipeline {
    agent any
    environment {
                DOCKER_CRED = credentials('dockerhub-earic')
            }
            
    stages {
        stage('Build image') {
            steps {
                    sh 'docker build -t earic/nodejs-app:${GIT_BRANCH} .'
                    sh 'docker images'
                }
        }

        stage('Push Dockerhub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-earic', usernameVariable: 'DOCKER_CRED_USR', passwordVariable: 'DOCKER_CRED_PSW')]) { 
                    sh 'docker login -u ${DOCKER_CRED_USR} -p ${DOCKER_CRED_PSW}' 
                    sh 'docker push earic/nodejs-app:${GIT_BRANCH}' }
                }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    def nodeJS = 'nodejs-app'
                    def stopContainer = "docker stop ${nodeJS}"
                    def deleteContName = "docker rm ${nodeJS}"
                    def deleteImages = 'docker image prune -a --force'
                    def dockerRun = "docker run -d --name nodejs-app -p 3000:3000 earic/nodejs-app:${GIT_BRANCH}"
                    println "${dockerRun}"
                    sshagent(['VM-APP']) {  // Use your actual SSH credentials ID
                    sh '''
                    ssh -o StrictHostKeyChecking=no root@157.245.205.170 <<EOF
                    docker pull nodejs-app:latest
                    docker stop nodejs-app || true
                    docker rm nodejs-app || true
                    docker run -d --name nodejs-app -p 3000:3000 nodejs-app:latest
                    EOF
                    '''
                }
                }
            }
        }

        
    }
    post {
        always {
                sh 'docker image prune -a --force' 
        }
    }
}