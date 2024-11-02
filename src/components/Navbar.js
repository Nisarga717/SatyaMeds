// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar-title">Satyameds</h1>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/manufacturer" className="nav-link">Manufacturer</Link>
            </div>
        </nav>
    );
}

export default Navbar;
