import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllCompanies from './components/AllCompanies';
import CompanyDetails from './components/CompanyDetails';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<AllCompanies />} />
                    <Route path="/company/:id" element={<CompanyDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;