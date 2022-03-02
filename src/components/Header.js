import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logoLight from '../logo/brand_light.png'

export default function Header() {
    return (
        <div>
            <Navbar className="bg-forest mb-2 px-4 d-flex justify-content-between" sticky="top">
            <Navbar.Brand>
                <Link to="/">
                    <img height="32px" src={ logoLight } alt="Skyseed Logo"/>
                </Link>
            </Navbar.Brand>
        </Navbar>
        </div>
    )
}
