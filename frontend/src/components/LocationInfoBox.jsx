// ─────────────────────────────────────────────────────────────
// LocationInfoBox.jsx
// ─────────────────────────────────────────────────────────────
// PURPOSE:
// This component displays detailed information about a wildfire
// when a user clicks on a location marker on the map. It shows
// the fire's name, location, date, source, and relevant links.
// ─────────────────────────────────────────────────────────────

const LocationInfoBox = ({ info }) => {
  // Format the date from raw ISO string into a readable format (e.g. Apr 15, 2025)
  const formattedDate = new Date(info.date).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  });

  return (
    <div className="location-info"> {/* Container for all info */}
      <h2>Wildfire Information</h2>
      <ul>
        <li><span className="label">FIRE NAME:</span> <strong>{info.fire_name}</strong></li>
        <li><span className="label">LOCATION:</span> <strong>{info.fire_location}</strong></li>
        <li>COORDINATES: <strong>[{info.lat}, {info.lng}]</strong></li>
        <li><span className="label">REPORTED ON:</span> <strong>{formattedDate} (UTC)</strong></li>
        <li>SOURCE: <strong><a href={info.source_link} target="_blank" rel="noopener noreferrer">{info.source_name}</a></strong></li>
        <li>MORE INFO: <strong><a href={info.specific_link} target="_blank" rel="noopener noreferrer">See Official NASA Report</a></strong></li>
      </ul>
    </div>
  );
};

export default LocationInfoBox; // Export for use in the map's info window