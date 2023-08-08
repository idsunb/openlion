import React, { useState,useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaBell, FaUserCircle, FaProjectDiagram, FaCog } from 'react-icons/fa';
import './NavBar.css';
import MyContext from './MyContext';



const NavBar = () => {
    const {data} = useContext(MyContext);
    console.log(data);
    console.log(data.activeItem);
    // const handleItemClick = (item) => {
    //     props.handleItemClick(item);
    //   };
    return (
        <Navbar bg="light" expand="lg" className="navbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              href="#notifications"
              onClick={() => data.handleItemClick('notifications')}
              active={data.activeItem === 'notifications'}
            >
              <FaBell />
            </Nav.Link>
            <Nav.Link
              href="#profile"
              onClick={() => data.handleItemClick('profile')}
              active={data.activeItem === 'profile'}
            >
              <FaUserCircle />
            </Nav.Link>
            <Nav.Link
              href="#project1"
              onClick={() => data.handleItemClick('project1')}
              active={data.activeItem === 'project1'}
            >
              <FaProjectDiagram /> 项目1
            </Nav.Link>
            <Nav.Link
              href="#project2"
              onClick={() => data.handleItemClick('project2')}
              active={data.activeItem === 'project2'}
            >
              <FaProjectDiagram /> 项目2
            </Nav.Link>
            <Nav.Link
              href="#settings"
              onClick={() => data.handleItemClick('settings')}
              active={data.activeItem === 'settings'}
            >
              <FaCog /> 设置
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
};

export default NavBar;

