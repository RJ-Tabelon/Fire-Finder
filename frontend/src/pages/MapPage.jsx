import { useState, useEffect } from 'react';
import Map from '../components/Map.jsx';
import Loader from '../components/Loader.jsx';
import Header from '../components/Header.jsx';

function MapPage() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events');
      const { events } = await res.json();
      setEventData(events);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Map eventData={eventData} />
        </>
      )}
    </div>
  );
}

export default MapPage;
