import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import '../styles/LandingPage.css'; // ✅ Use the new CSS file

export default function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Welcome to ReWear</h1>
      <p>A sustainable platform to exchange clothes and reduce textile waste.</p>

      <div className="cta-buttons">
        <Link to="/dashboard"><button>Start Swapping</button></Link>
        <Link to="/dashboard"><button>Browse Items</button></Link>
        <Link to="/add-item"><button>List an Item</button></Link>
      </div>

      <Carousel />
    </div>
  );
}
