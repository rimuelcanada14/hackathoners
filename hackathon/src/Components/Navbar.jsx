import React, { useState, useEffect } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import userImage from './../assets/profileavatar.png';
import kuraplogo from './../assets/kurap.png';
import { CAvatar } from '@coreui/react'


//bootstrap
import { Image } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import './Navbar.css';

const Navbar = () => {
  const [profilePic, setProfilePic] = useState('');

  return (
    <div className='sidebar'>
      <CDBSidebar className="custom-sidebar">
        <div className='custom-header'>
          <CDBSidebarHeader prefix={<i className="iconbar-custom fa fa-bars fa-large"></i>}>
              <a href="/" className="header-logo text-decoration-none">
                  <Image className="logoimg" src={kuraplogo} />
                  
              </a>
          </CDBSidebarHeader>
        </div>

        <CDBSidebarHeader className= "custom-profile-header">
          <Row className="profile-avatar-sidebar">
          <CAvatar
              src={profilePic || userImage}
              alt="Profile Picture"
              className="avatar-sidebar"
          />   
          </Row>
          <Row className="profile-name-sidebar">
              <h3 className="name-sidebar"><center>Anonymous</center></h3>
          </Row>
      </CDBSidebarHeader>


        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/officials" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
                <CDBSidebarMenuItem icon="user">Officials</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/report" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
                <CDBSidebarMenuItem icon="exclamation-triangle">Report</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className='sidebar-content-footer'>
          <div className='sidebar-footer'>
              <div className="divider"></div> 
              <NavLink exact to="/login" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="door-open" className='custom-footer'>Logout</CDBSidebarMenuItem>
              </NavLink>
          </div>
        </CDBSidebarFooter>

      </CDBSidebar>
    </div>
  )
}

export default Navbar