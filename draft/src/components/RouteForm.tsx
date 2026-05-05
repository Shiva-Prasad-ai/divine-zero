import { useAppStore } from "../store/appStore";

export function RouteForm({ isCompact = false }: { isCompact?: boolean }) {
  const tripInput = useAppStore((s) => s.tripInput);
  const setTripInput = useAppStore((s) => s.setTripInput);

  return (
    <form className="route-form">
      {!isCompact && <h3>Plan Your Trip</h3>}
      <label>Source
        <input value={tripInput.source} onChange={(e) => setTripInput({ source: e.target.value })} placeholder="e.g. Jayanagar" />
      </label>
      <label>Destination
        <input value={tripInput.destination} onChange={(e) => setTripInput({ destination: e.target.value })} placeholder="e.g. Banashankari" />
      </label>
      <div className="stat-grid" style={{ gap: '8px' }}>
        <label>Battery %
          <input type="number" min="0" max="100" value={tripInput.batteryPercent} onChange={(e) => setTripInput({ batteryPercent: parseInt(e.target.value) || 0 })} />
        </label>
        <label>Capacity (kWh)
          <input type="number" min="10" max="200" value={tripInput.batteryCapacity} onChange={(e) => setTripInput({ batteryCapacity: parseInt(e.target.value) || 0 })} />
        </label>
      </div>
    </form>
  );
}
