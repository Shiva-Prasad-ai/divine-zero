import { useState } from "react";
import { apiClient } from "../services/apiClient";

export function AddChargerModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    owner_name: "",
    latitude: 12.9307,
    longitude: 77.5833,
    address: "",
    price_per_kwh: 15,
    max_kw: 50,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await apiClient.addNewCharger({
        ...formData,
        demand_multiplier: 1.0,
        is_available: true
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to add charger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content card form">
        <h3>Add New Charger</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Owner / Name
            <input 
              required 
              value={formData.owner_name} 
              onChange={e => setFormData({ ...formData, owner_name: e.target.value })}
              placeholder="e.g. My Fast Charger" 
            />
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <label style={{ flex: 1 }}>
              Latitude
              <input type="number" step="any" required value={formData.latitude} onChange={e => setFormData({ ...formData, latitude: parseFloat(e.target.value) })} />
            </label>
            <label style={{ flex: 1 }}>
              Longitude
              <input type="number" step="any" required value={formData.longitude} onChange={e => setFormData({ ...formData, longitude: parseFloat(e.target.value) })} />
            </label>
          </div>
          <label>
            Address
            <input 
              required 
              value={formData.address} 
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              placeholder="Location address" 
            />
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <label style={{ flex: 1 }}>
              Price (₹/kWh)
              <input type="number" required value={formData.price_per_kwh} onChange={e => setFormData({ ...formData, price_per_kwh: parseFloat(e.target.value) })} />
            </label>
            <label style={{ flex: 1 }}>
              Power (kW)
              <input type="number" required value={formData.max_kw} onChange={e => setFormData({ ...formData, max_kw: parseFloat(e.target.value) })} />
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ flex: 1 }}>
              {isSubmitting ? "Adding..." : "Add Charger"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
