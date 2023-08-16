const installedExtensions = {};




const extension = {
    activate: "",
    deactivate: "",
    main: './extension.js',
    title: 'My Extension',
    version: '1.0.0',
    publisher: 'My Publisher',
    name: 'my-extension',
    keybindings: [
      {
        command: 'myExtension.myCommand',
        key: 'ctrl+shift+m'
      }
    ],
    commands: [
      {
        command: 'myExtension.myCommand',
        title: 'My Command',

      }
    ]
  };