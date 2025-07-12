import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function EditItem() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('rewear_items')) || [];
    const selected = items[itemId];
    if (!selected) {
      alert('Item not found');
      navigate('/');
      return;
    }
    setItem(selected);
  }, [itemId, navigate]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem('rewear_items')) || [];
    items[itemId] = item;
    localStorage.setItem('rewear_items', JSON.stringify(items));
    alert('Item updated!');
    navigate('/dashboard');
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div className="glass" style={{ padding: '2rem', margin: '2rem' }}>
      <h2>✏️ Edit Item</h2>
      <form onSubmit={handleUpdate}>
        <input name="title" value={item.title} onChange={handleChange} placeholder="Title" required />
        <input name="description" value={item.description} onChange={handleChange} placeholder="Description" required />
        <input name="category" value={item.category} onChange={handleChange} placeholder="Category" />
        <input name="size" value={item.size} onChange={handleChange} placeholder="Size" />
        <input name="condition" value={item.condition} onChange={handleChange} placeholder="Condition" />
        <input name="tags" value={item.tags} onChange={handleChange} placeholder="Tags (comma separated)" />

        <button type="submit" className="cta-button">Update Item</button>
      </form>
    </div>
  );
}
