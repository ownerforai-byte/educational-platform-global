module.exports = {
  apps: [
    {
      name: "educational-platform-backend",
      script: "./dist/index.js",
      cwd: "./backend",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
    },
  ],
};
