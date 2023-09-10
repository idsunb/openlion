import React, { useState, useEffect } from 'react';
import {openlion} from '../../workspace/lionAPI/openlion';



const TestView = () => {
    const [objItem, setObjItem] = useState('event');

  


      const handleAddTab = () => {
         const path = openlion.getfilepath()
         console.log(path);
        // onAddTab('New Tab');
        // setTabIndex(tabIndex + 1);
      };
      const handleAddTab1 = () => {
        window.lionAPI.useContexttest1();
        // onAddTab('New Tab');
        // setTabIndex(tabIndex + 1);
      };
      const handleOpenNewTabPanel = () => {
        window.postMessage({ type: 'mainpanel-add-tab-panel' }, '*');
      }
      const handleOpenNewRactTabPanel = () => {
        window.postMessage({ type: 'mainpanel-add-react-tab-panel' }, '*');
      }
      const handleOpenWebview = () => {
        openlion.lionCommand.call('mainpanel.openwebview',{url:'http://localhost:5181',title:'test here'});
      }
      const handleclear = () => {
        window.postMessage({ type: 'mainpanel-clear' }, '*');
      }
      const handlePath = () => {
        // const path = lionAPI.getPreloadFilePath()
        // console.log(path);
      }
      const handleTest = () => {
        console.log(openlion.myvalue())

      }
      const handleClickEvent = () => {

        openlion.lionCommand.call('system.showNotification',{title:'you are a title',body:'you are a body'});

        // console.log('handleClickEvent');
        // lionAPI.lionEvent.register('lefttest1', (data) => {
        //   console.log('system.eventtest1 result');
        //   console.log(data);
        // });
        // lionAPI.lionEvent.trigger('lefttest1', { name: 'lion' });


        // window.lionAPI.lionEvent.trigger('somethingHappened', { name: 'lion' })
        // window.lionAPI.lionEvent.trigger('system.eventtest1', { name: 'lion' });
      }

      const handleEventregister = () => {
        console.log('handleEventregister')
        openlion.lionEvent.register('system.eventtest1', (data) => {
          console.log('system.eventtest1', data);
        });
      }
      const handleEventtrigger = () => {
        console.log('handleEventtrigger');
        openlion.lionEvent.trigger('system.eventtest1','leftpanel');
      }
      const handleEventlook = () => {
        console.log('handleEventlook');
        console.log(openlion.lionEvent.getLionEvents());
      }

      const hellomain = () => {
        console.log('hellomain');
        console.log(openlion.lionCommand.getCommands());
        openlion.lionCommand.call('hellofrommain');
      }

      const handleInfoPanel = () => {
        console.log('handleInfoPanel');
        openlion.lionCommand.call('infopanel.addmessage',{a:4});
      }
      
      const handleInputChange = (event) => {
        setObjItem(event.target.value);
      };

      const handleSendEvent = async () => {
        const result = await openlion.lionCommand.call('system.getobject',{name:objItem});
        openlion.lionCommand.call('infopanel.addmessage',result);
        
        console.log('result',JSON.parse(result));
      };
      const handleGetState = () => {
        console.log('handleGetState');
        console.log(openlion.lionContext.getTestState());
        openlion.lionCommand.call('infopanel.addmessage',openlion.lionContext.getState());
      }



    return (<div>
      
      <h2>内部测试工具</h2>
        <button onClick={handleAddTab}>Add Tab</button>
            
        <button onClick={handleOpenNewTabPanel}>增加普通页面</button>
        

        
      <br/>
      <button onClick={handleOpenNewRactTabPanel}>Add New 组件</button>
      <br/>
      <button onClick={handleOpenWebview}>Open Webview</button>
      <br/>
      <button onClick={  handleclear }>Clear State</button>
      <button onClick={handlePath}>路径</button>
      <button onClick={handleTest}>测试</button>
      <button onClick={handleEventregister}>注册system.eventtest1事件</button>
      <button onClick={handleEventtrigger}>触发system.eventtest1事件</button>
      <button onClick={handleEventlook}>查看事件</button>
      <button onClick={handleClickEvent}>点击事件</button>
      <button onClick={hellomain}>测试是否获得main的command</button>
      <button onClick={handleInfoPanel}>测试信息面板</button>
      <br/>
      <div>
          <select value={objItem} onChange={handleInputChange}>
            <option value="event">event</option>
            <option value="command">command</option>
            <option value="context">context</option>
          </select>
          <button onClick={handleSendEvent}>发送</button>
        </div>

        <br/>
        <button onClick={handleGetState}>得到state</button>
        <br/>
        <h2>快捷键管理</h2>
        <button onClick={()=>{openlion.lionCommand.call('mainpanel.keybinding.panel.open')}}>打开快捷键管理</button>
    </div>





    );
};

export default TestView;
