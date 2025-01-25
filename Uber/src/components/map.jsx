import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing Marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});


function MapWithInput({from,to}) {
  // start location
  const [position, setPosition] = useState(null);
  // end location
  const [dposition, setdPosition] = useState(null);
  

  // Fetch coordinates of start and end
  useEffect(() => {
    // fetching start points 
    const getCoordinates = async (placeName) => {
      const apiKey = 'a3d9f1dbddf043128c8d379996785793';  
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(placeName)}&key=${apiKey}`);
        const data = await response.json();
        console.log(data);
        if (data.results && data.results.length > 0) {
          const lat_ = data.results[0].geometry.lat;
          const lng_ = data.results[0].geometry.lng;
          setPosition({ lat: lat_, lng: lng_ });
        } else {
          console.error('No results found');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };
    getCoordinates(from);
    // fetching end points
    const getCoordinates2 = async (placeName) => {
      const apiKey = 'a3d9f1dbddf043128c8d379996785793';  
      try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(placeName)}&key=${apiKey}`);
        const data = await response.json();
        console.log(data);
        if (data.results && data.results.length > 0) {
          const lat_ = data.results[0].geometry.lat;
          const lng_ = data.results[0].geometry.lng;
          setdPosition({ dlat: lat_, dlng: lng_ });
        } else {
          console.error('No results found');
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };
    getCoordinates2(to);
  }, [from,to]);
 
  return (
    <div>

      {position && dposition && (
        <MapContainer center={[position.lat, position.lng]} zoom={12} style={{ height: "620px", width: "900" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[position.lat, position.lng]}>
            <Popup>
              Latitude: {position.lat}, Longitude: {position.lng}
            </Popup>
          </Marker>
          <Marker position={[dposition.dlat,dposition.dlng]}>
            <Popup>
              Latitude: {dposition.dlat}, Longitude: {dposition.dlng}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default MapWithInput;
