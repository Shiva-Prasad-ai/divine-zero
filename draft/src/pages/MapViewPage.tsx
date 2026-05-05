import { useEffect } from "react";
import { useAppStore } from "../store/appStore";
import { apiClient } from "../services/apiClient";
import { MapComponent } from "../components/MapComponent";

export function MapViewPage() {
  const chargers = useAppStore(s => s.chargers);
  
  useEffect(() => {
    if (chargers.length === 0) {
      apiClient.fetchRealChargers().then(data => {
        useAppStore.setState({ chargers: data });
      });
    }
  }, [chargers]);

  return (
    <div className="dashboard-card full-width">
      <h2>Station Map</h2>
      <MapComponent chargers={chargers} />
    </div>
  );
}
