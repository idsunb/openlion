import React, { useState,useEffect, useMemo } from 'react';
import styles from './MyTabs.module.css';


function MyTabs({ children, activeIndex = 0, onTabClick, onTabMove, className, ...rest }) {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [activeIndexState, setActiveIndexState] = useState(activeIndex);

  console.log('activeIndexState');
  console.log(activeIndexState);
  console.log('activeIndex');
  console.log(activeIndex);




  const handleTabClick = (index) => {
    onTabClick && onTabClick(index) || setActiveIndexState(index);
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

  const tabs = useMemo(() => {
    return React.Children.map(children, (child, index) => {

      if (child.type === TabList) {
        return React.cloneElement(child, {
          children: React.Children.map(child.props.children, (tab, tabIndex) => {
            console.log('tabIndex', tabIndex);
            return React.cloneElement(tab, {
              key: tabIndex,
              className: `${tab.props.className || styles.tab || ''} ${tabIndex === activeIndexState ? styles.active : ''}`,
              onClick: () => handleTabClick(tabIndex),
              onMouseDown: (event) => handleTabMouseDown(event, tabIndex),
            });
          }),
        });
      }
      if (child.type === TabPanel) {
        // console.log('key');
        // console.log(child.props.mykey);
        // console.log('index');
        // console.log(index);
        return React.cloneElement(child, {
          className: `${child.props.className ||styles.tabpanel|| ''} ${index - 1 === activeIndexState ? styles.tabpanelactive : ''}`,
          key: child.props.mykey,
        });
      }
      return null;
    });
  }, [children, activeIndexState]);



  return (
    <MyTabsContainer className={className} {...rest}>
      {tabs}
    </MyTabsContainer>
  );
}

function MyTabsContainer({className,...props}) {
  console.log('mytabscontainer');
  console.log(className);
  return <div className={className || styles.mytabs } {...props} />;
}

function TabList({className,...props}) {
  console.log('tablist');
  console.log(className);

  return <ul className={className||styles.tablist} {...props} />;
}

function Tab({className,...props}) {
  console.log('tab');
  console.log(className);

  return <li className={className||styles.tab} {...props} />;
}

function TabPanel({className,...props}) {
  console.log('tabpanel');
  console.log(className);
  return <div className={className||styles.tabpanel} {...props} />;
}

export { MyTabs, TabList, Tab, TabPanel };