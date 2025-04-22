// ─────────────────────────────────────────────────────────────
// Loader.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// Shows a loading animation and message while data is being fetched.
// Used when waiting for API responses or map initialization.
// ─────────────────────────────────────────────────────────────

import spinner from './spinner.gif'; // Local loading GIF animation
import '../index.css';               // Import CSS for loader styles

const Loader = () => {
  return (
    <div className="loader"> {/* Full-screen centered container */}
      <img src={spinner} alt="Loading" className="loader-gif" /> {/* Animated spinner */}
      <p className="loader-text">Fetching Data...</p> {/* Loading message */}
    </div>
  );
};

export default Loader; // Export the Loader for use in pages