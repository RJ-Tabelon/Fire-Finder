// ─────────────────────────────────────────────────────────────
// MapPage.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This page fetches wildfire event data from NASA's EONET API
// and displays it using the Map component. It shows a Loader
// while the data is being retrieved, then renders the map
// and header once data is ready.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'; // useState for state, useEffect to fetch data
import Map from '../components/Map.jsx'; // Component to display map and markers
import Loader from '../components/Loader.jsx'; // Shows loading spinner and text
import Header from '../components/Header.jsx'; // Displays title and nav bar

function MapPage() {
  const [eventData, setEventData] = useState([]); // Holds wildfire events
  const [loading, setLoading] = useState(false);  // Controls loader visibility

  useEffect(() => {
    // Function to fetch events from NASA API
    const fetchEvents = async () => {
      setLoading(true); // Show loader
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events'); // Get events
      const { events } = await res.json(); // Extract 'events' array from response
      setEventData(events); // Store in state
      setLoading(false); // Hide loader
    };

    fetchEvents(); // Call the function when component mounts
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {/* Show Loader while loading is true, else show header + map */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Map eventData={eventData} /> {/* Pass fetched data to Map */}
        </>
      )}
    </div>
  );
}

export default MapPage;