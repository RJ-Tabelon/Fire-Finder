import Navbar from './Navbar';
import Home from './Home';

function App() {
  const title = 'FireFinder User Login'
  //const link = "http://www.google.com"

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home />
        <h1>{ title }</h1>
        <p>Please enter all required fields.</p>

        {/* <a href={ link }>A link would appear as this</a> */}
      </div>
    </div>
  );
}

export default App;
