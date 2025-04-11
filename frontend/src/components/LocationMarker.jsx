import { Marker } from '@react-google-maps/api';

const LocationMarker = ({ lat, lng, onClick }) => (
  <Marker
    position={{ lat, lng }}
    onClick={onClick}
    icon={{
      url: 'https://api.iconify.design/mdi:fire.svg?color=red',
      scaledSize: { width: 30, height: 30 }
    }}
  />
);

export default LocationMarker;
