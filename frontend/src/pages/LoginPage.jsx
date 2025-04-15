import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/users/login', form);

      const name = res.data.data.name;
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

      setMessage(`🌲 WELCOME, ${capitalizedName} !`);
      setTimeout(() => navigate('/map'), 1000);
    } catch (err) {
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
            DON'T HAVE AN ACCOUNT? <span onClick={() => navigate('/signup')} className="signup-link">SIGN UP</span>
          </p>
        </div>

      </div>
      {message && (
        <p className={message.startsWith('🌲') ? 'form-message-success' : 'form-message-error'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginPage;
