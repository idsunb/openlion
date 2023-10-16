import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    console.log('handleMouseEnter');
    setShow(true);
  };

  const handleMouseLeave = () => {
    console.log('handleMouseLeave');
    setShow(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {show && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'black',
            color: 'white',
            
            padding: '0.5rem',
            borderRadius: '0.25rem',
            zIndex: 10,
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;