pipeline {
    agent any

    environment {
    IMAGE_NAME = "amineznaki/password-generator:latest"
    VM_USER = "aznaki"
    VM_IP = "192.168.18.130"
    }

    stages {
        stage ('Clone Repository') {
            steps {
            git url: 'https://github.com/amineznaki/password-generator.git', branch: 'main'
            sh "git checkout main"
            }
        }
        stage ('Build Docker Image') {
            steps {
            sh "docker build -t $IMAGE_NAME ."
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
            withCredentials([sshUserPrivateKey(credentialsId: "ssh-credentials-id", keyFileVariable: 'SSH_KEY')]) {
            sh """
            ssh -i "$SSH_KEY" $VM_USER@$VM_IP << EOF
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
}