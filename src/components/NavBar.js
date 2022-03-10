import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import logoDark from "../logo/brand_dark.png";
import { AuthContext } from "../context/AuthContext";
import * as HiIcons from "react-icons/hi";

export default function NavBar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="fix-header-height fixed-top bg-neutral-grey px-4 d-flex justify-content-between">
        <Navbar.Brand>
          <Link to="/">
            <img height="32px" src={logoDark} alt="Skyseed Logo" />
          </Link>
        </Navbar.Brand>
        <Nav className="d-flex justify-content-end">
          <Nav.Link
            className="text-primary-cstm font-lato-light-uppercase"
            href="http://www.skyseed.eco"
            target="_blank"
          >
            <div className="d-flex align-items-center">
              <HiIcons.HiOutlineExternalLink className="mx-1"/>
              About
            </div>
          </Nav.Link>
          {isLoggedIn ? (
            <>
            <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-secondary-cstm" : "text-primary-cstm"
                  } nav-link font-lato-light-uppercase`
                }
                to="/home"
              >
                Internal
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? "text-secondary-cstm" : "text-primary-cstm"
                } nav-link font-lato-light-uppercase`
              }
              to="/"
              onClick={logOutUser}
            >
              Logout
            </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-secondary-cstm" : "text-primary-cstm"
                  } nav-link font-lato-light-uppercase`
                }
                to="/signup"
              >
                Signup
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-secondary-cstm" : "text-primary-cstm"
                  } nav-link font-lato-light-uppercase`
                }
                to="/login"
              >
                Login
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar>
    </div>
  );
}
