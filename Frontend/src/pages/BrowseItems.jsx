import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/rewear.css';

const BrowseItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Dummy data - In a real app, this would come from an API
  useEffect(() => {
    const dummyItems = [
      {
        id: 1,
        title: "Vintage Leather Jacket",
        category: "Jackets",
        size: "M",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop"],
        uploader: "user1@example.com",
        uploadDate: "2024-01-15",
        points: 150,
        description: "Classic brown leather jacket in great condition"
      },
      {
        id: 2,
        title: "Floral Summer Dress",
        category: "Dresses",
        size: "S",
        condition: "Excellent",
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop"],
        uploader: "user2@example.com",
        uploadDate: "2024-01-20",
        points: 120,
        description: "Beautiful floral print dress, perfect for summer"
      },
      {
        id: 3,
        title: "Designer White Sneakers",
        category: "Shoes",
        size: "42",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"],
        uploader: "user3@example.com",
        uploadDate: "2024-01-25",
        points: 200,
        description: "High-end white sneakers, barely worn"
      },
      {
        id: 4,
        title: "Wool Winter Coat",
        category: "Coats",
        size: "L",
        condition: "Excellent",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"],
        uploader: "user4@example.com",
        uploadDate: "2024-01-30",
        points: 300,
        description: "Warm wool coat for winter, excellent condition"
      },
      {
        id: 5,
        title: "Denim Skinny Jeans",
        category: "Bottoms",
        size: "30",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=400&fit=crop"],
        uploader: "user5@example.com",
        uploadDate: "2024-02-01",
        points: 80,
        description: "Classic blue denim jeans, skinny fit"
      },
      {
        id: 6,
        title: "Silk Blouse",
        category: "Tops",
        size: "M",
        condition: "Excellent",
        images: ["https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=400&fit=crop"],
        uploader: "user6@example.com",
        uploadDate: "2024-02-05",
        points: 180,
        description: "Elegant silk blouse in cream color"
      },
      {
        id: 7,
        title: "Casual T-Shirt",
        category: "Tops",
        size: "L",
        condition: "Good",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"],
        uploader: "user7@example.com",
        uploadDate: "2024-02-10",
        points: 50,
        description: "Comfortable cotton t-shirt in navy blue"
      },
      {
        id: 8,
        title: "Leather Handbag",
        category: "Accessories",
        size: "One Size",
        condition: "Excellent",
        images: ["https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop"],
        uploader: "user8@example.com",
        uploadDate: "2024-02-12",
        points: 250,
        description: "Genuine leather handbag with multiple compartments"
      }
    ];

    // Load items from localStorage if available, otherwise use dummy data
    const savedItems = localStorage.getItem('rewear_items');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setItems([...dummyItems, ...parsedItems]);
    } else {
      setItems(dummyItems);
      localStorage.setItem('rewear_items', JSON.stringify(dummyItems));
    }
  }, []);

  // Filter and sort items
  useEffect(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort items
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    } else if (sortBy === 'points-low') {
      filtered.sort((a, b) => a.points - b.points);
    } else if (sortBy === 'points-high') {
      filtered.sort((a, b) => b.points - a.points);
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', 'Dresses', 'Jackets', 'Shoes', 'Coats', 'Bottoms', 'Tops', 'Accessories'];

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>Browse Items</h1>
        <p>Discover amazing clothing items from our community</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-controls">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="points-low">Points: Low to High</option>
            <option value="points-high">Points: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>Showing {filteredItems.length} items</p>
      </div>

      {/* Items Grid */}
      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <div className="no-results">
            <h3>No items found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-image">
                <img src={item.images[0]} alt={item.title} />
                <div className="item-condition">{item.condition}</div>
              </div>
              
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-size">Size: {item.size}</p>
                <p className="item-points">{item.points} points</p>
                
                <div className="item-actions">
                  <Link to={`/item/${item.id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                  <button className="btn btn-secondary btn-sm">
                    ♡ Save
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Button (for pagination in future) */}
      {filteredItems.length > 0 && (
        <div className="load-more">
          <button className="btn btn-outline">Load More Items</button>
        </div>
      )}
    </div>
  );
};

export default BrowseItems;
