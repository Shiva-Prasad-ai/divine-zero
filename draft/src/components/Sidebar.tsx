import { Link, useLocation } from "react-router-dom";
import { FaBolt, FaMapMarkerAlt, FaCarAlt, FaChargingStation } from "react-icons/fa";

export function Sidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FaBolt className="logo-icon" />
        <span>EV HUB</span>
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
          <FaChargingStation className="nav-icon" />
          Dashboard
        </Link>
        <Link to="/map" className={`nav-item ${isActive('/map') ? 'active' : ''}`}>
          <FaMapMarkerAlt className="nav-icon" />
          Stations
        </Link>
        <Link to="/trip-summary" className={`nav-item ${isActive('/trip-summary') ? 'active' : ''}`}>
          <FaCarAlt className="nav-icon" />
          My Trips
        </Link>
      </nav>
    </aside>
  );
}
