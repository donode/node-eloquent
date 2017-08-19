const config = {
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'test',

  connectionLimit: 2,
};

function setConfig(user_config) {
  Object.assign(config, user_config);
}

function getConfig() {
  return config;
}

module.exports = {
  setConfig,
  getConfig
};
