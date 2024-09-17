pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/pramadani/Expense_Tracker.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker compose down'
                    bat 'docker compose build'
                }
            }
        }
        stage('Deploy Docker Container') {
            steps {
                script {
                    bat 'docker compose up -d'
                }
            }
        }
    }
}