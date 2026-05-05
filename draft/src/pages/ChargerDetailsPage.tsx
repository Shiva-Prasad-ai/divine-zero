import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookingModal } from "../components/BookingModal";
import { apiClient } from "../services/apiClient";
import type { Charger } from "../types";
import { useAppStore } from "../store/appStore";

export function ChargerDetailsPage() {
  const { chargerId } = useParams();
  const selectedCharger = useAppStore((s) => s.selectedCharger);
  const [charger, setCharger] = useState<Charger | undefined>(selectedCharger);

  useEffect(() => {
    if (!chargerId) return;
    apiClient.fetchChargerById(chargerId).then((c) => c && setCharger(c));
  }, [chargerId]);

  if (!charger) {
    return (
      <main className="container">
        <section className="card">
          <p>Charger not found.</p>
          <Link className="btn-secondary" to="/map">
            Back to map
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container grid two-col">
      <section className="card">
        <h2>{charger.name}</h2>
        <p>{charger.location}</p>
        <p>Distance: {charger.distanceKm} km</p>
        <p>Rs {charger.pricePerKwh} / kWh</p>
        <p>Availability: {charger.availability}</p>
        <p>
          Connector: {charger.connector} | {charger.powerKw}kW
        </p>
      </section>
      <BookingModal />
    </main>
  );
}

