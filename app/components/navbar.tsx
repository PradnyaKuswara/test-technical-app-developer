'use client';

import Link from 'next/link';
import React from 'react';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-0 py-3">
            <div className="container-xl">
                <div className="navbar-brand text-black">
                    <h5>Rick and Morty</h5>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-lg-auto">
                        <Link
                            className={`nav-item nav-link `}
                            href="/"
                            aria-current="page"
                        >
                            Character
                        </Link>
                        <Link
                            className={`nav-item nav-link `}
                            href="/character/location"
                        >
                            Location
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
