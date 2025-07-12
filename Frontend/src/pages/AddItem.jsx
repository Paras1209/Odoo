import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AddItem() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    tags: '',
    image: '',
  });

  const [preview, setPreview] = useState('');

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setItem({ ...item, image: reader.result });
      setPreview(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...item,
      uploader: user.email,
      status: 'available',
    };

    const existingItems = JSON.parse(localStorage.getItem('rewear_items')) || [];
    localStorage.setItem('rewear_items', JSON.stringify([...existingItems, newItem]));

    alert('Item listed successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="glass" style={{ padding: '2rem', margin: '2rem' }}>
      <h2>➕ Add a New Item</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        {preview && <img src={preview} alt="Preview" className="preview-img" />}

        <label>Title:</label>
        <input type="text" name="title" value={item.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={item.description} onChange={handleChange} required />

        <label>Category:</label>
        <input type="text" name="category" value={item.category} onChange={handleChange} required />

        <label>Size:</label>
        <input type="text" name="size" value={item.size} onChange={handleChange} required />

        <label>Condition:</label>
        <input type="text" name="condition" value={item.condition} onChange={handleChange} required />

        <label>Tags:</label>
        <input type="text" name="tags" value={item.tags} onChange={handleChange} placeholder="comma separated" />

        <button type="submit" className="cta-button">List Item</button>
      </form>
    </div>
  );
}
