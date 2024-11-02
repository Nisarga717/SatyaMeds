// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ManufacturerForm from './components/Manufacturer';
import Scanner from './components/Scanner';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/manufacturer" element={<ManufacturerForm />} />
                    <Route path="/scanner" element={<Scanner />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
