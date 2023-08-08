module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        devContentSecurityPolicy: '',
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          nodeIntegration: false,
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/index.js',
              name: 'main_window',
              preload: {
                js: './src/preload.js',
              },
              nodeIntegration: true,

            },
            {
              html: './extensions/chatextension/index.html',
              js: './extensions/chatextension/index.js',
              name: 'chat_extension',
              preload: {
                js: './extensions/chatextension/preload.js',
              },
              
            },
            {
              name: 'extension',
              preload: {
                js: './src/extensionpreload.js',
              },
            },
          ],
        },
      },
    },
  ],
};
