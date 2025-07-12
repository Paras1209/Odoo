import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EditItem from './pages/EditItem';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/item/:itemId" element={<ItemDetail />} />
        <Route path="/edit/:itemId" element={<EditItem />} />
      </Routes>
    </>
  );
}

export default App;
