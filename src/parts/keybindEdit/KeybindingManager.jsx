import React from 'react';


const keybinds = lionAPIP.getkeybinds();


const KeybindingManager = () => {

    return (
        <div>
          <table>
            <thead>
              <tr>
                <th>command</th>
                <th>keybinding</th>
                <th>when</th>
                <th>source</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(keybinds).map((key,index)=>{
                return (
                  <tr key={index}>
                    <td>{keybinds[key].commandName}</td>
                    <td>{key}</td>
                    <td>{keybinds[key].when}</td>
                    <td>{keybinds[key].source}</td>
                  </tr>
                );
              }
              )}
            </tbody>
          </table>
        </div>
      );
    }



export default KeybindingManager;
