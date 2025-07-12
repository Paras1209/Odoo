import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ItemDetail = () => {
  const { itemId } = useParams();
  const { user } = useAuth();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("rewear_items")) || [];
    const found = items[parseInt(itemId)];
    setItem(found);
  }, [itemId]);

  const handleSwapRequest = () => {
    if (!user) {
      alert("Please login to request a swap.");
      return;
    }

    const swaps = JSON.parse(localStorage.getItem("rewear_swaps")) || [];

    // Prevent duplicate request
    const alreadyRequested = swaps.find(
      (s) => s.requester === user.email && s.itemId === parseInt(itemId)
    );
    if (alreadyRequested) {
      alert("You’ve already requested a swap for this item.");
      return;
    }

    const newRequest = {
      requester: user.email,
      receiver: item.uploader,
      itemId: parseInt(itemId),
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    swaps.push(newRequest);
    localStorage.setItem("rewear_swaps", JSON.stringify(swaps));
    alert("Swap request sent!");
  };

  const handleRedeem = () => {
    alert("Redeem via points feature coming soon!");
  };

  if (!item) return <div>Loading item...</div>;

  return (
    <div className="item-detail-glass">
      <h2>{item.title}</h2>

      <div className="item-gallery">
        {item.images.map((img, index) => (
          <img src={img} alt={`Item ${index}`} key={index} />
        ))}
      </div>

      <div className="item-info">
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Type:</strong> {item.type}</p>
        <p><strong>Size:</strong> {item.size}</p>
        <p><strong>Condition:</strong> {item.condition}</p>
        <p><strong>Tags:</strong> {item.tags}</p>
        <p><strong>Uploader:</strong> {item.uploader}</p>
        <p><strong>Status:</strong> {item.status || "Available"}</p>
      </div>

      <div className="item-buttons">
        <button onClick={handleSwapRequest} className="cta-button">Request Swap</button>
        <button onClick={handleRedeem} className="cta-button">Redeem via Points</button>
      </div>
    </div>
  );
};

export default ItemDetail;
