pipeline {
    agent any

    environment {
    IMAGE_NAME = "amineznaki/password-generator"
    VM_USER = "aznaki"
    VM_IP = "192.168.18.130"
    SSH_KEY_CREDENTIALS_ID = "ssh-credentials-id"
    }

    stages {
        stage ('Clone Repository') {
            steps {
            git url: 'https://github.com/amineznaki/password-generator.git', branch: 'main'
            }
        }
        stage ('Build Docker Image') {
            steps {
            sh "docker build -t IMAGE_NAME ."
            }
        }
        stage ('Login Dockerhub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u amineznaki --password-stdin"
                }
            }
        }
        stage ('Push Image to dockerhub') {
            steps {
            sh "docker push $IMAGE_NAME"
            }
        }
        stage ('Deploy on CentOS VM') {
            steps {
            sh """
            ssh -i $SSH_KEY $VM_USER@$VM_IP << EOF
            docker pull $IMAGE_NAME
            docker stop password-generator || true
            docker rm password-generator || true
            docker run -d --name password-generator -p 3000:3000
            EOF
            """
            }
        }
    }
}