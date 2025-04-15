// ─────────────────────────────────────────────────────────────
// SignUpPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This component provides a sign-up interface to register new users.
// It collects a username and password, sends a request to the backend
// to create the user, shows a success message, and redirects to login.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'; // For managing form and message states
import { useNavigate } from 'react-router-dom'; // For page redirection
import axios from 'axios'; // HTTP client to communicate with backend

function SignUpPage() {
  const [form, setForm] = useState({ name: '', password: '' }); // User input
  const [message, setMessage] = useState(''); // Feedback message
  const navigate = useNavigate(); // Function to change routes

  // Updates form values dynamically
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission to register a new account
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/users', form); // Send user data to backend
      setMessage('🌲 ACCOUNT CREATED SUCCESSFULLY !');
      setTimeout(() => navigate('/'), 1500); // Go to login after delay
    } catch (err) {
      // Show error message if sign-up fails
      setMessage(err.response?.data?.message || 'ERROR CREATING ACCOUNT ❌');
    }
  };

  return (
    <div className="form-container signup-container">
      <h2 className="signup-heading">CREATE ACCOUNT</h2>
      <div className="form-box">
        <form onSubmit={handleSubmit} className="form-style">
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
          <button type="submit" className="form-button">Sign Up</button>
        </form>

        <div className="form-signup-wrapper">
          <p className="form-signup-text">
            ALREADY HAVE AN ACCOUNT?{' '}
            <span onClick={() => navigate('/')} className="signup-link">LOG IN</span>
          </p>
        </div>
      </div>

      {/* Show response message */}
      {message && (
        <p className={message.startsWith('🌲') ? 'form-message-success' : 'form-message-error'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SignUpPage;