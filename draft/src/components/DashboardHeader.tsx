import { useLocation, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAppStore } from "../store/appStore";

export function DashboardHeader() {
  const location = useLocation();
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/map': return 'Stations';
      case '/login': return 'Login';
      case '/add-charger': return 'Register Charger';
      default: return 'Dashboard';
    }
  };

  const title = getPageTitle();

  return (
    <header className="dashboard-header">
      <div className="header-title-area">
        <h1>{title}</h1>
      </div>
      <div className="auth-widget">
        {user ? (
          <>
            <span style={{ fontWeight: 'bold' }}>{user.username} ({user.role})</span>
            <FaUserCircle className="icon-green" />
            <button className="btn-outline" style={{ padding: '4px 8px', fontSize: '12px', marginLeft: '8px' }} onClick={() => setUser(null)}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <span>Sign In</span>
            <FaUserCircle className="icon-muted" />
          </Link>
        )}
      </div>
    </header>
  );
}
