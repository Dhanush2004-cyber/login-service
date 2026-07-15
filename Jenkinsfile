pipeline {

    agent any

    parameters {

        choice(
            name: 'BRANCH',
            choices: [
                'main',
                'dev'
            ],
            description: 'Select the Git branch to deploy'
        )

    }


    stages {

        stage('Deploy Login Service') {

            steps {

                script {

                    sshPublisher(
                        publishers: [
                            sshPublisherDesc(

                                configName: 'Ubuntu',

                                verbose: true,

                                transfers: [

                                    sshTransfer(

                                        execCommand: '''
                                            set -e

                                            echo "Selected Branch : ${params.BRANCH}"

                                            echo "===== LOGIN SERVICE DEPLOYMENT STARTED ====="

                                            cd /home/master/project/microservices/login-service

                                            git fetch origin

                                            git checkout ${params.BRANCH}

                                            git reset --hard origin/${params.BRANCH}

                                            npm install

                                            if pm2 describe login-service > /dev/null 2>&1
                                            then
                                                pm2 restart login-service
                                            else
                                                pm2 start app.js --name login-service
                                            fi

                                            pm2 save

                                            echo "===== LOGIN SERVICE DEPLOYED SUCCESSFULLY ====="
                                        '''
                                    )
                                ]
                            )
                        ]
                    )
                }
            }
        }
    }
    post {
        success {
            echo "======================================"
            echo "Login Service Deployment Successful"
            echo "======================================"
        }
        failure {
            echo "======================================"
            echo "Login Service Deployment Failed"
            echo "======================================"
        }
        always {
            cleanWs()
        }
    }
}