import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './css/CompanyDetails.css';

// Fixing the default marker icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const CenterMapOnClick = ({ lat, lng }) => {
    const map = useMap(); // Hook to get the map instance

    useEffect(() => {
        if (map) {
            map.setView([lat, lng], 13); // Adjust zoom level as needed
        }
    }, [lat, lng, map]);

    return null;
};

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [locations, setLocations] = useState([]);
    const [error, setError] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/companies/${id}`)
            .then(response => {
                setCompany(response.data);
                return axios.get(`http://127.0.0.1:5000/api/companies/${id}/locations`);
            })
            .then(response => {
                setLocations(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the company details or locations!', error);
                setError(error);
            });
    }, [id]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!company) {
        return <div>Loading...</div>;
    }

    return (
        <div className="company-details-container">
            <h1>{company.name}</h1>
            <p>{company.address}</p>
            <div className="map-container">
                <MapContainer
                    center={[company.latitude, company.longitude]}
                    zoom={13}
                    style={{ height: '400px', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[company.latitude, company.longitude]}>
                        <Popup>
                            {company.name}<br />{company.address}
                        </Popup>
                    </Marker>
                    {locations.map(location => (
                        <Marker key={location.id} position={[location.latitude, location.longitude]}>
                            <Popup>
                                {location.name}<br />{location.address}
                            </Popup>
                        </Marker>
                    ))}
                    {selectedLocation && (
                        <CenterMapOnClick lat={selectedLocation.latitude} lng={selectedLocation.longitude} />
                    )}
                </MapContainer>
            </div>
            <div className="locations-section">
                <h2>Locations</h2>
                <div className="locations-list">
                    {locations.map(location => (
                        <div key={location.id} className="location-item">
                            <div className="location-details">
                                <strong>{location.name}</strong><br />
                                {location.address}<br />
                                Latitude: {location.latitude}, Longitude: {location.longitude}
                            </div>
                            <button
                                className="location-button"
                                onClick={() => setSelectedLocation(location)}
                            >
                                View on Map
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Link to="/" className="back-button">Back to List</Link>
        </div>
    );
};

export default CompanyDetails;
