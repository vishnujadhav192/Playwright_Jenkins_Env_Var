pipeline {
  agent any
  tools {
    git 'Default'
  }
  options { timestamps() }

  environment {
    NODE_ENV = 'test'
    CI = '1'
  }

  stages {
    stage('🔄 Checkout') {
      steps {
        checkout scm
      }
    }

    stage('📦 Install Dependencies') {
      steps {
        powershell 'npm ci'
      }
    }

    stage('🤖 Install Playwright Browsers & Dependencies') {
      steps {
        powershell 'npx playwright install --with-deps'
      }
    }
    stage('▶️ Run Playwright Tests') {
      steps {
        script {
          withCredentials([
            string(credentialsId: 'user-name-secret', variable: 'USER_NAME'),
            string(credentialsId: 'user-message-secret', variable: 'USER_MESSAGE')
          ]) {
                powershell '''
                  $envContent = @(
                    "USER_NAME=$env:USER_NAME"
                    "USER_MESSAGE=$env:USER_MESSAGE"
                  )
                  $envContent | Set-Content -Encoding UTF8 .env

                  npx playwright test tests/example.spec.ts --project=chromium
                  Remove-Item .env -Force
                '''
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright HTML Report'
      ])
    }
  }
}