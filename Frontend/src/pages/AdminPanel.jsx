import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/rewear.css';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pendingItems, setPendingItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  // Check if user is admin (in real app, this would be checked on backend)
  const isAdmin = user && user.email === 'admin@rewear.com';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    // Load items and users data
    const items = JSON.parse(localStorage.getItem('rewear_items')) || [];
    const allUsers = JSON.parse(localStorage.getItem('rewear_users')) || [];
    
    // Filter pending items (in real app, items would have approval status)
    const pending = items.filter(item => item.status === 'pending');
    
    setPendingItems(pending);
    setAllItems(items);
    setUsers(allUsers);
  }, [isAdmin, navigate]);

  const approveItem = (itemIndex) => {
    const items = JSON.parse(localStorage.getItem('rewear_items')) || [];
    items[itemIndex].status = 'approved';
    localStorage.setItem('rewear_items', JSON.stringify(items));
    
    // Update state
    setPendingItems(prev => prev.filter((_, index) => index !== itemIndex));
    setAllItems(items);
    
    alert('Item approved successfully!');
  };

  const rejectItem = (itemIndex) => {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;
    
    const items = JSON.parse(localStorage.getItem('rewear_items')) || [];
    items[itemIndex].status = 'rejected';
    items[itemIndex].rejectionReason = reason;
    localStorage.setItem('rewear_items', JSON.stringify(items));
    
    // Update state
    setPendingItems(prev => prev.filter((_, index) => index !== itemIndex));
    setAllItems(items);
    
    alert('Item rejected.');
  };

  const removeItem = (itemIndex) => {
    const confirmRemove = window.confirm('Are you sure you want to permanently remove this item?');
    if (!confirmRemove) return;
    
    const items = JSON.parse(localStorage.getItem('rewear_items')) || [];
    items.splice(itemIndex, 1);
    localStorage.setItem('rewear_items', JSON.stringify(items));
    
    setAllItems(items);
    alert('Item removed successfully!');
  };

  const banUser = (userEmail) => {
    const confirmBan = window.confirm(`Are you sure you want to ban ${userEmail}?`);
    if (!confirmBan) return;
    
    // TODO: Implement user banning logic
    alert(`User ${userEmail} has been banned.`);
  };

  if (!isAdmin) {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access the admin panel.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Moderate items and manage the ReWear platform</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Items ({pendingItems.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'all-items' ? 'active' : ''}`}
          onClick={() => setActiveTab('all-items')}
        >
          All Items ({allItems.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'pending' && (
          <div className="pending-items">
            <h2>Pending Item Approvals</h2>
            {pendingItems.length === 0 ? (
              <div className="no-pending">
                <p>No items pending approval</p>
              </div>
            ) : (
              <div className="items-grid">
                {pendingItems.map((item, index) => (
                  <div key={index} className="admin-item-card">
                    <img src={item.images[0]} alt={item.title} />
                    <div className="admin-item-info">
                      <h3>{item.title}</h3>
                      <p><strong>Category:</strong> {item.category}</p>
                      <p><strong>Condition:</strong> {item.condition}</p>
                      <p><strong>Uploader:</strong> {item.uploader}</p>
                      <p><strong>Description:</strong> {item.description}</p>
                      <div className="admin-actions">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => approveItem(index)}
                        >
                          ✓ Approve
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => rejectItem(index)}
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'all-items' && (
          <div className="all-items">
            <h2>All Items Management</h2>
            <div className="items-grid">
              {allItems.map((item, index) => (
                <div key={index} className="admin-item-card">
                  <img src={item.images[0]} alt={item.title} />
                  <div className="admin-item-info">
                    <h3>{item.title}</h3>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge status-${item.status || 'available'}`}>
                        {item.status || 'Available'}
                      </span>
                    </p>
                    <p><strong>Uploader:</strong> {item.uploader}</p>
                    <p><strong>Upload Date:</strong> {item.uploadDate || 'N/A'}</p>
                    <div className="admin-actions">
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => removeItem(index)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-management">
            <h2>User Management</h2>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Join Date</th>
                    <th>Items Listed</th>
                    <th>Points</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.email}</td>
                      <td>{user.joinDate || 'N/A'}</td>
                      <td>{allItems.filter(item => item.uploader === user.email).length}</td>
                      <td>{user.points || 100}</td>
                      <td>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => banUser(user.email)}
                        >
                          Ban User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics">
            <h2>Platform Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Total Items</h3>
                <div className="analytics-number">{allItems.length}</div>
              </div>
              <div className="analytics-card">
                <h3>Total Users</h3>
                <div className="analytics-number">{users.length}</div>
              </div>
              <div className="analytics-card">
                <h3>Pending Approvals</h3>
                <div className="analytics-number">{pendingItems.length}</div>
              </div>
              <div className="analytics-card">
                <h3>Active Swaps</h3>
                <div className="analytics-number">
                  {JSON.parse(localStorage.getItem('rewear_swaps') || '[]').length}
                </div>
              </div>
            </div>
            
            <div className="category-breakdown">
              <h3>Items by Category</h3>
              <div className="category-stats">
                {Object.entries(
                  allItems.reduce((acc, item) => {
                    acc[item.category] = (acc[item.category] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([category, count]) => (
                  <div key={category} className="category-stat">
                    <span className="category-name">{category}</span>
                    <span className="category-count">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
