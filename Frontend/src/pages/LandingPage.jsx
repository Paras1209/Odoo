import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import '../styles/rewear.css';

export default function LandingPage() {
  // Dummy data for featured items
  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      category: "Jackets",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
      condition: "Good",
      size: "M"
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      category: "Dresses",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      condition: "Excellent",
      size: "S"
    },
    {
      id: 3,
      title: "Casual White Sneakers",
      category: "Shoes",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      condition: "Good",
      size: "42"
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      category: "Coats",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      condition: "Excellent",
      size: "L"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to ReWear</h1>
          <p className="hero-subtitle">
            Join the sustainable fashion revolution! Exchange unused clothing through direct swaps 
            or our point-based redemption system. Together, we can reduce textile waste and give 
            your clothes a second life.
          </p>
          <div className="hero-buttons">
            <Link to="/browse" className="btn btn-primary">Start Swapping</Link>
            <Link to="/browse" className="btn btn-secondary">Browse Items</Link>
            <Link to="/add-item" className="btn btn-accent">List an Item</Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop" 
            alt="Sustainable Fashion" 
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=200&fit=crop" alt="Dresses" />
            <h3>Dresses</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=200&fit=crop" alt="Jackets" />
            <h3>Jackets</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=200&fit=crop" alt="Shoes" />
            <h3>Shoes</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=200&fit=crop" alt="Accessories" />
            <h3>Accessories</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=300&h=200&fit=crop" alt="Tops" />
            <h3>Tops</h3>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1604176354204-9268737828e4?w=300&h=200&fit=crop" alt="Bottoms" />
            <h3>Bottoms</h3>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="featured-section">
        <h2>Featured Items</h2>
        <div className="featured-grid">
          {featuredItems.map(item => (
            <div key={item.id} className="featured-item">
              <img src={item.image} alt={item.title} />
              <div className="item-info">
                <h3>{item.title}</h3>
                <p className="category">{item.category}</p>
                <div className="item-details">
                  <span className="condition">Condition: {item.condition}</span>
                  <span className="size">Size: {item.size}</span>
                </div>
                <Link to={`/item/${item.id}`} className="btn btn-sm">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How ReWear Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-icon">📷</div>
            <h3>List Your Items</h3>
            <p>Upload photos and details of clothes you no longer wear</p>
          </div>
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>Browse & Discover</h3>
            <p>Find amazing items from other users in your area</p>
          </div>
          <div className="step">
            <div className="step-icon">🔄</div>
            <h3>Swap or Redeem</h3>
            <p>Exchange items directly or use points to get what you want</p>
          </div>
          <div className="step">
            <div className="step-icon">🌱</div>
            <h3>Save the Planet</h3>
            <p>Reduce textile waste and promote sustainable fashion</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>"ReWear has transformed how I think about fashion. I've found amazing pieces while giving my old clothes new life!"</p>
            <span>- Sarah K.</span>
          </div>
          <div className="testimonial">
            <p>"The point system is brilliant. I've earned points from my listings and found designer pieces at a fraction of the cost."</p>
            <span>- Michael R.</span>
          </div>
          <div className="testimonial">
            <p>"Love the sustainability aspect. It feels good to reduce waste while updating my wardrobe."</p>
            <span>- Emma L.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
