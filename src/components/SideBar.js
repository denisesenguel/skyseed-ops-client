import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as CgIcons from "react-icons/cg";
import { IconContext } from "react-icons/lib";

const SidebarNav = styled.nav`
background: #15171c;
width: ${({ sidebar }) => (sidebar ? "250px" : "60px")};
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 60px;
left: 0px;
transition: 350ms;
z-index: 10;
`;
// bg-custom-primary fix-sidebar-width (add position, transition, top and left to it!) fix-content-height d-flex justify-content-center position-fixed (?)

const SidebarLink = styled(Link)`
display: flex;
color: #e1e9fc;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;

&:hover {
	background: #252831;
	border-left: 4px solid green;
	cursor: pointer;
}
`;

// className= "d-flex text-color-neutral-grey justify-content-space-between align-iemts-center p-5 list-style-none"
// hover: later

const span = styled.span`
margin-left: 16px;
`;
// mx-4

const DropdownLink = styled(Link)`
background: #252831;
height: 60px;
padding-left: 3rem;
display: flex;
align-items: center;
text-decoration: none;
color: #f5f5f5;
font-size: 18px;

&:hover {
	background: green;
	cursor: pointer;
}
`;
// fix-height(?) p-1 d-flex align-items-center text-decoration-none text-color-neutral-grey 


const SidebarWrap = styled.div`
width: 100%;
`;
// w-100

function Sidebar() {

  const [sidebar, setSidebar] = useState(true);
  const [subNav, setSubNav] = useState([false, false]);
  
  const toggleSidebar = () => setSidebar(!sidebar);
  function toggleSubNav(index) {
    const newList = [...subNav];
    newList[index] = !newList[index];
    setSubNav(newList);
  }

return (
	<>
	<IconContext.Provider value={{ color: "#F4F6F7" }}>
		<SidebarNav sidebar={ sidebar }>
		<SidebarWrap>

			
        {
          sidebar ?
          <div className="d-flex justify-content-between align-items-center p-4 text-neutral-grey border-bottom">
            <h6 className="m-0">Hello Person!</h6> 
            <Link to="#" className="d-flex align-items-center">
              <AiIcons.AiOutlineClose onClick={ toggleSidebar } size="20px"/>
            </Link> 
          </div> :
          <div className="w-100 p-4 d-flex align-items-center justify-content-center">
            <Link to="#">  
              <FaIcons.FaBars onClick={ toggleSidebar } size="25px"/>
            </Link>
          </div>
        }
			

      {
        sidebar &&
        <div>

          <Link 
            to="/home" 
            className= "d-flex text-neutral-grey justify-content-space-between align-iemts-center p-4 text-decoration-none"
          >
            <div className="d-flex align-items-center">
              <RiIcons.RiHome2Line />
              <span className="mx-2 my-0">Home</span>
            </div>
          </Link>

          <Link 
            to="#" 
            onClick={ () => toggleSubNav(0) }
            className= "d-flex text-neutral-grey justify-content-space-between align-iemts-center px-4 text-decoration-none"
          >
          <div className="d-flex align-items-center">
            <CgIcons.CgTrees />
            <span className="mx-2 my-0">Projects</span>
          </div>
          <div>
            { subNav[0] ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill /> }
          </div>
          </Link>
          {
            subNav[0] &&
              <div>
                <DropdownLink to="/home/projects">
                  <span> Browse All </span>
                </DropdownLink>
                <DropdownLink to="/home/projects/my-projects">
                  <span> My Projects </span>
                </DropdownLink>
                <DropdownLink to="/home/projects/create">
                  {/* icon here? */}
                  <span> Add New </span>
                </DropdownLink>
              </div>
          }

          <Link 
            to="#" 
            onClick={ () => toggleSubNav(1) }
            className= "d-flex text-neutral-grey justify-content-space-between align-iemts-center p-4 text-decoration-none"
          >
          <div className="d-flex align-items-center">
          <CgIcons.CgList />
            <span className="mx-2 my-0">Customers</span>
          </div>
          <div>
          { subNav[1] ? <RiIcons.RiArrowUpSFill /> : <RiIcons.RiArrowDownSFill /> }
          </div>
          </Link>
          {
            subNav[1] &&
              <div>
                <DropdownLink to="/home/customers">
                  <span> Browse All </span>
                </DropdownLink>
                <DropdownLink to="/home/customers/create">
                  <span> Add New </span>
                </DropdownLink>
              </div>
          }
        </div>
      }
		</SidebarWrap>
		</SidebarNav>
	</IconContext.Provider>
	</>
);
};

export default Sidebar;



