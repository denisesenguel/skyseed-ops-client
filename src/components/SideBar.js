import React, { useContext } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  //CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";
import { Accordion } from 'react-bootstrap';

function SideBar() { 

  const { user } = useContext(AuthContext);

  return (
    <div className="d-flex fix-content-height overflow-scroll fix-sidebar-position">
      <CDBSidebar className="fix-sidebar-width bg-primary-cstm text-neutral-grey">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          Hello, { user?.firstName }
          { (user?.role === 'admin') && <p className="mb-1">Admin</p> } 
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {/* might want to assign activeClassName="activeClicked" to these NavLinks */}
            <NavLink exact="true" to="/home" >
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <Accordion className="bg-primary-cstm">
              <Accordion.Item eventKey="0" className="bg-primary-cstm">
                <Accordion.Header className="bg-primary-cstm p-0">
                  <CDBSidebarMenuItem className="m-0" icon="tree">Projects</CDBSidebarMenuItem>
                </Accordion.Header>
                <Accordion.Body>
                  <NavLink exact="true" to="/home/projects">
                      <CDBSidebarMenuItem>View All</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact="true" to="/home/projects/my-projects">
                      <CDBSidebarMenuItem>My Projects</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact="true" to="/home/projects/create">
                      <CDBSidebarMenuItem>Add new</CDBSidebarMenuItem>
                  </NavLink>
                </Accordion.Body>
              </Accordion.Item>
              </Accordion>
              <Accordion>
              <Accordion.Item eventKey="0" className="bg-primary-cstm">
                <Accordion.Header className="bg-primary-cstm p-0">
                  <CDBSidebarMenuItem className="m-0" icon="list">Customers</CDBSidebarMenuItem>
                </Accordion.Header>
                <Accordion.Body>
                  <NavLink exact="true" to="/home/customers">
                      <CDBSidebarMenuItem>View All</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact="true" to="/home/customers/create">
                      <CDBSidebarMenuItem>Add new</CDBSidebarMenuItem>
                  </NavLink>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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