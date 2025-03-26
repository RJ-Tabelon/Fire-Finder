import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // In a real app, you'd validate credentials here
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter a username and password");
    }
  };

  if (isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>This is where the map will be 🗺️</h1>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
      <div>
      <h1>Fire Finder🔥</h1>
    </div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '8px 16px' }}>
        Login
      </button>
    </div>
  );
}

export default App;