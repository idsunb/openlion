import React, { useState,useEffect } from 'react';

const handleCopy = () => {
    // 处理复制操作
  };

  const handleCut = () => {
    // 处理剪切操作
  };

  const handleDelete = () => {
    // 处理删除操作
  };




const menuItems = [
    { label: 'Copy', action: handleCopy },
    { label: 'Cut', action: handleCut },
    { label: 'Delete', action: handleDelete },
  ];


const ContextMenu = ({ children}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (event) => {
    event.preventDefault(); // 阻止默认的右键菜单
    // console.log('handleContextMenu',event.button);
    // console.log('handleContextMenu',event.target);
    //如果是左键单击，则隐藏菜单
    if(event.button==0){
        setShowMenu(false);

        return;
    }


setShowMenu(true);
    setMenuPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMenuClick = (action) => {
    // 处理菜单项的点击事件
    setShowMenu(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) { // 如果按下 ESC 键，则隐藏菜单
        setShowMenu(false);
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);



  return (
    <div onContextMenu={handleContextMenu} onClick={handleContextMenu}>
      {children}

      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x,
            backgroundColor: 'white',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            zIndex: 1,
          }}
        >
          {menuItems.map((item) => (
            <div key={item.label} onClick={() => handleMenuClick(item.action)}>
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;