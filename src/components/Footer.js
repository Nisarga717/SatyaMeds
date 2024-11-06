// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; 2024 Satyameds. All rights reserved.</p>
            <div className="footer-links">
                <a href="/about">About Us</a> | 
                <a href="/contact">Contact</a> | 
                <a href="/faq">FAQ</a>
            </div>
        </footer>
    );
}

export default Footer;
