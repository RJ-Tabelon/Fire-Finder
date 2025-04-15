// ─────────────────────────────────────────────────────────────
// LocationMarker.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// Renders a single fire icon on the map at the given latitude
// and longitude. When clicked, it triggers the provided onClick
// function to show more information.
// ─────────────────────────────────────────────────────────────

import { Marker } from '@react-google-maps/api'; // Import Google Maps marker component

const LocationMarker = ({ lat, lng, onClick }) => (
  <Marker
    position={{ lat, lng }}         // Position of the marker
    onClick={onClick}               // What happens when you click the marker
    icon={{                         // Custom fire icon
      url: 'https://api.iconify.design/mdi:fire.svg?color=red',
      scaledSize: { width: 30, height: 30 } // Icon size in pixels
    }}
  />
);

export default LocationMarker; // Export for use in Map.jsx