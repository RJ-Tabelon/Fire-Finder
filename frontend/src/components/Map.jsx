import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import LocationMarker from './LocationMarker.jsx';
import LocationInfoBox from './LocationInfoBox.jsx';
import { useState } from 'react';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const Map = ({ eventData, center = { lat: 39.8283, lng: -98.5795 }, zoom = 6 }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_API,
  });

  return isLoaded ? (
    <div style={{ position: 'relative' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{
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
                onClick={() =>
                  setLocationInfo({
                    fire_name: fireName,
                    fire_location: fireLocation,
                    date: ev.geometries[0].date,
                    source_name: ev.sources[0].id,
                    source_link: ev.sources[0].url,
                    specific_link: ev.link,
                    lat,
                    lng
                  })
                }
              />
            );
          })}
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
  ) : null;
};

export default Map;
