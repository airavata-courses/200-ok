pipeline {
    agent any

    stages {
        stage('Prepare environment') {
            steps {                 
                sh '''
                    cd add_parking_api/
                    npm install   
                    echo 'started...'
                    echo 'finished...'
                '''    
             }
        }
        
        stage('Deploy') {
            steps {
            sh '''
                echo 'starting deploy...'
                cd add_parking_api/
                kill -9 $(lsof -i:3003 -t) || echo $  
                BUILD_ID=dontKillMe nohup npm run start &
                echo 'Build Success...'
            
            '''    
            }
        }

    }
}
