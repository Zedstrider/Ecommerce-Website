import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PolicyPage from './pages/PolicyPage';
import PasswordPage from './pages/PasswordPage';
import SearchResults from './pages/SearchResults';
import NewsletterPopup from './components/layout/NewsletterPopup';
import TrackOrder from './pages/TrackOrder';
import { CartProvider } from './context/CartContext';


import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  //Check localStorage on initial load to see if they already logged in
  useEffect(() => {
    const storeAccess = localStorage.getItem('storeUnlocked');
    if (storeAccess === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  //Function to handle successful password entry
  const handleUnlock = () => {
    localStorage.setItem('storeUnlocked', 'true');
    setIsUnlocked(true);
  };

  //If not unlocked, render ONLY the Password Page
  if (!isUnlocked) {
    return <PasswordPage onUnlock={handleUnlock} />;
  }
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <div className="App d-flex flex-column min-vh-100">
            <Navbar />
            <NewsletterPopup />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/policies/:policyType" element={<PolicyPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/track" element={<TrackOrder />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;