import { Link } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export function RouteSummaryCard() {
  const summary = useAppStore((s) => s.routeSummary);
  const tripInput = useAppStore((s) => s.tripInput);

  if (!summary) {
    return (
      <section className="card">
        <h3>Trip Summary</h3>
        <p>Plan a route to preview distance, ETA, and battery prediction.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h3>Route Summary</h3>
      <p>Vehicle: {tripInput.selectedVehicle}</p>
      <p>Distance: {summary.distanceKm} km</p>
      <p>ETA: {summary.etaMinutes} min</p>
      <p>Predicted arrival battery: {summary.predictedArrivalBattery}%</p>
      <p>Charging stops needed: {summary.requiredStops}</p>
      <Link to="/map" className="btn-secondary">
        View on Map
      </Link>
    </section>
  );
}

