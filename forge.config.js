
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
    // {
    //   name: '@electron-forge/plugin-webpack',
    //   config: {
    //     devContentSecurityPolicy: '',
    //     mainConfig: './webpack.main.config.js',
    //     renderer: {
    //       config: './webpack.renderer.config.js',
    //       nodeIntegration: false,
    //       entryPoints: [
    //         {
    //           html: './src/index.html',
    //           js: './src/index.js',
    //           name: 'main_window',
    //           preload: {
    //             js: './src/preload.js',
    //           },
    //           nodeIntegration: true,

    //         },
    //         {
    //           html: './extensions/chatextension/index.html',
    //           js: './extensions/chatextension/index.js',
    //           name: 'chat_extension',
    //           preload: {
    //             js: './extensions/chatextension/preload.js',
    //           },

    //         },
    //         {
    //           name: 'extension',
    //           preload: {
    //             js: './src/extensionpreload.js',
    //           },
    //         },
    //       ],
    //     },
    //   },
    // },

    {
      name: '@electron-forge/plugin-vite',
      config: {

        // `build` can specify multiple entry builds, which can be
        // Main process, Preload scripts, Worker process, etc.
        build: [
          {
            // `entry` is an alias for `build.lib.entry`
            // in the corresponding file of `config`.
            entry: 'src/main.js',
            config: 'vite.main.config.mjs'
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs'
          },
          {
            entry: 'src/extensionpreload.js',
            config: 'vite.preload.config.mjs'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs'
          },
          {
            name: 'chat_extension',
            config: 'vite.chat_extension.config.mjs'
          }
        ],

      }
    }
  ],
};


// const a =[]
// const b =[...a,2]
// console.log([...b,{a:4}]);
// console.log(a,b);
