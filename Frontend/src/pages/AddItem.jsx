import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/rewear.css';

export default function AddItem() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    points: 50
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [draggedOver, setDraggedOver] = useState(false);

  const categories = ['Dresses', 'Jackets', 'Shoes', 'Tops', 'Bottoms', 'Accessories', 'Coats'];
  const conditions = ['New', 'Excellent', 'Good', 'Fair'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42', '44'];

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (files) => {
    const fileArray = Array.from(files);
    const newImages = [...images, ...fileArray].slice(0, 4); // Max 4 images
    setImages(newImages);

    // Create previews
    const newPreviews = [];
    newImages.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[index] = reader.result;
        if (newPreviews.length === newImages.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    const files = e.dataTransfer.files;
    handleImageUpload(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to add items');
      navigate('/login');
      return;
    }

    if (previews.length === 0) {
      alert('Please add at least one image');
      return;
    }

    const newItem = {
      ...item,
      images: previews,
      uploader: user.email,
      status: 'available',
      uploadDate: new Date().toLocaleDateString(),
      id: Date.now() // Simple ID generation
    };

    const existingItems = JSON.parse(localStorage.getItem('rewear_items')) || [];
    localStorage.setItem('rewear_items', JSON.stringify([...existingItems, newItem]));

    alert('Item listed successfully!');
    navigate('/dashboard');
  };

  const calculateSuggestedPoints = () => {
    let points = 50; // Base points
    
    if (item.condition === 'New') points += 30;
    else if (item.condition === 'Excellent') points += 20;
    else if (item.condition === 'Good') points += 10;
    
    if (item.category === 'Jackets' || item.category === 'Coats') points += 20;
    if (item.category === 'Shoes') points += 15;
    
    return points;
  };

  return (
    <div className="add-item-page">
      <div className="add-item-container">
        <div className="add-item-header">
          <h1>List Your Item</h1>
          <p>Share your sustainable fashion with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="add-item-form">
          
          {/* Image Upload Section */}
          <div className="form-section">
            <h3>📸 Add Images</h3>
            <p className="section-description">Upload up to 4 high-quality images of your item</p>
            
            <div 
              className={`image-upload-area ${draggedOver ? 'dragged' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="upload-content">
                <div className="upload-icon">📷</div>
                <p>Drag & drop images here, or <span className="upload-link">browse</span></p>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="file-input"
                />
              </div>
            </div>

            {previews.length > 0 && (
              <div className="image-previews">
                {previews.map((preview, index) => (
                  <div key={index} className="preview-container">
                    <img src={preview} alt={`Preview ${index + 1}`} />
                    <button 
                      type="button" 
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="form-section">
            <h3>📝 Product Information</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Product Name *</label>
                <input 
                  type="text" 
                  name="title" 
                  value={item.title} 
                  onChange={handleChange} 
                  placeholder="e.g., Vintage Denim Jacket"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select 
                  name="category" 
                  value={item.category} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Type</label>
                <input 
                  type="text" 
                  name="type" 
                  value={item.type} 
                  onChange={handleChange} 
                  placeholder="e.g., Casual, Formal, Vintage"
                />
              </div>

              <div className="form-group">
                <label>Size *</label>
                <select 
                  name="size" 
                  value={item.size} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Condition *</label>
                <select 
                  name="condition" 
                  value={item.condition} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Points Value</label>
                <div className="points-input">
                  <input 
                    type="number" 
                    name="points" 
                    value={item.points} 
                    onChange={handleChange}
                    min="10"
                    max="500"
                  />
                  <button 
                    type="button" 
                    className="suggest-points"
                    onClick={() => setItem({...item, points: calculateSuggestedPoints()})}
                  >
                    Suggest
                  </button>
                </div>
                <small>Suggested: {calculateSuggestedPoints()} points</small>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Description *</label>
              <textarea 
                name="description" 
                value={item.description} 
                onChange={handleChange} 
                placeholder="Describe the item's condition, style, and any special features..."
                rows="4"
                required 
              />
            </div>

            <div className="form-group full-width">
              <label>Tags</label>
              <input 
                type="text" 
                name="tags" 
                value={item.tags} 
                onChange={handleChange} 
                placeholder="vintage, designer, summer, casual (comma separated)"
              />
            </div>
          </div>

          {/* Previous Listings */}
          <div className="form-section">
            <h3>📋 Previous Listings</h3>
            <div className="previous-listings">
              {/* This would show user's previous items for reference */}
              <div className="listing-placeholder">
                <p>Your previous listings will appear here for reference</p>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              📦 List Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
