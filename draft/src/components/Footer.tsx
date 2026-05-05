import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer animated-enter delay-1">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about-section">
            <h3>About Us</h3>
            <p>
              We are building a smart, AI-powered peer-to-peer EV charging network. Our mission is to eliminate range anxiety and make charging accessible everywhere by connecting EV owners with private charging points.
            </p>
          </div>
          
          <div className="footer-section links-section">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/map" className="footer-link">Map View</Link>
            </div>
          </div>
        </div>

        <div className="footer-cta">
          <Link to="/add-charger" className="btn-primary register-charger-btn">
            Register Your Charging Point
          </Link>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} P2P EV Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
