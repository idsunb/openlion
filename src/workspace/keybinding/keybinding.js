const keybinds = {};
// const lionAPI = window.lionAPI;
import openlion from "../lionAPI/openlion";

const keybindInitialMap = {
  'Ctrl+S': {commandName:'save',when:'editorTextFocus',source:'myExtension'},
  'Ctrl+Shift+S': {commandName:'saveAs',when:'editorTextFocus',source:'myExtension'},
  'F1': {commandName:'lioncommand.open',when:'',source:'myExtension'},
  'Escape': {commandName:'lioncommand.close',when:'',source:'myExtension'},
}  

export function initKeybinds() {
  window.addEventListener('keydown', handleKeyDown);


  Object.keys(keybindInitialMap).forEach(key => {
    const keybind = keybindInitialMap[key];
    keybinds[key] = keybind;
  });
  
  console.log('init keybinds',keybinds);

  
}

export function getkeybinds() {
  console.log('get keybinds  1111',keybinds);
    return keybinds;
}



function handleKeyDown(event) {
  
  console.log('event.key',event.key);
  const shortcut = getShortcut(event);
  console.log('shortcut',shortcut);


  const command = keybinds[shortcut];
  console.log('command',command);

      //   executeCommand(command);
      if (command) {
        openlion.lionCommand.call(command.commandName);
      }

  //  event.preventDefault();


  }

  function isShortcutKey(event) {
    return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
  }

export function getShortcut(event) {
    const keys = [];
    if (event.ctrlKey) {
      keys.push('Ctrl');
    }
    if (event.shiftKey) {
      keys.push('Shift');
    }
    if (event.altKey) {
      keys.push('Alt');
    }
    if (event.metaKey) {
      keys.push('Meta');
    }
    const key = event.key;
    if (/^[a-z]$/.test(key)) { // 如果按下的键是小写字母，则转换为大写字母
      keys.push(key.toUpperCase());
    } else {
      keys.push(key);
    }
    return keys.join('+');
  }


  // 在页面加载时，注册键盘事件监听器

export function addKeybind(keybind) {
    keybinds.push(keybind);
    }







