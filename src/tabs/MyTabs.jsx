import React, { useState,useEffect, useMemo } from 'react';
import styles from './MyTabs.module.css';


function MyTabs({ children, activeIndex = 0, onTabClick, onTabMove, className, ...rest }) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [activeIndexState, setActiveIndexState] = useState(activeIndex);



  useEffect(() => {
    
    setActiveIndexState(activeIndex);
  }, [activeIndex]);


  const handleTabClick = (index) => {
    if(onTabClick){
      onTabClick(index);
      
    }else{
      setActiveIndexState(index);
    }


  };

  const handleTabMouseDown = (event, index) => {
    setDraggedIndex(index);
    event.currentTarget.addEventListener('mousemove', handleTabMouseMove);
    event.currentTarget.addEventListener('mouseup', handleTabMouseUp);
  };

  const handleTabMouseMove = (event) => {
    if (draggedIndex !== null) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      onTabMove && onTabMove(draggedIndex, x, y);
    }
  };

  const handleTabMouseUp = (event) => {
    if (draggedIndex !== null) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      onTabMove && onTabMove(draggedIndex, x, y);
      setDraggedIndex(null);
    }
    event.currentTarget.removeEventListener('mousemove', handleTabMouseMove);
    event.currentTarget.removeEventListener('mouseup', handleTabMouseUp);
  };

  // const tabs = useMemo(() => {
  //   return React.Children.map(children, (child, index) => {

  //     if (child.type === TabList) {
  //       return React.cloneElement(child, {
  //         children: React.Children.map(child.props.children, (tab, tabIndex) => {
  //           return React.cloneElement(tab, {
  //             key: tabIndex,
  //             className: `${tab.props.className || styles.tab || ''} ${tabIndex === activeIndexState ? styles.active : ''}`,
  //             onClick: () => handleTabClick(tabIndex),
  //             onMouseDown: (event) => handleTabMouseDown(event, tabIndex),
  //           });
  //         }),
  //       });
  //     }
  //     if (child.type === TabPanel) {
  //       // console.log('key');
  //       // console.log(child.props.mykey);
  //       // console.log('index');
  //       // console.log(index);
  //       return React.cloneElement(child, {
  //         className: `${child.props.className ||styles.tabpanel|| ''} ${index - 1 === activeIndexState ? styles.tabpanelactive : ''}`,
  //         key: child.props.mykey,
  //       });
  //     }
  //     return null;
  //   });
  // }, [children, activeIndexState]);




  return (
    <MyTabsContainer className={className} {...rest}>
      {children}
      {/* {tabs} */}
    </MyTabsContainer>
  );
}

function MyTabsContainer({className,...props}) {
  return <div className={className || styles.mytabs } {...props} />;
}

function TabList({className,activeIndex = 0,onTabClick,...props}) {
  const [activeIndexState, setActiveIndexState] = useState(activeIndex);


  useEffect
  (() => {
    setActiveIndexState(activeIndex);
  }, [activeIndex]);
  
  const handleTabClick = (index) => {
    if(onTabClick){
      onTabClick(index);
      
    }else{
      setActiveIndexState(index);
    }


  };

  //渲染tablist
  return useMemo(() => {
    return <ul className={className||styles.tablist} {...props} >
    {
    React.Children.map(props.children, (tab, tabIndex) => {
      if(tab.type !== Tab){
        return null;
      }

      return React.cloneElement(tab, {
        key: tabIndex,
        className: `${tab.props.className || styles.tab || ''} ${tabIndex == activeIndexState ? styles.active : ''}`,
        onClick: () => handleTabClick(tabIndex),
        // onMouseDown: (event) => props.onTabMouseDown(event, tabIndex),
      });
    })
    }
    </ul>
  }, [props.children, activeIndexState]);



  // return <ul className={className||styles.tablist} {...props} />;
}

function Tab({className,...props}) {

  return <li className={className||styles.tab} {...props} />;
}


function TabPanleList({className,activeIndex = 0,...props}) {

  return useMemo(() => {
    return <div className={className||styles.tabpanellist} {...props}>
      {React.Children.map(props.children, (tab, tabIndex) => {
        if(tab.type !== TabPanel){
          return null;
        }
        return React.cloneElement(tab, {
          className: `${tab.props.className || styles.tabpanel || ''} ${tabIndex == activeIndex ? styles.tabpanelactive : ''}`,
          key: tab.props.mykey,
        });
      })}
      
    </div>
  },[props.children, activeIndex]);


}
    // return <div className={className||styles.tabpanellist} {...props} />;




function TabPanel({className,...props}) {


  return <div className={className||styles.tabpanel} {...props} />;
}

export { MyTabs, TabList, Tab, TabPanleList,TabPanel };