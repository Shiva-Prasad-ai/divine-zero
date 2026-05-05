import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAppStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin1234') {
      setUser({ username, role: 'admin' });
    } else {
      setUser({ username, role: 'user' });
    }
    navigate('/');
  };

  return (
    <div className="dashboard-card" style={{ maxWidth: '400px', margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username
          <input required value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>Password
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>Sign In</button>
      </form>
    </div>
  );
}
