import React from 'react';
import NavBar from '../components/NavBar';

export default function LandingPage() {

    return (
        <div>
            <NavBar />
            <div className="bg-forest vh-100 text-neutral-grey d-flex flex-column justify-content-center align-items-center">
                <h1>LandingPage!</h1>
                <h4>Something cool about Reforestation</h4>
            </div>
      </div>
    )
}
