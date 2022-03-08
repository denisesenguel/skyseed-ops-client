import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as CgIcons from "react-icons/cg";
import { IconContext } from "react-icons/lib";
import { AuthContext } from "../context/auth.context";

// navlink:
// font-size: 18px;
// &:hover {
// 	background: #252831;
// 	border-left: 4px solid green;
// 	cursor: pointer;
// };


function Sidebar() {

  // set breakpoint for window width in px for sidebar autohide
  const breakPoint = 768;
  const [sidebar, setSidebar] = useState((window.innerWidth > breakPoint) ? true : false);
  const [subNav, setSubNav] = useState([false, false]);
  const { user } = useContext(AuthContext);

  // on window resize update sidebar state
  useEffect(() => {
    const onResize = () => setSidebar((window.innerWidth > breakPoint) ? true : false);
    window.addEventListener('resize', onResize)
  }, [])

  const toggleSidebar = () => setSidebar(!sidebar);
  
  function toggleSubNav(index) {
    const newList = [...subNav];
    newList[index] = !newList[index];
    setSubNav(newList);
  }

return (
	<>
	<IconContext.Provider value={{ color: "#F4F6F7" }}>
		<nav className={ `bg-primary-cstm fix-sidebar-position fix-content-height d-flex justify-content-center position-fixed 
                      ${ (sidebar) ? "fix-sidebar-width" : "fix-sidebar-width-hidden" }` }>
		<div className="w-100">

      {
        sidebar ?
          <div className="d-flex justify-content-between align-items-center p-4 text-neutral-grey border-bottom">
            <div>
              <h6 className="m-0">Hello { user.firstName }!</h6> 
              { (user.role === 'admin') && <p className="m-0 font-xs text-muted">You're an admin.</p> }
            </div>
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
            className= "d-flex text-neutral-grey justify-content-space-between align-iemts-center mt-4 p-4 text-decoration-none"
          >
            <div className="d-flex align-items-center">
              <RiIcons.RiHome2Line />
              <span className="mx-2 my-0">Home</span>
            </div>
          </Link>

          <Link 
            to="#" 
            onClick={ () => toggleSubNav(0) }
            className= "d-flex text-neutral-grey justify-content-between align-iemts-center p-4 text-decoration-none"
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
                <Link 
                  to="/home/projects"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  <span> Browse All </span>
                </Link>
                <Link 
                  to="/home/projects/my-projects"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  <span> My Projects </span>
                </Link>
                <Link 
                  to="/home/projects/create"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  {/* icon here? */}
                  <span> Add New </span>
                </Link>
              </div>
          }

          <Link 
            to="#" 
            onClick={ () => toggleSubNav(1) }
            className= "d-flex text-neutral-grey justify-content-between align-iemts-center p-4 text-decoration-none"
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
                <Link 
                  to="/home/customers"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  <span> Browse All </span>
                </Link>
                <Link 
                  to="/home/customers/create"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  <span> Add New </span>
                </Link>
              </div>
          }
        </div>
      }
		</div>
		</nav>
	</IconContext.Provider>
	</>
);
};

export default Sidebar;



