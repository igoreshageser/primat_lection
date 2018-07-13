module.exports = {
  apps: [
    {
      name: "PortalKPIBot",
      script: "npm",
      args: "deploy",
      append_env_to_name: true,
      env_development: {
        NODE_ENV: "development",
        PORT: 5501
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5500
      }
    }
  ],
  deploy: {
    production: {
      user: "hokage",
      host: "kpibot.me",
      ref: "origin/master",
      path: "/home/hokage/deploy",
      repo: "https://github.com/igoreshageser/primat_lection",
      "post-deploy":
        "npm install && pm2 startOrRestart ecosystem.config.js --env production"
    },
    development: {
      user: "hokage",
      host: "kpibot.me",
      ref: "origin/master",
      path: "/home/hokage/deploy",
      repo: "https://github.com/igoreshageser/primat_lection",
      "post-deploy":
        "npm install && pm2 startOrRestart ecosystem.config.js --env development"
    }
  }
};
