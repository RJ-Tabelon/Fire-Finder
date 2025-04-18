// ─────────────────────────────────────────────────────────────
// Header.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// Defines the visual header at the top of the app, which includes
// the app title and navigation buttons (Home, Fire Safety, etc).
// Styling is handled by importing index.css classes.
// ─────────────────────────────────────────────────────────────

import '../index.css'; // Import global CSS for consistent styling
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const location = useLocation(); // Get current path

  return (
    <header className="header"> {/* Main header container */}
      <div className="header-container"> {/* Inner container with layout */}
        <h1>Fire Finder</h1> {/* App name */}
        <nav className="nav-buttons"> {/* Navigation buttons */}
          <button onClick={() => navigate('/map')} className={location.pathname === '/map' ? 'active-nav' : ''} >Home</button>
          <button onClick={() => navigate('/firesafety')} className={location.pathname === '/firesafety' ? 'active-nav' : ''} >Fire Safety</button>
          <button onClick={() => navigate('/about')} className={location.pathname === '/about' ? 'active-nav' : ''} >About</button>
          <button>Settings</button>
        </nav>
      </div>
    </header>
  );
};

export default Header; // Export the Header component for use in other files

