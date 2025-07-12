import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import '../styles/rewear.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [uploadedItems, setUploadedItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [userStats, setUserStats] = useState({
    itemsListed: 0,
    itemsSold: 0,
    pointsEarned: 0,
    swapsCompleted: 0
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("rewear_items")) || [];
    const userItems = items.filter((item) => item.uploader === user?.email);
    setUploadedItems(userItems);

    // Simulate purchased items (items user has bought/swapped)
    const purchased = items.filter(item => item.purchaser === user?.email);
    setPurchasedItems(purchased);

    // Calculate user statistics
    const swaps = JSON.parse(localStorage.getItem("rewear_swaps")) || [];
    const userSwaps = swaps.filter(swap => swap.requester === user?.email);
    
    setUserStats({
      itemsListed: userItems.length,
      itemsSold: userItems.filter(item => item.status === 'sold').length,
      pointsEarned: userItems.length * 50, // Dummy calculation
      swapsCompleted: userSwaps.filter(swap => swap.status === 'completed').length
    });
  }, [user]);

  const handleDeleteItem = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    const allItems = JSON.parse(localStorage.getItem("rewear_items")) || [];
    const itemToDelete = uploadedItems[index];
    const globalIndex = allItems.findIndex(item => 
      item.title === itemToDelete.title && item.uploader === itemToDelete.uploader
    );
    
    if (globalIndex !== -1) {
      allItems.splice(globalIndex, 1);
      localStorage.setItem("rewear_items", JSON.stringify(allItems));
      setUploadedItems(allItems.filter((item) => item.uploader === user.email));
    }
  };

  if (!user) {
    return (
      <div className="login-required">
        <h2>Please login to view your dashboard</h2>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user.email}!</h1>
        <p>Manage your sustainable fashion journey</p>
      </div>

      {/* User Profile Section */}
      <div className="user-profile-section">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
          
          <div className="profile-details">
            <div className="profile-info">
              <h3>Profile Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>Email:</strong>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <strong>Member Since:</strong>
                  <span>January 2024</span>
                </div>
                <div className="info-item">
                  <strong>Points Balance:</strong>
                  <span className="points-balance">100 pts</span>
                </div>
                <div className="info-item">
                  <strong>Status:</strong>
                  <span className="status-badge">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="user-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-number">{userStats.itemsListed}</div>
            <div className="stat-label">Items Listed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-number">{userStats.itemsSold}</div>
            <div className="stat-label">Items Sold</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">{userStats.pointsEarned}</div>
            <div className="stat-label">Points Earned</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-number">{userStats.swapsCompleted}</div>
            <div className="stat-label">Swaps Completed</div>
          </div>
        </div>
      </div>

      {/* My Listings Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>👕 My Listings</h2>
          <Link to="/add-item" className="btn btn-primary">
            + Add New Item
          </Link>
        </div>
        
        <div className="items-grid">
          {uploadedItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No items listed yet</h3>
              <p>Start by adding your first item to the marketplace</p>
              <Link to="/add-item" className="btn btn-primary">List Your First Item</Link>
            </div>
          ) : (
            uploadedItems.map((item, index) => (
              <div className="dashboard-item-card" key={index}>
                <div className="item-image-container">
                  <img src={item.images[0]} alt={item.title} />
                  <div className="item-status">
                    {item.status === 'sold' ? 'Sold' : 'Available'}
                  </div>
                </div>
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p className="item-category">{item.category}</p>
                  <p className="item-points">{item.points} points</p>
                  <div className="item-actions">
                    <Link to={`/edit/${index}`} className="btn btn-outline btn-sm">
                      ✏️ Edit
                    </Link>
                    <Link to={`/item/${index}`} className="btn btn-secondary btn-sm">
                      👁️ View
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteItem(index)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* My Purchases Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>🛍️ My Purchases</h2>
        </div>
        
        <div className="items-grid">
          {purchasedItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛍️</div>
              <h3>No purchases yet</h3>
              <p>Browse items to start your sustainable fashion journey</p>
              <Link to="/browse" className="btn btn-primary">Browse Items</Link>
            </div>
          ) : (
            purchasedItems.map((item, index) => (
              <div className="dashboard-item-card" key={index}>
                <div className="item-image-container">
                  <img src={item.images[0]} alt={item.title} />
                  <div className="item-status purchased">Purchased</div>
                </div>
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p className="item-category">{item.category}</p>
                  <p className="purchase-date">Purchased: {item.purchaseDate}</p>
                  <div className="item-actions">
                    <Link to={`/item/${index}`} className="btn btn-secondary btn-sm">
                      👁️ View Details
                    </Link>
                    <button className="btn btn-outline btn-sm">
                      ⭐ Rate Item
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Swap Requests Section */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>🔄 My Swap Requests</h2>
        </div>
        
        {(() => {
          const allSwaps = JSON.parse(localStorage.getItem('rewear_swaps')) || [];
          const myRequests = allSwaps.filter((swap) => swap.requester === user.email);

          if (myRequests.length === 0) {
            return (
              <div className="empty-state">
                <div className="empty-icon">🔄</div>
                <h3>No swap requests yet</h3>
                <p>Start swapping items with other users</p>
                <Link to="/browse" className="btn btn-primary">Browse Items to Swap</Link>
              </div>
            );
          }

          return (
            <div className="swap-requests-grid">
              {myRequests.map((swap, index) => (
                <div key={index} className="swap-card">
                  <div className="swap-header">
                    <h4>Swap Request #{index + 1}</h4>
                    <span className={`status-badge status-${swap.status}`}>
                      {swap.status}
                    </span>
                  </div>
                  <div className="swap-details">
                    <p><strong>Item:</strong> {swap.itemTitle}</p>
                    <p><strong>To:</strong> {swap.receiver}</p>
                    <p><strong>Date:</strong> {swap.date}</p>
                  </div>
                  <div className="swap-actions">
                    <button className="btn btn-outline btn-sm">View Details</button>
                    {swap.status === 'pending' && (
                      <button className="btn btn-secondary btn-sm">Cancel Request</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default Dashboard;
