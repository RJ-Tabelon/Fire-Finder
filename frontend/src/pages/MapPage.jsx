// ─────────────────────────────────────────────────────────────
// MapPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This page fetches wildfire event data from NASA's EONET API
// and displays it using the Map component. It shows a Loader
// while the data is being retrieved, then renders the map
// and header once data is ready.
// ─────────────────────────────────────────────────────────────

import Map from '../components/Map.jsx'; // Component to display map and markers
import Loader from '../components/Loader.jsx'; // Shows loading spinner and text
import Header from '../components/Header.jsx'; // Displays title and nav bar

function MapPage({ eventData, loading, userLocation }) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {/* Show Loader while loading is true, else show header + map */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Map eventData={eventData} userLocation={userLocation} /> {/* Pass fetched data to Map */}
        </>
      )}
    </div>
  );
}

export default MapPage;
