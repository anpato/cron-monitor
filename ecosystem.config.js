require('dotenv').config()
module.exports = {
  apps: [
    {
      name: 'Cron Doctor',
      script: 'npm',
      args: 'start'
    }
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: process.env.EC2_INSTANCE,
      key: process.env.SSH_KEY,
      ref: 'origin/master',
      repo: process.env.REPO,
      path: process.env.PROJECT_PATH,
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
