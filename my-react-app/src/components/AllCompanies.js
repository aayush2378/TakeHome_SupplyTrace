import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TextField, List, ListItem, ListItemText, Box } from '@mui/material';
import './css/AllCompanies.css';

const AllCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/companies')
            .then(response => {
                setCompanies(response.data);
                setFilteredCompanies(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError(error);
            });
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCompanies(companies);
        } else {
            setFilteredCompanies(
                companies.filter(company =>
                    company.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, companies]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Box className="container">
            <h1 className="title">All Companies</h1>
            <TextField
                label="Search Companies"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <List className="company-list">
                {filteredCompanies.map(company => (
                    <ListItem button key={company.company_id} className="company-item">
                        <ListItemText
                            primary={
                                <Link to={`/company/${company.company_id}`} className="company-link">
                                    {company.name}
                                </Link>
                            }
                            secondary={company.address}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AllCompanies;
