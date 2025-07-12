import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Inside Navbar.jsx
import '../styles/global.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-glass">
      <h2 className="logo">ReWear</h2>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/add-item" className="nav-link">List Item</Link>
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button className="nav-button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
import '../styles/global.css'; // Assuming you have a CSS file for styling the Navbar
 // Assuming you have a CSS file for styling the Navbar