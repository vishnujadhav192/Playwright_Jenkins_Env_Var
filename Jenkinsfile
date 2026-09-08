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
            string(credentialsId: 'USER_NAME', variable: 'USER_NAME'),
            string(credentialsId: 'USER_MESSAGE', variable: 'USER_MESSAGE')
          ]) {
            powershell """
              # Create .env file dynamically from Jenkins credentials
              @"
    USER_NAME=$env:USER_NAME
    USER_MESSAGE=$env:USER_MESSAGE
    "@ | Out-File -Encoding UTF8 .env

              # Run Playwright tests
              npx playwright test tests/example.spec.ts --project=chromium

              # Clean up .env after run
              Remove-Item .env -Force
            """
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