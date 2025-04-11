import spinner from './spinner.gif';
import '../index.css';

const Loader = () => {
  return (
    <div className="loader">
      <img src={spinner} alt="Loading" className="loader-gif" />
      <p className="loader-text">Fetching Data...</p>
    </div>
  );
};

export default Loader;