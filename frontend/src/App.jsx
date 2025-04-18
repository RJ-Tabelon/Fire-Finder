// ─────────────────────────────────────────────────────────────
// App.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This is the main application component for a React-based web app.
// It sets up client-side routing using React Router. It defines
// LoginPage, SignUpPage, MapPage, etc.
//
// The "Router" wraps the entire app so that users can navigate
// to different pages without refreshing the browser. Each "Route"
// matches a specific path and renders the appropriate component.
// ─────────────────────────────────────────────────────────────

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing tools from React Router
import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage.jsx';    // Login page component
import SignUpPage from './pages/SignUpPage.jsx';  // Sign-up page component
import MapPage from './pages/MapPage.jsx';        // Map page component
import FireSafetyPage from './pages/FireSafetyPage.jsx'; // Fire Safety Page component
import AboutPage from './pages/AboutPage.jsx';
import './index.css';                             // Import global styles

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events');
      const { events } = await res.json();
      setEventData(events);
      setLoading(false);
    };

    fetchEvents();
  }, []); // fetch once

  return (
    <Router> {/* The Router enables page navigation without full reloads */}
      <Routes> {/* Routes holds all the different paths and their corresponding pages */}
        <Route path="/" element={<LoginPage />} />       {/* Root path loads LoginPage */}
        <Route path="/signup" element={<SignUpPage />} /> {/* '/signup' loads SignUpPage */}
        <Route path="/map" element={<MapPage eventData={eventData} loading={loading} />} />       {/* '/map' loads the MapPage */}
        <Route path="/firesafety" element={<FireSafetyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App; // Export the App component for use in main.jsx
