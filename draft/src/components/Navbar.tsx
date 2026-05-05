import { Link } from "react-router-dom";
import { useAppStore } from "../store/appStore";

export function Navbar() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  return (
    <header className="nav">
      <div className="brand">EV SmartShare</div>
      <nav>
        <Link to="/">Plan Trip</Link>
        <Link to="/map">Map</Link>
        <Link to="/add-charger">Add Charger</Link>
        <button
          className="btn-secondary"
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>
  );
}

