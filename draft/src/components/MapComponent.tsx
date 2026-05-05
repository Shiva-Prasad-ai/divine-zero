import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Charger, Coordinates } from "../types";
import { useEffect } from "react";

// Fix for default marker icons in Leaflet with React
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

// Create custom icons for chargers
const createChargerIcon = (color: string) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
  className: 'custom-charger-icon',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const recommendedIcon = createChargerIcon('#16A34A');
const standardIcon = createChargerIcon('#1D4ED8');
const sourceIcon = createChargerIcon('#000000');

type Props = {
  route?: Coordinates[];
  chargers: Charger[];
};

// Component to handle map centering/bounds when data changes
function MapRecenter({ route, chargers }: Props) {
  const map = useMap();
  
  useEffect(() => {
    if (route && route.length > 0) {
      const bounds = L.latLngBounds(route.map(p => [p.lat, p.lng]));
      chargers.forEach(c => bounds.extend([c.coordinates.lat, c.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, chargers, map]);
  
  return null;
}

export function MapComponent({ route, chargers }: Props) {
  const center: [number, number] = [12.9307, 77.5833]; // Jayanagar center

  const polylinePositions = (route ?? []).map(p => [p.lat, p.lng] as [number, number]);

  return (
    <section className="map" style={{ height: '520px', width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
      <MapContainer 
        center={center} 
        zoom={14} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={sourceIcon}>
          <Popup>Starting Point: Jayanagar</Popup>
        </Marker>
        {polylinePositions.length > 1 && (
          <Polyline positions={polylinePositions} color="#2563EB" weight={5} opacity={0.7} />
        )}
        {chargers.map((charger) => (
          <Marker 
            key={charger.id} 
            position={[charger.coordinates.lat, charger.coordinates.lng]}
            icon={charger.recommended ? recommendedIcon : standardIcon}
          >
            <Popup>
              <div style={{ color: '#000' }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>{charger.name}</strong>
                <span>{charger.availability} • {charger.powerKw}kW</span><br />
                <span>₹{charger.pricePerKwh}/kWh</span>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapRecenter route={route} chargers={chargers} />
      </MapContainer>
    </section>
  );
}

