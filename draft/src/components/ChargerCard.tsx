import { Link } from "react-router-dom";
import type { Charger } from "../types";
import { useAppStore } from "../store/appStore";

type Props = {
  charger: Charger;
};

export function ChargerCard({ charger }: Props) {
  const selectCharger = useAppStore((s) => s.selectCharger);
  return (
    <article className={`card charger-card ${charger.recommended ? "recommended" : ""}`}>
      <div className="row">
        <h4>{charger.name}</h4>
        {charger.recommended && <span className="pill">AI Recommended</span>}
      </div>
      <p>{charger.location}</p>
      <p>
        {charger.distanceKm} km detour | Rs {charger.pricePerKwh}/kWh
      </p>
      <p>
        {charger.powerKw}kW {charger.connector} | {charger.availability}
      </p>
      <Link
        to={`/chargers/${charger.id}`}
        className="btn-secondary"
        onClick={() => selectCharger(charger)}
      >
        View Details
      </Link>
    </article>
  );
}

