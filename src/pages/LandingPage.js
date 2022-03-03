import React from 'react';
import NavBar from '../components/NavBar';

export default function LandingPage() {

    return (
        <div>
            <NavBar />
            <div className="fix-content-height bg-forest text-neutral-grey d-flex flex-column justify-content-center align-items-center">
                <h1>Reforestation at Scale</h1>
                <h4 className="font-roboto-slab">Using Drones and Pelletized Seeds</h4>
            </div>
      </div>
    )
}
