import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Charger } from "../types";
import { useEffect } from "react";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const createChargerIcon = (color: string) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  className: 'custom-charger-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});
const stdIcon = createChargerIcon('#10b981');

function MapRecenter({ chargers }: { chargers: Charger[] }) {
  const map = useMap();
  useEffect(() => {
    if (chargers.length > 0) {
      const bounds = L.latLngBounds(chargers.map(c => [c.coordinates.lat, c.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [chargers, map]);
  return null;
}

export function MapComponent({ chargers }: { chargers: Charger[] }) {
  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <MapContainer center={[12.9307, 77.5833]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {chargers.map((c) => (
          <Marker key={c.id} position={[c.coordinates.lat, c.coordinates.lng]} icon={stdIcon}>
            <Popup>
              <strong style={{ color: '#000' }}>{c.name}</strong><br/>
              <span style={{ color: '#000' }}>{c.powerKw}kW • {c.connectorType}</span>
            </Popup>
          </Marker>
        ))}
        <MapRecenter chargers={chargers} />
      </MapContainer>
    </div>
  );
}
