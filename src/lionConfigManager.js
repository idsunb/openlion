const fs = require('fs');
const path = require('path');

const lionConfigPath = path.join(__dirname, 'lionconfig.json');
const lionConfig = JSON.parse(fs.readFileSync(lionConfigPath, 'utf-8'));

const pluginsDir = lionConfig.pluginsDir;
const apiUrl = lionConfig.apiUrl;