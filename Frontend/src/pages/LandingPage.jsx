import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import '../styles/global.css'; // Assuming you have a CSS file for styling the LandingPage
export default function LandingPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to ReWear</h1>
      <p>A sustainable platform to exchange clothes and reduce textile waste.</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Link to="/dashboard"><button>Start Swapping</button></Link>
        <Link to="/dashboard"><button>Browse Items</button></Link>
        <Link to="/add-item"><button>List an Item</button></Link>
      </div>

      <Carousel />
    </div>
  );
}
