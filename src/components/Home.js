// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const goToManufacturerForm = () => {
        navigate('/manufacturer');
    };

    const goToUserSide = () => {
        navigate('/scanner'); // Navigates to Scanner component
    };

    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h1>Welcome to Satyameds</h1>
                <p>Your trusted solution for medicine authenticity.</p>
                <p>Ensuring every medicine is real and reliable.</p>
                <div className="button-container">
                    <button onClick={goToManufacturerForm} className="manufacturer-btn">
                        Manufacturer Side
                    </button>
                    <button onClick={goToUserSide} className="user-btn">
                        User Side
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
