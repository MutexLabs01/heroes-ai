import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Marketplace from './pages/Marketplace';
import ItemDetail from './pages/ItemDetail';
import CreatorDashboard from './pages/CreatorDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Header user={user} setUser={setUser} cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<Marketplace cart={cart} setCart={setCart} />} />
          <Route path="/item/:id" element={<ItemDetail cart={cart} setCart={setCart} />} />
          <Route path="/creator" element={<CreatorDashboard user={user} />} />
          <Route path="/dashboard" element={<UserDashboard user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;