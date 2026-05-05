import { useState } from "react";

export function AddChargerPage() {
  const [form, setForm] = useState({
    location: "",
    power: "",
    connector: "CCS2",
    price: "",
    availability: "09:00-18:00",
  });

  return (
    <main className="container">
      <section className="card form">
        <h1>Add Charger</h1>
        <label>
          Location
          <input
            value={form.location}
            onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
            placeholder="Search and pin charger location"
          />
        </label>
        <label>
          Power (kW)
          <input
            value={form.power}
            onChange={(e) => setForm((s) => ({ ...s, power: e.target.value }))}
          />
        </label>
        <label>
          Connector
          <select
            value={form.connector}
            onChange={(e) => setForm((s) => ({ ...s, connector: e.target.value }))}
          >
            <option>CCS2</option>
            <option>Type 2</option>
          </select>
        </label>
        <label>
          Base Price (Rs/kWh)
          <input
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
          />
        </label>
        <label>
          Availability
          <input
            value={form.availability}
            onChange={(e) => setForm((s) => ({ ...s, availability: e.target.value }))}
          />
        </label>
        <div className="row">
          <button className="btn-secondary" type="button">
            Save Draft
          </button>
          <button className="btn-primary" type="button">
            Publish Charger
          </button>
        </div>
      </section>
    </main>
  );
}

