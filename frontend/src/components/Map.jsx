// ─────────────────────────────────────────────────────────────
// Map.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This file renders the interactive Google Map. It loads the map,
// displays fire markers based on data, and shows detailed info in
// a popup window when a marker is clicked. It uses Google Maps API
// and filters for wildfire data only (category ID 8).
// ─────────────────────────────────────────────────────────────

import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import LocationMarker from './LocationMarker.jsx';
import LocationInfoBox from './LocationInfoBox.jsx';
import { useState, useRef } from 'react';

// Define the size of the map container
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

// Default center of the map (center of the US)
const defaultCenter = { lat: 39.8283, lng: -98.5795 };

const Map = ({ eventData }) => {
  const [locationInfo, setLocationInfo] = useState(null); // Holds selected fire info
  const mapRef = useRef(null); // Reference to the map instance

  // Load Google Maps script using the API key from environment variables
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_API,
  });

  // Once the map is loaded, keep a reference to it
  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  // Handle when a user clicks a fire marker
  const handleMarkerClick = (ev, lat, lng, fireName, fireLocation) => {
    const info = {
      fire_name: fireName,
      fire_location: fireLocation,
      date: ev.geometries[0].date,
      source_name: ev.sources[0].id,
      source_link: ev.sources[0].url,
      specific_link: ev.link,
      lat,
      lng
    };

    setLocationInfo(info); // Set the selected info to show in popup

    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng }); // Move the map to center on the marker
    }
  };

  return isLoaded ? (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle} // Apply size
        center={defaultCenter}             // Start position
        zoom={6}                            // Zoom level
        onLoad={onMapLoad}                 // Hook to get the map reference
        options={{                         // Map configuration
          fullscreenControl: true,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          minZoom: 3,
          restriction: {
            latLngBounds: {
              north: 85,
              south: -85,
              west: -180,
              east: 180,
            },
            strictBounds: true,
          },
        }}
      >
        {/* Filter only wildfire events (category ID 8) and place markers */}
        {eventData
          .filter(ev => ev.categories[0].id === 8)
          .map((ev, index) => {
            const lat = ev.geometries[0].coordinates[1];
            const lng = ev.geometries[0].coordinates[0];
            const [fireName, fireLocation] = ev.title.split(',').length > 1
              ? [ev.title.split(',')[0].trim(), ev.title.split(',').slice(1).join(',').trim()]
              : [ev.title, 'Unknown Location'];

            return (
              <LocationMarker
                key={index}
                lat={lat}
                lng={lng}
                onClick={() => handleMarkerClick(ev, lat, lng, fireName, fireLocation)}
              />
            );
          })}

        {/* If a marker is selected, show its info window */}
        {locationInfo && (
          <InfoWindow
            position={{ lat: locationInfo.lat, lng: locationInfo.lng }}
            onCloseClick={() => setLocationInfo(null)}
          >
            <LocationInfoBox info={locationInfo} />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : null; // If the map hasn't loaded, render nothing
};

export default Map;

