import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EditItem from './pages/EditItem';
import BrowseItems from './pages/BrowseItems';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowseItems />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit/:itemId" element={<EditItem />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
