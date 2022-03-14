import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as CgIcons from "react-icons/cg";
import { IconContext } from "react-icons/lib";
import { AuthContext } from "../context/AuthContext";

function SideBar(props) {

  const { sidebar, toggleSidebar } = props;

  const [subNav, setSubNav] = useState([false, false]);
  const { user } = useContext(AuthContext);
  
  function toggleSubNav(index) {
    const newList = [...subNav];
    newList[index] = !newList[index];
    setSubNav(newList);
  }

return (
	<>
	<IconContext.Provider value={{ color: "#F4F6F7" }}>
		<nav className={ `SideBar bg-primary-cstm d-flex justify-content-center ${ (!sidebar) && "hidden" }` }>
		<div className="w-100">

      {
        sidebar ?
          <div className="d-flex justify-content-between align-items-center p-4 text-neutral-grey border-bottom">
            <div>
              <h6 className="m-0">Hallo { user.firstName }!</h6> 
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
            <span className="mx-2 my-0">Projekte</span>
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
                  <span> Übersicht </span>
                </Link>
                <Link 
                  to="/home/projects/my-projects"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  <span> Meine Projekte </span>
                </Link>
                <Link 
                  to="/home/projects/create"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  {/* icon here? */}
                  <span> Hinzufügen </span>
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
            <span className="mx-2 my-0">Kunden</span>
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
                  <span> Übersicht </span>
                </Link>
                <Link 
                  to="/home/customers/create"
                  className = "px-4 mx-4 py-2 d-flex align-items-center text-decoration-none text-neutral-grey"
                >
                  <span> Hinzufügen </span>
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

export default SideBar;



