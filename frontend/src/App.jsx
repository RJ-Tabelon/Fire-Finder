import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Shared full-page center container
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column',
  backgroundColor: '#f9f9f9',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  width: '300px',
};

// Login Component
function Home() {
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
      setMessage(`✅ Welcome, ${res.data.data.name}`);
      setTimeout(() => navigate('/map'), 1000); // redirect after brief delay
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Login failed');
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Fire Finder🔥</h1>
      <form onSubmit={handleLogin} style={formStyle}>
        <input
          name="name"
          placeholder="Username"
          onChange={handleChange}
          style={{ width: '100%', padding: '10px' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ width: '100%', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
      <button onClick={() => navigate('/signup')} style={{ marginTop: '20px' }}>
        Create Account
      </button>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
}

// Signup Component
function SignUp() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/users', form);
      setMessage('✅ Account created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Error creating account');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          name="name"
          placeholder="Username"
          onChange={handleChange}
          style={{ width: '100%', padding: '10px' }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={{ width: '100%', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Sign Up</button>
      </form>
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
}

// Map Page
function MapPage() {
  return (
    <div style={containerStyle}>
      <h2>This is where our map should be 🗺️</h2>
    </div>
  );
}

// App Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
