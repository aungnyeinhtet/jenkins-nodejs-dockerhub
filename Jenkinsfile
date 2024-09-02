pipeline {
    agent any
    environment {
        DOCKER_CRED = credentials('dockerhub-earic')
    }
    
    stages {
        stage('Build image') {
            steps {
                sh 'docker build -t earic/nodejs-app:${GIT_BRANCH//\//-} .'  // Replace slashes in branch name
                sh 'docker images'
            }
        }

        stage('Push Dockerhub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-earic', usernameVariable: 'DOCKER_CRED_USR', passwordVariable: 'DOCKER_CRED_PSW')]) { 
                    sh 'echo ${DOCKER_CRED_PSW} | docker login -u ${DOCKER_CRED_USR} --password-stdin' 
                    sh 'docker push earic/nodejs-app:${GIT_BRANCH//\//-}'  // Replace slashes in branch name
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    def nodeJS = 'nodejs-app'
                    def dockerRun = "docker run -d --name ${nodeJS} -p 3000:3000 earic/nodejs-app:${GIT_BRANCH//\//-}"
                    println "${dockerRun}"
                    sshagent(['VM-APP']) {  
                        sh '''
                        ssh -o StrictHostKeyChecking=no root@157.245.205.170 <<EOF
                        docker pull earic/nodejs-app:${GIT_BRANCH//\//-}
                        docker stop nodejs-app || true
                        docker rm nodejs-app || true
                        ${dockerRun}
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
