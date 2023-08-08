// const { ipcRenderer } = require('electron');
// const fs = require('fs');
// const path = require('path');

// const pluginsPath = path.join(__dirname, 'plugins');

// // 加载插件
// function loadPlugin(pluginPath) {
//   const pluginJsonPath = path.join(pluginPath, 'plugin.json');
//   const pluginHtmlPath = path.join(pluginPath, 'index.html');
//   const pluginLogoPath = path.join(pluginPath, 'logo.png');

//   // 读取插件配置文件
//   const pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath, 'utf-8'));

//   // 创建插件图标
//   const pluginLogo = document.createElement('img');
//   pluginLogo.src = pluginLogoPath;
//   pluginLogo.alt = pluginJson.name;

//   // 创建插件按钮
//   const pluginButton = document.createElement('button');
//   pluginButton.appendChild(pluginLogo);
//   pluginButton.title = pluginJson.description;

//   // 创建插件页面
//   const pluginWebview = document.createElement('webview');
//   pluginWebview.src = pluginHtmlPath;
//   pluginWebview.style.display = 'none';

//   // 添加插件按钮和页面到 DOM 中
//   document.body.appendChild(pluginButton);
//   document.body.appendChild(pluginWebview);

//   // 注册插件命令
//   pluginJson.commands.forEach(command => {
//     ipcRenderer.on(command, () => {
//       pluginWebview.style.display = 'block';
//       pluginWebview.send('command', command);
//     });
//   });

//   // 返回插件对象
//   return {
//     name: pluginJson.name,
//     description: pluginJson.description,
//     logo: pluginLogoPath,
//     button: pluginButton,
//     webview: pluginWebview,
//     commands: pluginJson.commands
//   };
// }

// // 加载所有插件
// function loadPlugins() {
//   const plugins = fs.readdirSync(pluginsPath);

//   return plugins.map(plugin => {
//     const pluginPath = path.join(pluginsPath, plugin);
//     return loadPlugin(pluginPath);
//   });
// }

// // 添加插件
// function addPlugin(pluginPath) {
//   const plugin = loadPlugin(pluginPath);
//   plugins.push(plugin);
// }

// // 删除插件
// function removePlugin(pluginName) {
//   const pluginIndex = plugins.findIndex(plugin => plugin.name === pluginName);
//   if (pluginIndex !== -1) {
//     const plugin = plugins[pluginIndex];
//     plugin.button.remove();
//     plugin.webview.remove();
//     plugins.splice(pluginIndex, 1);
//   }
// }

// // 查找插件
// function findPlugin(pluginName) {
//   return plugins.find(plugin => plugin.name === pluginName);
// }

// // 激活插件
// function activatePlugin(pluginName) {
//   const plugin = findPlugin(pluginName);
//   if (plugin) {
//     plugin.webview.style.display = 'block';
//   }
// }

// // 反激活插件
// function deactivatePlugin(pluginName) {
//   const plugin = findPlugin(pluginName);
//   if (plugin) {
//     plugin.webview.style.display = 'none';
//   }
// }

// // 加载所有插件并初始化插件管理器
// const plugins = loadPlugins();

// // 导出插件管理器 API
// module.exports = {
//   plugins,
//   addPlugin,
//   removePlugin,
//   findPlugin,
//   activatePlugin,
//   deactivatePlugin
// };