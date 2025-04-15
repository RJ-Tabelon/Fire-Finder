// ─────────────────────────────────────────────────────────────
// LoginPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This component provides a login interface for users.
// It collects user credentials, sends a login request to the backend,
// displays a welcome message if successful, and navigates the user
// to the map view. If the login fails, it displays an error message.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'; // useState manages form and message states
import { useNavigate } from 'react-router-dom'; // Enables navigation between pages
import axios from 'axios'; // HTTP client for making API calls

function LoginPage() {
  const navigate = useNavigate(); // Allows redirection to other routes

  // Store user inputs (username and password)
  const [form, setForm] = useState({ name: '', password: '' });

  // Message shown after login attempt (success or error)
  const [message, setMessage] = useState('');

  // Updates the form state when input values change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // dynamic update based on input name
  };

  // Handles login when form is submitted
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    try {
      const res = await axios.post('http://localhost:5001/api/users/login', form); // POST to login route

      const name = res.data.data.name; // Extract name from response
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1); // Capitalize first letter

      setMessage(`🌲 WELCOME, ${capitalizedName} !`); // Show welcome message

      // Redirect to map page after 1 second delay
      setTimeout(() => navigate('/map'), 1000);
    } catch (err) {
      // Show error message if login fails
      setMessage(err.response?.data?.message || 'LOGIN FAILED');
    }
  };

  return (
    <div className="form-container">
      <div className="logo-container">
        <h1 className="monofett">
          <div>Fire</div>
          <div>Finder</div>
        </h1>
      </div>

      <div className="form-box">
        <form onSubmit={handleLogin} className="form-style">
          <input
            name="name"
            placeholder="Username"
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="form-input"
          />
          <button type="submit" className="form-button">Login</button>
        </form>

        <div className="form-signup-wrapper">
          <p className="form-signup-text">
            DON'T HAVE AN ACCOUNT?{' '}
            <span onClick={() => navigate('/signup')} className="signup-link">SIGN UP</span>
          </p>
        </div>
      </div>

      {/* Show message only if it exists */}
      {message && (
        <p className={message.startsWith('🌲') ? 'form-message-success' : 'form-message-error'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginPage;