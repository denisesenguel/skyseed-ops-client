import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  //CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

function SideBar() { 
  return (
    <div className="d-flex fix-content-height overflow-scroll">
      <CDBSidebar className="bg-primary-cstm text-white">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          Hello, Person!
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* might want to assign activeClassName="activeClicked" to these NavLinks */}
            <NavLink exact="true" to="/home" >
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <h6 className="mx-4 mt-3">Projects</h6>
            <NavLink exact="true" to="/home/projects">
                <CDBSidebarMenuItem icon="tree">View All</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/home/projects/my-projects">
                <CDBSidebarMenuItem icon="tree">My Projects</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/home/projects/create">
                <CDBSidebarMenuItem icon="plus">Add new</CDBSidebarMenuItem>
            </NavLink>
            <h6 className="mx-4 mt-3">Customers</h6>
            <NavLink exact="true" to="/home/customers">
              <CDBSidebarMenuItem icon="list">View All</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact="true" to="/home/customers/create">
              <CDBSidebarMenuItem icon="plus">Add new</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        {/* <CDBSidebarFooter>
          <div className="px-4 text-center">
             <p> ⓒ Skyseed GmbH </p>
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
};

export default SideBar;