// ─────────────────────────────────────────────────────────────
// main.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This is the application's entry point. It initializes the React
// rendering process by targeting the root DOM element and renders
// the <App /> component. The StrictMode helps detect problems
// during development.
// ─────────────────────────────────────────────────────────────

import { StrictMode } from 'react';                    // Optional wrapper for highlighting issues in development
import { createRoot } from 'react-dom/client';         // React DOM rendering function
import './index.css';                                  // Import global CSS
import App from './App.jsx';                           // Import main App component

// Locate the HTML element with id 'root' and mount the app there
createRoot(document.getElementById('root')).render(
  <StrictMode>      {/* Helps catch potential issues in dev */}
    <App />         {/* Renders the main App component */}
  </StrictMode>,
);
