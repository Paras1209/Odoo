import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [uploadedItems, setUploadedItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("rewear_items")) || [];
    const userItems = items.filter((item) => item.uploader === user?.email);
    setUploadedItems(userItems);
  }, [user]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.email}</h2>

      <div className="profile-section">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Points Balance:</strong> 100</p>
      </div>

      <h3>👕 Your Uploaded Items</h3>
      <div className="item-grid">
        {uploadedItems.length === 0 ? (
          <p>You haven’t uploaded any items yet.</p>
        ) : (
          uploadedItems.map((item, index) => (
            <div className="item-card" key={index}>
              <img src={item.images[0]} alt="item" />
              <h4>{item.title}</h4>
              <p>{item.category}</p>
              <Link to={`/edit/${index}`} className="edit-btn">Edit</Link>
              <button
                className="delete-btn"
                onClick={() => {
                  const allItems = JSON.parse(localStorage.getItem("rewear_items")) || [];
                  allItems.splice(index, 1);
                  localStorage.setItem("rewear_items", JSON.stringify(allItems));
                  setUploadedItems(allItems.filter((item) => item.uploader === user.email));
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <h3 style={{ marginTop: '3rem' }}>🔁 My Swap Requests</h3>
      {(() => {
        const allSwaps = JSON.parse(localStorage.getItem('rewear_swaps')) || [];
        const myRequests = allSwaps.filter((swap) => swap.requester === user.email);

        if (myRequests.length === 0) {
          return <p>You haven’t requested any swaps yet.</p>;
        }

        return (
          <div className="swap-requests-container">
            {myRequests.map((swap, index) => (
              <div key={index} className="swap-card">
                <p><strong>Item ID:</strong> {swap.itemId}</p>
                <p><strong>To:</strong> {swap.receiver}</p>
                <p><strong>Status:</strong> {swap.status}</p>
                <p><strong>Date:</strong> {swap.date}</p>
              </div>
            ))}
          </div>
        );
      })()}
    </div>
  );
};

export default Dashboard;
