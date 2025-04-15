import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/users', form);
      setMessage('✅ Account created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Error creating account');
    }
  };

  return (
    <div className="form-container">
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

      {/* Message below the form box */}
      {message && (
        <p className={message.startsWith('✅') ? 'form-message-success' : 'form-message-error'}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SignUpPage;
