import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import logoDark from '../logo/brand_dark.png';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {

    const { isLoggedIn, logOutUser } = useContext(AuthContext);

    return (
        <div>
            <Navbar className="fix-header-height fixed-top bg-neutral-grey px-4 d-flex justify-content-between">
                <Navbar.Brand>
                    <Link to="/">
                        <img height="32px" src={ logoDark } alt="Skyseed Logo"/>
                    </Link>
                </Navbar.Brand>
                <Nav className="d-flex justify-content-end">
                    <Nav.Link className="text-primary-cstm" href="http://www.skyseed.eco">About</Nav.Link>
                    <NavLink className="nav-link text-primary-cstm" to="/home">Internal</NavLink>
                    {
                        isLoggedIn ? 
                            <NavLink className="nav-link text-primary-cstm" to="/" onClick={ logOutUser }>
                                Logout
                            </NavLink> :
                            <>
                            <NavLink className="nav-link text-primary-cstm" to="/signup">Signup</NavLink>
                            <NavLink className="nav-link text-primary-cstm" to="/login">Login</NavLink>
                            </>
                    }
                </Nav>
            </Navbar>
        </div>
    )
}
