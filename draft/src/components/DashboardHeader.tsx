import { useLocation } from "react-router-dom";

export function DashboardHeader() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/map': return 'Stations';
      case '/trip-summary': return 'My Trips';
      default: return 'Dashboard';
    }
  };

  const title = getPageTitle();

  return (
    <header className="dashboard-header">
      <div className="header-title-area">
        <span className="breadcrumbs">Pages / {title}</span>
        <h1>{title}</h1>
      </div>
    </header>
  );
}
