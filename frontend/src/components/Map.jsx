// ─────────────────────────────────────────────────────────────
// Map.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This file renders the interactive Google Map. It loads the map,
// displays fire markers based on data, and shows detailed info in
// a popup window when a marker is clicked. It uses Google Maps API
// and filters for wildfire data only (category ID 8).
// ─────────────────────────────────────────────────────────────

import { GoogleMap, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api';
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

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function getDistanceInMiles(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 0.621371; // Convert to miles
}

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}


const Map = ({ eventData, userLocation }) => {
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
        center={(userLocation && userLocation.lat && userLocation.lng) ? userLocation : defaultCenter} // Start position
        zoom={7}                            // Zoom level
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

	    const isNearby = userLocation && getDistanceInMiles(userLocation.lat, userLocation.lng, lat, lng) <= 30;

            return (
              <Marker
                key={index}
                position={{ lat, lng }}
                onClick={() => handleMarkerClick(ev, lat, lng, fireName, fireLocation)}
                icon={isNearby 
		  ? {
		      url: 'https://api.iconify.design/mdi:fire.svg?color=red',
		      scaledSize: { width: 40, height: 40 }
	            }
		  : {
		      url: 'https://api.iconify.design/mdi:fire.svg?color=orange',
		      scaledSize: { width: 40, height: 40 }
		    }
		}
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

	{/* Place user marker */}
	{userLocation && userLocation.lat && userLocation.lng && (
        <Marker 
	    position={{ lat: userLocation.lat, lng: userLocation.lng }}
	    icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: { width: 40, height: 40 }
            }}
	  />
	)}
      </GoogleMap>
    </div>
  ) : null; // If the map hasn't loaded, render nothing
};

export default Map;

