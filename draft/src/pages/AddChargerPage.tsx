import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export function AddChargerPage() {
  const submitRequest = useAppStore((s) => s.submitChargerRequest);
  const user = useAppStore((s) => s.user);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    chargerName: "",
    location: "",
    parkingFee: 0,
    priceKwh: 15,
    timeSlots: "08:00 - 18:00"
  });

  if (!user) {
    return <div className="dashboard-card"><h2>Please login to register a charging point.</h2></div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequest(formData);
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (success) {
    return (
      <div className="dashboard-card" style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ color: 'var(--accent-green)' }}>POST Request Sent!</h2>
        <p>Redirecting you to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Register P2P Charging Point</h2>
      <form onSubmit={handleSubmit}>
        <label>Charger Name
          <input required value={formData.chargerName} onChange={e => setFormData({...formData, chargerName: e.target.value})} placeholder="My Home Charger" />
        </label>
        <label>Location / Address
          <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
        </label>
        <div className="stat-grid" style={{ marginTop: '16px', marginBottom: '16px' }}>
          <label>Parking Fee (₹/hr)
            <input type="number" required value={formData.parkingFee} onChange={e => setFormData({...formData, parkingFee: parseFloat(e.target.value)})} />
          </label>
          <label>Per Unit Price (₹/kWh)
            <input type="number" required value={formData.priceKwh} onChange={e => setFormData({...formData, priceKwh: parseFloat(e.target.value)})} />
          </label>
        </div>
        <label>Available Time Slots
          <input required value={formData.timeSlots} onChange={e => setFormData({...formData, timeSlots: e.target.value})} placeholder="08:00 - 18:00" />
        </label>
        <button type="submit" className="btn-primary" style={{ marginTop: '24px' }}>Submit Request</button>
      </form>
    </div>
  );
}
