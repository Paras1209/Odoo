import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/rewear.css';

const ItemDetail = () => {
  const { id, itemId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const actualId = id || itemId; // Handle both route params

  const [item, setItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(100); // Dummy user points

  useEffect(() => {
    // First try to find in localStorage items
    const items = JSON.parse(localStorage.getItem("rewear_items")) || [];
    let found = items[parseInt(actualId)];
    
    // If not found in localStorage, try dummy data
    if (!found) {
      const dummyItems = [
        {
          id: 1,
          title: "Vintage Leather Jacket",
          category: "Jackets",
          type: "Outerwear",
          size: "M",
          condition: "Good",
          images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop&sat=50",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop&brightness=110"
          ],
          uploader: "sarah@example.com",
          uploadDate: "2024-01-15",
          points: 150,
          description: "Classic brown leather jacket in great condition. Perfect for fall and winter. Barely worn, no visible damage. Features multiple pockets and a comfortable lining.",
          tags: "vintage, leather, brown, fall, winter, classic",
          status: "Available"
        },
        {
          id: 2,
          title: "Floral Summer Dress",
          category: "Dresses",
          type: "Casual",
          size: "S",
          condition: "Excellent",
          images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&sat=75",
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop&hue=30"
          ],
          uploader: "emma@example.com",
          uploadDate: "2024-01-20",
          points: 120,
          description: "Beautiful floral print dress, perfect for summer occasions. Flowing fabric, midi length, very comfortable to wear. Only worn a few times.",
          tags: "floral, summer, dress, midi, comfortable",
          status: "Available"
        }
      ];
      found = dummyItems.find(item => item.id === parseInt(actualId));
    }
    
    setItem(found);
  }, [actualId]);

  const handleSwapRequest = () => {
    if (!user) {
      alert("Please login to request a swap.");
      navigate('/login');
      return;
    }

    if (user.email === item.uploader) {
      alert("You cannot request a swap for your own item.");
      return;
    }

    const swaps = JSON.parse(localStorage.getItem("rewear_swaps")) || [];

    // Prevent duplicate request
    const alreadyRequested = swaps.find(
      (s) => s.requester === user.email && s.itemId === parseInt(actualId)
    );
    if (alreadyRequested) {
      alert("You've already requested a swap for this item.");
      return;
    }

    const newRequest = {
      requester: user.email,
      receiver: item.uploader,
      itemId: parseInt(actualId),
      itemTitle: item.title,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    swaps.push(newRequest);
    localStorage.setItem("rewear_swaps", JSON.stringify(swaps));
    alert("Swap request sent! The owner will be notified.");
  };

  const handleRedeem = () => {
    if (!user) {
      alert("Please login to redeem items.");
      navigate('/login');
      return;
    }

    if (user.email === item.uploader) {
      alert("You cannot redeem your own item.");
      return;
    }

    if (userPoints < item.points) {
      alert(`Insufficient points! You need ${item.points} points but only have ${userPoints}.`);
      return;
    }

    // TODO: Implement actual point redemption logic with backend
    const confirmRedeem = window.confirm(`Redeem this item for ${item.points} points?`);
    if (confirmRedeem) {
      alert("Item redeemed successfully! Points have been deducted from your account.");
      // Update user points (in real app, this would be handled by backend)
      setUserPoints(prev => prev - item.points);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  if (!item) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading item details...</p>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <div className="item-detail-container">
        
        {/* Image Gallery Section */}
        <div className="item-gallery-section">
          <div className="main-image-container">
            <img 
              src={item.images[currentImageIndex]} 
              alt={`${item.title} - Image ${currentImageIndex + 1}`}
              className="main-image"
            />
            {item.images.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={prevImage}>‹</button>
                <button className="gallery-nav next" onClick={nextImage}>›</button>
              </>
            )}
          </div>
          
          {item.images.length > 1 && (
            <div className="thumbnail-gallery">
              {item.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Item Information Section */}
        <div className="item-info-section">
          <div className="item-header">
            <h1 className="item-title">{item.title}</h1>
            <div className="item-points">{item.points} points</div>
          </div>

          <div className="item-meta">
            <span className="category-badge">{item.category}</span>
            <span className={`condition-badge condition-${item.condition.toLowerCase()}`}>{item.condition}</span>
            <span className="size-info">Size: {item.size}</span>
          </div>

          <div className="item-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="item-details-grid">
            <div className="detail-item">
              <strong>Category:</strong>
              <span>{item.category}</span>
            </div>
            <div className="detail-item">
              <strong>Type:</strong>
              <span>{item.type}</span>
            </div>
            <div className="detail-item">
              <strong>Size:</strong>
              <span>{item.size}</span>
            </div>
            <div className="detail-item">
              <strong>Condition:</strong>
              <span>{item.condition}</span>
            </div>
            <div className="detail-item">
              <strong>Status:</strong>
              <span className="status-available">{item.status || "Available"}</span>
            </div>
          </div>

          {item.tags && (
            <div className="item-tags">
              <h4>Tags:</h4>
              <div className="tags-list">
                {item.tags.split(',').map((tag, index) => (
                  <span key={index} className="tag">{tag.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {/* Uploader Information */}
          <div className="uploader-info">
            <h4>Seller Information</h4>
            <div className="uploader-details">
              <div className="uploader-avatar">
                {item.uploader?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="uploader-data">
                <p className="uploader-name">{item.uploader}</p>
                <p className="member-since">Member since: {item.uploadDate}</p>
                <p className="rating">⭐⭐⭐⭐⭐ (24 reviews)</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="item-actions">
            {user && user.email !== item.uploader ? (
              <>
                <button onClick={handleSwapRequest} className="btn btn-primary btn-lg">
                  🔄 Request Swap
                </button>
                <button onClick={handleRedeem} className="btn btn-secondary btn-lg">
                  💎 Redeem for {item.points} Points
                </button>
                <button className="btn btn-outline btn-lg">
                  ♡ Save to Wishlist
                </button>
              </>
            ) : user && user.email === item.uploader ? (
              <div className="owner-actions">
                <p className="owner-message">This is your item</p>
                <button onClick={() => navigate(`/edit/${actualId}`)} className="btn btn-primary btn-lg">
                  ✏️ Edit Item
                </button>
              </div>
            ) : (
              <div className="login-prompt">
                <p>Please login to interact with this item</p>
                <button onClick={() => navigate('/login')} className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
            )}
          </div>

          {/* User Points Display */}
          {user && (
            <div className="user-points-display">
              <p>Your Points Balance: <strong>{userPoints}</strong></p>
            </div>
          )}
        </div>
      </div>

      {/* Similar Items Section */}
      <div className="similar-items-section">
        <h3>Similar Items</h3>
        <div className="similar-items-grid">
          {/* TODO: Add similar items logic */}
          <div className="similar-item-placeholder">
            <p>Similar items will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
