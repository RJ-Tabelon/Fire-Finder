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
import LoginPage from './pages/LoginPage.jsx';    // Login page component
import SignUpPage from './pages/SignUpPage.jsx';  // Sign-up page component
import MapPage from './pages/MapPage.jsx';        // Map page component
import './index.css';                             // Import global styles

function App() {
  return (
    <Router> {/* The Router enables page navigation without full reloads */}
      <Routes> {/* Routes holds all the different paths and their corresponding pages */}
        <Route path="/" element={<LoginPage />} />       {/* Root path loads LoginPage */}
        <Route path="/signup" element={<SignUpPage />} /> {/* '/signup' loads SignUpPage */}
        <Route path="/map" element={<MapPage />} />       {/* '/map' loads the MapPage */}
      </Routes>
    </Router>
  );
}

export default App; // Export the App component for use in main.jsx
