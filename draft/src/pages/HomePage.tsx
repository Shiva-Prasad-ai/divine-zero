import { useState, useEffect } from "react";
import { RouteForm } from "../components/RouteForm";
import { FaBolt, FaArrowRight, FaMapMarkerAlt, FaHome, FaBriefcase, FaUndo, FaEllipsisH } from "react-icons/fa";
import { useAppStore } from "../store/appStore";

export function HomePage() {
  const routeSummary = useAppStore((s) => s.routeSummary);
  const tripInput = useAppStore((s) => s.tripInput);
  const hasData = !!routeSummary;

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const batteryPercent = tripInput?.batteryPercent ? Number(tripInput.batteryPercent) : 0;
  const powerReserve = Math.round((batteryPercent / 100) * 500); // Assuming 500km max range

  return (
    <div className="dashboard-grid">
      {/* Top Row */}
      <div className="dashboard-card quick-trip-widget">
        <div className="card-header">
          <h3>Quick Trip Planer</h3>
          <span className="dropdown">+</span>
        </div>
        <div className="quick-trip-content">
           <RouteForm isCompact={true} />
        </div>
      </div>
      <div className="dashboard-card ev-cars-widget">
        <div className="card-header">
          <h3>EV cars</h3>
        </div>
        <div className="ev-stats-grid">
          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value">{currentTime}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Battery</span>
            <span className={`stat-value ${hasData ? "text-green" : "text-gray"}`}>{hasData ? `${batteryPercent} %` : "-- %"}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Power reserve</span>
            <span className="stat-value">{hasData ? `${powerReserve} km` : "0 km"}</span>
          </div>
        </div>
        <div className="charging-status">
          <div className="charging-label"><FaBolt className={hasData ? "text-green" : "text-gray"} /> {hasData ? "Charging" : "Not Charging"}</div>
          <div className="charging-bar-container" style={{ backgroundColor: hasData ? "#064e3b" : "var(--border-color)" }}>
            <div className="charging-bar-fill" style={{ 
              width: hasData ? `${batteryPercent}%` : '0%', 
              backgroundColor: hasData ? 'var(--accent-green)' : 'transparent',
              '--target-width': hasData ? `${batteryPercent}%` : '0%'
            } as React.CSSProperties}></div>
          </div>
          <div className="charging-time-remaining">
            <strong>{hasData ? "3:31 h" : "--:--"}</strong>
            <span>Remaining</span>
          </div>
        </div>
      </div>





      <div className="dashboard-card stations-list-widget">
        <div className="card-header">
          <h3>Stations list</h3>
          <div className="car-tabs">
            <span className="tab active text-green">Favorite</span>
            <span className="tab">All</span>
          </div>
        </div>
        <div className="stations-list">
          {!hasData ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <FaMapMarkerAlt style={{ fontSize: '32px', marginBottom: '16px', opacity: 0.5 }} />
              <p>No stations available yet. Plan a trip to see nearby stations.</p>
            </div>
          ) : [
            { name: "Ragigudda EV Hub", address: "9th Block, Jayanagar, near Ragigudda Temple", rating: "4.8", port1: "CCS2 (DC)", port1kw: "50 kW", port2: "Type 2 (AC)", port2kw: "22 kW", fee: "₹20/hr", kwh: "₹18", arrive: "Today 10:15", depart: "Today 11:25", img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=80&q=80" },
            { name: "Banashankari Fast Charge", address: "Outer Ring Rd, Banashankari 3rd Stage", rating: "4.5", port1: "CCS2 (DC)", port1kw: "60 kW", port2: "Type 2 (AC)", port2kw: "22 kW", fee: "₹15/hr", kwh: "₹19", arrive: "Today 10:30", depart: "Today 11:45", img: "https://images.unsplash.com/photo-1623835695034-7cecb00a8bbd?w=80&q=80" }
          ].map((s, i) => (
            <div key={i} className="station-row">
              <div className="station-image-wrap">
                <img src={s.img} alt={s.name} />
                <span className="station-rating">{s.rating}</span>
              </div>
              <div className="station-details">
                <h4>{s.name}</h4>
                <p>{s.address}</p>
                <span className="ports-avail">Ports Available <strong>10</strong></span>
              </div>
              <div className="station-ports">
                <div className="port-pill active">
                  <span>{s.port1}</span>
                  <strong>{s.port1kw} <span className="dot text-green">•</span></strong>
                </div>
                <div className="port-pill">
                  <span>{s.port2}</span>
                  <strong>{s.port2kw} <span className="dot text-gray">◦</span></strong>
                </div>
              </div>
              <div className="station-fees">
                <div className="fee-col">
                  <span>Parking Fee</span>
                  <strong>{s.fee}</strong>
                </div>
                <div className="fee-col">
                  <span>Per kwh</span>
                  <strong>{s.kwh}</strong>
                </div>
              </div>
              <div className="station-times">
                <div className="time-col">
                  <span>Arrive</span>
                  <strong>{s.arrive} ▾</strong>
                </div>
                <div className="time-col">
                  <span>Depart</span>
                  <strong>{s.depart} ▾</strong>
                </div>
              </div>
              <div className="station-actions">
                <button className="btn-primary-sm" onClick={() => alert(`Booking initiated for ${s.name} at ${s.arrive}`)}>Book</button>
                <button className="btn-outline-sm" onClick={() => alert(`Connecting to support for ${s.name}...`)}>Support</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
