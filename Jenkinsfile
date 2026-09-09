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
            string(credentialsId: 'USERNAME1-secret', variable: 'USERNAME1'),
            string(credentialsId: 'PASSWORD1-secret', variable: 'PASSWORD1')
          ]) {
            powershell """
              # Run Playwright tests with secrets injected
              npx playwright test tests/example.spec.ts --project=chromium
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