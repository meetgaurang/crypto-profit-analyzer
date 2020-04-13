pipeline {
    agent any
    stages {
        stage('Install Dependecies') {
            steps {
                bat 'npm i'
            }
        }
        stage('Unit Test') {
            steps {
                bat 'set CI=true' // This will make sure that it won't go in 'watch' mode
                bat 'npm run test:nowatch a -- --coverage'
            }
            post {
                always {
                    step([$class: 'CoberturaPublisher', coberturaReportFile: 'coverage/cobertura-coverage.xml'])
                }
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                withAWS(region:'ap-southeast-2',credentials:'6a76f665-4ae3-43b3-b8a2-f1eafd494846') {
                    s3Delete(bucket: 'crypto-profit-analyzer', path:'/')
                    s3Upload(bucket: 'crypto-profit-analyzer', workingDir:'build', includePathPattern:'**/*');
                }
            }
        }
    }
}