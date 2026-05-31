import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, AdminSettings } from './types';
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from './data';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedMenu from './components/FeaturedMenu';
import SellersShowcase from './components/SellersShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import WhatsappPopup from './components/WhatsappPopup';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'restaurant' | 'admin'>('restaurant');
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(DEFAULT_SETTINGS);
  
  // High-end active order popup triggers
  const [activeOrderProduct, setActiveOrderProduct] = useState<Product | null>(null);

  // Initialize and load from LocalStorage
  useEffect(() => {
    // 1. Path routing check for route '/restaurant-admin'
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path === '/restaurant-admin' || hash === '#restaurant-admin') {
      setCurrentView('admin');
    }

    // Also watch for hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#restaurant-admin') {
        setCurrentView('admin');
      } else if (window.location.hash === '#home' || window.location.hash === '') {
        setCurrentView('restaurant');
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    // 2. Load Products state
    const savedProducts = localStorage.getItem('charred_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (err) {
        setProducts(DEFAULT_PRODUCTS);
      }
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('charred_products', JSON.stringify(DEFAULT_PRODUCTS));
    }

    // 3. Load Settings configurations
    const savedSettings = localStorage.getItem('charred_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (err) {
        setSettings(DEFAULT_SETTINGS);
      }
    } else {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem('charred_settings', JSON.stringify(DEFAULT_SETTINGS));
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync Products changes to LocalStorage
  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('charred_products', JSON.stringify(newProducts));
  };

  // Sync Settings changes to LocalStorage
  const handleUpdateSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
    localStorage.setItem('charred_settings', JSON.stringify(newSettings));
  };

  const handleOrderInitiated = (prod: Product) => {
    setActiveOrderProduct(prod);
  };

  // Triggered when general order is clicked
  const handleGeneralOrderClick = () => {
    // Select the first product as a standard epicurean placeholder to order
    if (products.length > 0) {
      handleOrderInitiated(products[0]);
    }
  };

  const scrollMenuIntoView = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden selection:bg-[#FF6B00] selection:text-black">
      
      {/* Primary Global Sticky Navbar Header */}
      <Navbar 
        currentView={currentView} 
        setView={(v) => {
          setCurrentView(v);
          // Set hash appropriately
          window.location.hash = v === 'admin' ? '#restaurant-admin' : '#home';
        }}
        onOrderClick={handleGeneralOrderClick}
      />

      <AnimatePresence mode="wait">
        {currentView === 'restaurant' ? (
          <motion.div
            key="restaurant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* HERO SECTION */}
            <Hero 
              videoUrl={settings.heroVideoUrl}
              onOrderClick={handleGeneralOrderClick}
              onViewMenuClick={scrollMenuIntoView}
            />

            {/* FEATURED MENU SLIDER SECTION */}
            <FeaturedMenu 
              products={products}
              onOrderProduct={handleOrderInitiated}
            />

            {/* CINEMATIC BEST SELLERS SHOWCASE */}
            <SellersShowcase 
              secondaryVideoUrl={settings.secondaryVideoUrl}
            />

            {/* WHY CHOOSE US CARDS SECTION */}
            <WhyChooseUs />

            {/* MICHELIN CUSTOMER REVIEWS */}
            <Reviews />

            {/* EXPENSIVE LUXURY FOOTER */}
            <Footer 
              whatsappNumber={settings.whatsappNumber}
              setView={(v) => {
                setCurrentView(v);
                window.location.hash = v === 'admin' ? '#restaurant-admin' : '#home';
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* ADMIN CRUD CONTROL PANEL */}
            <AdminPanel 
              products={products}
              settings={settings}
              onUpdateProducts={handleUpdateProducts}
              onUpdateSettings={handleUpdateSettings}
              onExit={() => {
                setCurrentView('restaurant');
                window.location.hash = '#home';
              }}
            />

            <Footer 
              whatsappNumber={settings.whatsappNumber}
              setView={(v) => {
                setCurrentView(v);
                window.location.hash = v === 'admin' ? '#restaurant-admin' : '#home';
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP AUTOMATIC REDIRECT AND SUCCESS STATUS CONFIRMATION POPUP */}
      <AnimatePresence>
        {activeOrderProduct && (
          <WhatsappPopup 
            product={activeOrderProduct}
            adminPhone={settings.whatsappNumber}
            onClose={() => setActiveOrderProduct(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
