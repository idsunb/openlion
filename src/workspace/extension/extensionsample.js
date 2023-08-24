const extension1 = {
    activate: "",
    deactivate: "",
    main: './extension.js',
    title: 'My Extension',
    version: '1.0.0',
    publisher: 'My Publisher',
    name: 'my-extension-test1',
  
    mode:'js',
    codes:{
      activeEvents: [
        {
          onCommand: 'myExtension.myCommand',
          onFile: 'myExtension.myopenfile',
        }
      ],
  
      keybindings: [
        {
          command: 'myExtension.myCommand',
          key: 'Ctrl+Shift+m'
        }
      ],
      commands: [
        {
          command: 'myExtension.myCommand',
          title: 'My Command',
  
        }
      ]
    }
  
  
    }
  
  
    const extension2 = {
      activate: "",
      deactivate: "",
      main: './extension.js',
      title: 'My Extension',
      version: '1.0.0',
      publisher: 'My Publisher',
      name: 'my-extension-test2',
  
      mode:'js',
      codes:{
        activeEvents: [
          {
            onCommand: 'myExtension.myCommand',
            onFile: 'myExtension.myopenfile',
          }
        ],
  
        keybindings: [
          {
            command: 'myExtension.myCommand',
            key: 'Ctrl+Shift+m'
          }
        ],
        commands: [
          {
            command: 'myExtension.myCommand',
            title: 'My Command',
    
          }
        ]
      }
      }


      const initExtension = (extension) => {
        addExtension(extension1);
        addExtension(extension2);
    
      }