import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { DashboardHeader } from "./components/DashboardHeader";
import { AddChargerPage } from "./pages/AddChargerPage";
import { BookingPage } from "./pages/BookingPage";
import { ChargerDetailsPage } from "./pages/ChargerDetailsPage";
import { TripSummaryPage } from "./pages/TripSummaryPage";
import { HomePage } from "./pages/HomePage";
import { MapViewPage } from "./pages/MapViewPage";
import { useAppStore } from "./store/appStore";

export default function App() {
  const theme = useAppStore((s) => s.theme);
  return (
    <div className={`dashboard-layout ${theme === "dark" ? "theme-dark" : "theme-dark"}`}>
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trip-summary" element={<TripSummaryPage />} />
            <Route path="/map" element={<MapViewPage />} />
            <Route path="/chargers/:chargerId" element={<ChargerDetailsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/add-charger" element={<AddChargerPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

