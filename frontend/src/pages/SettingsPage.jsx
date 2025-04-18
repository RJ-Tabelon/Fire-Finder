// ─────────────────────────────────────────────────────────────
// SettingsPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// Settings page that displays account info, allows setting a location
// (which places a blue marker on the map), and provides a logout button.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import '../styles/settings.css';

function SettingsPage({ username = 'johndoe', userLocation, onSetUserLocation }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const navigate = useNavigate();

  const handleSetLocation = async () => {
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lngNum)) {
      alert('Please enter valid numbers for latitude and longitude.');
      return;
    }

    const locationData = {
      name: `(${latNum}, ${lngNum})`,
      lat: latNum,
      lng: lngNum,
    };

    try {
      await fetch('http://localhost:5001/api/users/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, location: locationData }),
      });

      onSetUserLocation(locationData);
      alert('Location saved and set!');
      navigate('/map');
    } catch (err) {
      console.error('Error updating location:', err);
      alert('Failed to save location');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="settings-page">
      <Header />
      <h2 className="settings-heading">Settings</h2>

      <div className="settings-content">
        <h3>Account Information</h3>
        <div className="account-info">
          <p><strong>Username:</strong> <span className="capitalize">{username}</span></p>
          <p><strong>Location:</strong> <span className="capitalize">{userLocation?.name || 'Not set'}</span></p>
        </div>

        <div className="set-location">
          <h3>Set Location</h3>
          <div className="lat-lng-container">
            <input
              type="text"
              placeholder="Enter Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <button className="set-location-button" onClick={handleSetLocation}>
            Set Coordinates
          </button>
        </div>
      </div>

      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default SettingsPage;
