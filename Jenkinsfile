pipeline {
    agent any
    stages{
        stage("checkout"){
            steps{
                checkout scm
            }
        }

       

        stage("Build"){
            steps{
                sh 'npm start:dev'
            }
        }

        stage("Build Image"){
            steps{
                sh 'docker build -t node-test .'
            }
        }
        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker_cred', passwordVariable: 'DOCKERHUB_PASSWORD', usernameVariable: 'DOCKERHUB_USERNAME')]) {
                    sh 'docker login -u $DOCKERHUB_USERNAME -p $DOCKERHUB_PASSWORD'
                    sh 'docker tag node-test earic/test'
                    sh 'docker push earic/test'
                    sh 'docker logout'
                }
            }
        }
    }
}