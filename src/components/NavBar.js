import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import logoDark from '../logo/brand_dark.png';

export default function NavBar() {
  return (
    <div>
        <Navbar bg="neutral-grey" className="fix-header-height bg-neutral-grey px-4 d-flex justify-content-between" sticky="top">
            <Navbar.Brand>
                <Link to="/">
                    <img height="32px" src={ logoDark } alt="Skyseed Logo"/>
                </Link>
            </Navbar.Brand>
            <Nav className="d-flex justify-content-end">
                <Nav.Link href="http://www.skyseed.eco">About</Nav.Link>
                <Nav.Link href="/home">Internal</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
        </Navbar>
    </div>
  )
}
