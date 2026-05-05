import { useEffect, useMemo, useState } from "react";
import { ChargerCard } from "../components/ChargerCard";
import { MapComponent } from "../components/MapComponent";
import { useAppStore } from "../store/appStore";

export function MapViewPage() {
  const chargers = useAppStore((s) => s.chargers);
  const routeSummary = useAppStore((s) => s.routeSummary);
  const [liveMessage, setLiveMessage] = useState("Listening for live charger updates...");

  const mockRoute = useMemo(
    () => [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9752, lng: 77.6116 },
      { lat: 13.0225, lng: 77.6427 },
    ],
    [],
  );

  useEffect(() => {
    if (!chargers.length) return;
    const timer = setInterval(() => {
      const candidate = chargers[Math.floor(Math.random() * chargers.length)];
      if (candidate) {
        setLiveMessage(
          `${candidate.name}: availability updated (${candidate.availability})`,
        );
      }
    }, 7000);
    return () => clearInterval(timer);
  }, [chargers]);

  return (
    <main className="container grid map-layout">
      <section className="card">
        <MapComponent route={mockRoute} chargers={chargers} />
      </section>
      <aside className="right-rail">
        <section className="card">
          <h3>Summary</h3>
          <p className="muted">{liveMessage}</p>
          {routeSummary ? (
            <>
              <p>{routeSummary.distanceKm} km</p>
              <p>{routeSummary.etaMinutes} min</p>
              <p>Arrival SoC {routeSummary.predictedArrivalBattery}%</p>
            </>
          ) : (
            <p>Plan a route to view summary.</p>
          )}
        </section>
        <section className="card">
          <h3>Chargers</h3>
          <div className="list">
            {chargers.length ? chargers.map((charger) => <ChargerCard key={charger.id} charger={charger} />) : <p>No chargers yet. Try planning a route first.</p>}
          </div>
        </section>
      </aside>
    </main>
  );
}

