pipeline {
  agent any
  tools {
    git 'Default'
  }
  options { timestamps() }

  environment {
    NODE_ENV = 'test'
    CI = '1'
    USERNAME1 = 'standard_user'
    PASSWORD1 = 'secret_sauce'
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
			powershell '''
				Write-Host "USERNAME1=$env:USERNAME1"
				Write-Host "PASSWORD1=$env:PASSWORD1"

				npx playwright test tests/example.spec.ts --project=chromium
			'''
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