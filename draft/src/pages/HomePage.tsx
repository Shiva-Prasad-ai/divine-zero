import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/appStore";
import { RouteForm } from "../components/RouteForm";
import { MapComponent } from "../components/MapComponent";
import { apiClient } from "../services/apiClient";

export function HomePage() {
  const user = useAppStore((s) => s.user);
  const tripInput = useAppStore((s) => s.tripInput);
  const chargers = useAppStore((s) => s.chargers);
  const requests = useAppStore((s) => s.chargerRequests);
  const acceptRequest = useAppStore((s) => s.acceptRequest);
  const denyRequest = useAppStore((s) => s.denyRequest);
  
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chargers.length === 0) {
      apiClient.fetchRealChargers().then(data => {
        useAppStore.setState({ chargers: data });
      });
    }
  }, [chargers]);

  const powerReserve = Math.round((tripInput.batteryPercent / 100) * (tripInput.batteryCapacity * 6));
  const timeRemainingHours = (tripInput.batteryCapacity * (1 - tripInput.batteryPercent / 100)) / 50;
  const hours = Math.floor(timeRemainingHours);
  const mins = Math.round((timeRemainingHours - hours) * 60);

  return (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h3>Quick Trip Planner</h3>
        <RouteForm isCompact />
      </div>

      <div className="dashboard-card">
        <h3>EV Battery Status</h3>
        <div className="stat-grid">
          <div className="stat-box">Time<strong>{currentTime}</strong></div>
          <div className="stat-box">Battery<strong>{tripInput.batteryPercent}%</strong></div>
          <div className="stat-box">Power Reserve<strong>{powerReserve} km</strong></div>
          <div className="stat-box">Time to 100%<strong>{hours}h {mins}m</strong></div>
        </div>
        <div className="charging-bar-container">
          <div className="charging-bar-fill" style={{ width: `${tripInput.batteryPercent}%` }}></div>
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="dashboard-card full-width" style={{ border: '1px solid var(--accent-green)' }}>
          <h3 style={{ color: 'var(--accent-green)' }}>Admin: Pending Charger Requests</h3>
          {requests.filter(r => r.status === 'pending').length === 0 ? (
            <p className="text-muted">No pending requests.</p>
          ) : (
            requests.filter(r => r.status === 'pending').map(req => (
              <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.2)', marginBottom: '8px', borderRadius: '8px' }}>
                <div>
                  <strong>{req.chargerName}</strong> - {req.location}<br/>
                  <small>Price: ₹{req.priceKwh}/kWh | Parking: ₹{req.parkingFee} | Slots: {req.timeSlots} | By: {req.requestedBy}</small>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button className="btn-primary" onClick={() => acceptRequest(req.id)}>Accept</button>
                  <button className="btn-danger" onClick={() => denyRequest(req.id)}>Deny</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {user?.role === 'user' && (
        <div className="dashboard-card full-width">
          <h3>My Charger Requests</h3>
          {requests.filter(r => r.requestedBy === user.username).length === 0 ? (
            <p className="text-muted">You haven't requested to add any chargers yet.</p>
          ) : (
            requests.filter(r => r.requestedBy === user.username).map(req => (
              <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.2)', marginBottom: '8px', borderRadius: '8px' }}>
                <div><strong>{req.chargerName}</strong> - {req.location}</div>
                <div className={`status-pill status-${req.status}`}>{req.status}</div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="dashboard-card full-width" style={{ padding: 0 }}>
        <MapComponent chargers={chargers.slice(0, 10)} />
      </div>

      <div className="dashboard-card full-width" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Join our P2P EV Charging Network</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Turn your home EV charger into a public station and earn money.</p>
        <Link to="/add-charger" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}>Register your charging point</Link>
      </div>
    </div>
  );
}
