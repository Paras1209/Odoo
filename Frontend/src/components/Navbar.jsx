import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/rewear.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const isAdmin = user && user.email === 'admin@rewear.com';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h2 className="logo">ReWear</h2>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/browse" className="nav-link">Browse</Link>
          <Link to="/add-item" className="nav-link">List Item</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link admin-link">Admin</Link>
              )}
              <span className="user-info">
                <span className="user-email">{user.email}</span>
                <span className="user-points">100 pts</span>
              </span>
              <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn btn-secondary btn-sm">Sign Up</Link>
              <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}