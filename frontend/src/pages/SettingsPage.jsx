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

function SettingsPage({ onSetUserLocation }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedUserLocation = storedUser?.location;
  const username = storedUser?.name || '';
  // ?.toLowerCase() || '';

  const handleSetLocation = async () => {
    const latNum = parseFloat(latitude);
    const lngNum = parseFloat(longitude);

    if (isNaN(latNum) || isNaN(lngNum) || 
	latNum < -90 || latNum > 90 ||
	lngNum < -180 || lngNum > 180) {
      setMessage('INVALID LOCATION !');
      setMessageColor('red');
      return;
    }

    // TO DO: Fix call to users/location/:id to avoid security issue of checking for passed-in username rather than unique ID
    try {
      const res = await fetch('http://localhost:5001/api/users/location/:id', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, lat: latNum, lng: lngNum }),
      });

      const data = await res.json();

      // TO DO: Fix bug that prevents display of valid or invalid location

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.data));       
        onSetUserLocation({ name: `(${latNum}, ${lngNum})`, lat: latNum, lng: lngNum });
        setMessage('LOCATION UPDATED SUCCESSFULLY !');
        setMessageColor('green');
      } else {
        setMessage(data.message || 'INVALID LOCATION !');
        setMessageColor('red');
      }
    } catch (err) {
      setMessage('SERVER ERROR');
      setMessageColor('red');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userLocation');
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
          <p><strong>Location:</strong> 
            <span className="capitalize">
              {(storedUserLocation?.lat != null && storedUserLocation?.lng != null)
                ? ` (${storedUserLocation.lat}, ${storedUserLocation.lng})`
                : ' NOT SET'}
            </span>
          </p>
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
      {message && (
        <p className={messageColor === 'green' ? 'settings-message-success' : 'settings-message-error'}>
          {message}
        </p>
      )}  
    </div>
  );
}

export default SettingsPage;
