import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logoLight from '../logo/brand_light.png';
import { AuthContext } from '../context/AuthContext';

export default function Header() {

    const { logOutUser } = useContext(AuthContext);

    return (
        <div>
            <Navbar className="fixed-top bg-forest fix-header-height px-4 d-flex justify-content-between">
            <Navbar.Brand>
                <Link to="/">
                    <img height="32px" src={ logoLight } alt="Skyseed Logo"/>
                </Link>
            </Navbar.Brand>
            <NavLink className="nav-link text-neutral-grey font-lato-light-uppercase" to="/" onClick={ logOutUser }>
                Logout
            </NavLink>
        </Navbar>
        </div>
    )
}
