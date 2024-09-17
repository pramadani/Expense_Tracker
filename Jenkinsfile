pipeline {
    agent any

    environment {
        DB_PASSWORD = credentials('expense-app-db-password') // Replace with your Jenkins credentials ID
        TOKEN_KEY = credentials('expense-app-secret-token-key') // Replace with your Jenkins credentials ID
    }

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