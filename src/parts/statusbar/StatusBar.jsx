import React,{useReducer,useEffect} from 'react';
import styles from './StatusBar.module.css';
import { openlion } from '../../workspace/lionAPI/openlion';
// import Tooltip from '../../workspace/tooltip/Tooltip';
import { Tooltip } from 'react-tooltip';


//实现状态栏，包含左右部分



const statusInitialLeft = {
  tabs: [{text:'test',tooltip:"test",id:'l1',color:"normal",visible:true,priority:0,command:""}]
}

const statusLeftReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABS':
      return { ...state, tabs: action.payload };
    case 'ADD_TAB':

      return { ...state, tabs: [...state.tabs, action.payload] };

    case 'UPDATE_TABS':
      const uid = action.payload.id;
      const tab = action.payload;
      const tabs = state.tabs;
      const index = tabs.findIndex((tab)=>tab.id == uid);
      //如果已经存在，则可修改更新
      if(index >= 0){
        tabs[index] = action.payload;
        return { ...state, tabs: tabs };
      } else {
        //不存在，就添加
        return { ...state, tabs: [...state.tabs, action.payload] };
      }

    case 'REMOVE_TAB':
      const uid2 = action.payload.id;
      const tabs2 = state.tabs;
      const index2 = tabs2.findIndex((tab)=>tab.id == uid2);
      if(index2 >= 0){
        tabs2.splice(index2,1);
        return { ...state, tabs: tabs2 };
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}



const statusInitialRight = {
  tabs: [{text:"testright",id:'r1',tooltip:'test right',color:"normal",visible:true,priority:0,command:""}]
}

const statusRightReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABS':
      return { ...state, tabs: action.payload };
    case 'ADD_TAB':
      return { ...state, tabs: [...state.tabs, action.payload] };
    case 'UPDATE_TABS':
      const uid = action.payload.id;
      const tab = action.payload;
      const tabs = state.tabs;
      const index = tabs.findIndex((tab)=>tab.id == uid);
      //如果已经存在，则可修改更新
      if(index >= 0){
        tabs[index] = action.payload;
        return { ...state, tabs: tabs };
      } else {
        //不存在，就添加
        return { ...state, tabs: [...state.tabs, action.payload] };
      }

    case 'REMOVE_TAB':
      const uid2 = action.payload.id;
      const tabs2 = state.tabs;
      const index2 = tabs2.findIndex((tab)=>tab.id == uid2);
      if(index2 >= 0){
        tabs2.splice(index2,1);
        return { ...state, tabs: tabs2 };
      } 


    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}


const StatusBar = ()=> {
  const [leftState, leftDispatch] = useReducer(statusLeftReducer, statusInitialLeft);
  const [rightState, rightDispatch] = useReducer(statusRightReducer, statusInitialRight);



  const updateTab = (tab) => {
    //如果tab.alignment是left，就添加到左边，否则添加到右边
    console.log('updateTab',tab);
    if(tab.alignment == 'left'){
      leftDispatch({ type: 'UPDATE_TABS', payload: tab });
      
    }
    if(tab.alignment == 'right'){
      rightDispatch({ type: 'UPDATE_TABS', payload: tab });
    
    }
    //如果已经存在，则可修改更新

  }
 
  const removeTab = (tab) => {
    //如果是左边则删除左边的，否则删除右边的
    if(tab.alignment == 'left'){
      leftDispatch({ type: 'REMOVE_TAB', payload: tab });
    } 
    if(tab.alignment == 'right'){
      rightDispatch({ type: 'REMOVE_TAB', payload: tab });
    }

  }



  



  useEffect(() => {
    openlion.lionCommand.register({name:'statusbar.updatetab',action:updateTab});
    openlion.lionCommand.register({name:'statusbar.removetab',action:removeTab});

    updateTab({text:'test2',tooltip:"test221",color:"normal",visible:true,priority:1,command:"",alignment:'left'});
    updateTab({text:'test2',tooltip:"test221",color:"normal",visible:true,priority:1,command:"",alignment:'right'});

    

  }, []);

  



    return (
      <div className={styles.statusBar}>
        <div className={styles.leftBar}>
          {leftState.tabs.map((tab,index)=>{
            return (
              <span key={index} 
              className={styles.statusBarItem} 
              style={{ order: tab.priority,visibility: (tab.visible ? 'visible' : 'hidden') }}
              onClick={()=>{openlion.lionCommand.call(tab.command)}} 
              data-tooltip-id="my-tooltip" data-tooltip-content={tab.tooltip}>
              {tab.text}
              </span>
            );
          }
          )}
        </div>
        <div className={styles.rightBar}>
          {rightState.tabs.map((tab,index)=>{
            return (
              <span key={index} className={styles.statusBarItem} 
              style={{ order: tab.priority ,visibility: (tab.visible ? 'visible' : 'hidden')}}
              onClick={()=>{openlion.lionCommand.call(tab.command)}} 
              data-tooltip-id="my-tooltip" data-tooltip-content={tab.tooltip}>{tab.text}</span>
            );
          }
          )}
          {/* <span>状态栏2</span> */}
        </div>
        <Tooltip id="my-tooltip" />

      </div>
    );
  }


  export default StatusBar;