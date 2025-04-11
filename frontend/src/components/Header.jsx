import '../index.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Fire Finder</h1>
        <nav className="nav-buttons">
          <button>Home</button>
          <button>Fire Safety</button>
          <button>About</button>
          <button>Settings</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
