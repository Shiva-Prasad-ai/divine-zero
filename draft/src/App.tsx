import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { HomePage } from "./pages/HomePage";
import { MapViewPage } from "./pages/MapViewPage";
import { LoginPage } from "./pages/LoginPage";
import { AddChargerPage } from "./pages/AddChargerPage";
import { TripSummaryPage } from "./pages/TripSummaryPage";

export default function App() {
  return (
    <div className="dashboard-layout theme-dark">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapViewPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/add-charger" element={<AddChargerPage />} />
            <Route path="/trip-summary" element={<TripSummaryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
