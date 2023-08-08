import React from 'react';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="logo">My App</div>
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="actions">
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default TopBar;