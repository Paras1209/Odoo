import React, { useState, useEffect } from 'react';
import '../styles/rewear.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const mockUsers = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', points: 120, status: 'active', joinDate: '2023-06-15' },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', points: 85, status: 'active', joinDate: '2023-07-20' },
      { id: 3, name: 'Carol Davis', email: 'carol@example.com', points: 150, status: 'active', joinDate: '2023-08-10' },
      { id: 4, name: 'Dave Wilson', email: 'dave@example.com', points: 60, status: 'inactive', joinDate: '2023-09-05' }
    ];
    
    const mockOrders = [
      { id: 1, buyer: 'Alice Johnson', seller: 'Carol Davis', item: 'Vintage Denim Jacket', points: 45, status: 'completed', date: '2024-01-15' },
      { id: 2, buyer: 'Bob Smith', seller: 'Dave Wilson', item: 'Designer Handbag', points: 80, status: 'shipped', date: '2024-01-20' },
      { id: 3, buyer: 'Carol Davis', seller: 'Alice Johnson', item: 'Wool Sweater', points: 35, status: 'pending', date: '2024-01-25' }
    ];
    
    const mockListings = [
      { id: 1, title: 'Vintage Denim Jacket', seller: 'Alice Johnson', points: 45, status: 'active', date: '2024-01-10' },
      { id: 2, title: 'Designer Handbag', seller: 'Bob Smith', points: 80, status: 'active', date: '2024-01-12' },
      { id: 3, title: 'Wool Sweater', seller: 'Carol Davis', points: 35, status: 'active', date: '2024-01-14' }
    ];
    
    setUsers(mockUsers);
    setOrders(mockOrders);
    setListings(mockListings);
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'completed': return 'status-completed';
      case 'shipped': return 'status-shipped';
      default: return '';
    }
  };

  const renderUsersTab = () => (
    <div className="users-grid">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-avatar">
            {getInitials(user.name)}
          </div>
          <div className="user-details">
            <h4>{user.name}</h4>
            <div className="user-info-grid">
              <span>Email: {user.email}</span>
              <span>Points: {user.points}</span>
              <span>Status: <span className={getStatusClass(user.status)}>{user.status}</span></span>
              <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="user-actions">
            <button className="action-btn action-1">View Profile</button>
            <button className="action-btn action-2">Send Message</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="orders-grid">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-avatar">
            {getInitials(order.buyer)}
          </div>
          <div className="order-details">
            <h4>Order #{order.id}</h4>
            <div className="order-info-grid">
              <span>Item: {order.item}</span>
              <span>Buyer: {order.buyer}</span>
              <span>Seller: {order.seller}</span>
              <span>Points: {order.points}</span>
              <span>Status: <span className={getStatusClass(order.status)}>{order.status}</span></span>
              <span>Date: {new Date(order.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="order-actions">
            <button className="action-btn action-1">View Details</button>
            <button className="action-btn action-2">Track Order</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListingsTab = () => (
    <div className="listings-grid">
      {listings.map((listing) => (
        <div key={listing.id} className="listing-card">
          <div className="listing-avatar">
            <img src={`https://picsum.photos/60/60?random=${listing.id}`} alt={listing.title} />
          </div>
          <div className="listing-details">
            <h4>{listing.title}</h4>
            <div className="listing-info-grid">
              <span>Seller: {listing.seller}</span>
              <span>Points: {listing.points}</span>
              <span>Status: <span className={getStatusClass(listing.status)}>{listing.status}</span></span>
              <span>Listed: {new Date(listing.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="listing-actions">
            <button className="action-btn action-1">View Item</button>
            <button className="action-btn action-2">Edit Listing</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p>Manage users, orders, and listings</p>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={`tab-button ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          Listings
        </button>
      </div>
      
      <div className="admin-content">
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'listings' && renderListingsTab()}
      </div>
    </div>
  );
};

export default AdminPanel;
