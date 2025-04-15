// ─────────────────────────────────────────────────────────────
// Header.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// Defines the visual header at the top of the app, which includes
// the app title and navigation buttons (Home, Fire Safety, etc).
// Styling is handled by importing index.css classes.
// ─────────────────────────────────────────────────────────────

import '../index.css'; // Import global CSS for consistent styling

const Header = () => {
  return (
    <header className="header"> {/* Main header container */}
      <div className="header-container"> {/* Inner container with layout */}
        <h1>Fire Finder</h1> {/* App name */}
        <nav className="nav-buttons"> {/* Navigation buttons */}
          <button>Home</button>
          <button>Fire Safety</button>
          <button>About</button>
          <button>Settings</button>
        </nav>
      </div>
    </header>
  );
};

export default Header; // Export the Header component for use in other files

