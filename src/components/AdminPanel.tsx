import React, { useState } from 'react';
import { Product, AdminSettings } from '../types';
import { 
  Plus, Edit2, Trash2, Settings, ShieldAlert, 
  Flame, HelpCircle, Save, ArrowLeft, RefreshCw, Smartphone, Video 
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  settings: AdminSettings;
  onUpdateProducts: (newProducts: Product[]) => void;
  onUpdateSettings: (newSettings: AdminSettings) => void;
  onExit: () => void;
}

export default function AdminPanel({ 
  products, 
  settings, 
  onUpdateProducts, 
  onUpdateSettings, 
  onExit 
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  
  // Settings Form State
  const [whatsapp, setWhatsapp] = useState(settings.whatsappNumber);
  const [heroVideo, setHeroVideo] = useState(settings.heroVideoUrl);
  const [secondaryVideo, setSecondaryVideo] = useState(settings.secondaryVideoUrl);
  
  // Product Modals/Form state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState(15.00);
  const [formImage, setFormImage] = useState('');
  const [formCategory, setFormCategory] = useState('Signature');

  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handlers for Settings
  const handleSaveSettings = () => {
    onUpdateSettings({
      whatsappNumber: whatsapp,
      heroVideoUrl: heroVideo,
      secondaryVideoUrl: secondaryVideo
    });
    triggerNotification('System Configurations updated successfully!');
  };

  // Handlers for Products CRUD
  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you absolute sure you want to delete this premium product?')) {
      const updated = products.filter(p => p.id !== id);
      onUpdateProducts(updated);
      triggerNotification('Product removed successfully.');
    }
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setIsAddMode(false);
    setFormName(p.name);
    setFormDesc(p.description);
    setFormPrice(p.price);
    setFormImage(p.image);
    setFormCategory(p.category);
  };

  const startAddProduct = () => {
    setIsAddMode(true);
    setEditingProduct(null);
    setFormName('');
    setFormDesc('');
    setFormPrice(15.00);
    setFormImage('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600');
    setFormCategory('Signature');
  };

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formDesc || !formImage) {
      alert('Please fill out all required fields.');
      return;
    }

    if (isAddMode) {
      const newProd: Product = {
        id: 'p-' + Date.now().toString(36),
        name: formName,
        description: formDesc,
        price: Number(formPrice),
        image: formImage,
        category: formCategory
      };
      onUpdateProducts([...products, newProd]);
      triggerNotification('Gourmet Product added successfully!');
      setIsAddMode(false);
    } else if (editingProduct) {
      const updated = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formName,
            description: formDesc,
            price: Number(formPrice),
            image: formImage,
            category: formCategory
          };
        }
        return p;
      });
      onUpdateProducts(updated);
      triggerNotification('Product modifications saved successfully!');
      setEditingProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-24 pb-16 px-6 font-sans relative">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6B00]/4 blur-[130px] rounded-full pointer-events-none" />

      {/* Floating alert status */}
      {notification && (
        <div className="fixed top-8 right-8 bg-[#FF6B00] text-black font-semibold text-xs tracking-widest uppercase px-6 py-3.5 rounded-[2px] shadow-lg border border-[#FF6B00] animate-bounce z-50">
          {notification}
        </div>
      )}

      {/* Outer wrapper */}
      <div className="max-w-7xl mx-auto">
        
        {/* Title and stats layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 pb-6 border-b border-white/5 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-[2px] border border-[#FF6B00]/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#FF6B00]" />
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#FFC857] uppercase font-bold">MANAGEMENT PANEL</span>
              <h1 className="font-heading text-4xl text-white uppercase tracking-tighter mt-1 font-black">
                CHARRED RESTAURANT <span className="text-[#FF6B00]">ADMIN</span>
              </h1>
            </div>
          </div>

          <button
            onClick={onExit}
            className="px-6 py-2.5 rounded-[2px] border border-white/15 hover:border-[#FF6B00] hover:text-[#FF6B00] text-xs font-sans tracking-widest font-black uppercase duration-300 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
          </button>
        </div>

        {/* Dashboard Grid setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Side Menu Tab Selector */}
          <div className="lg:col-span-3 bg-[#0d0d0d] border border-white/10 p-4 rounded-[2px] flex flex-col gap-2">
            <button
              onClick={() => { setActiveTab('products'); setIsAddMode(false); setEditingProduct(null); }}
              className={`w-full text-left px-4 py-3 rounded-[2px] font-heading text-lg tracking-tighter font-black uppercase transition-all duration-300 flex items-center justify-between cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#FF6B00] text-black'
                  : 'text-[#B8B8B8] hover:text-white hover:bg-white/3'
              }`}
            >
              <span>Manage Products</span>
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setIsAddMode(false); setEditingProduct(null); }}
              className={`w-full text-left px-4 py-3 rounded-[2px] font-heading text-lg tracking-tighter font-black uppercase transition-all duration-300 flex items-center justify-between cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#FF6B00] text-black'
                  : 'text-[#B8B8B8] hover:text-white hover:bg-white/3'
              }`}
            >
              <span>System Settings</span>
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Core Content Window */}
          <div className="lg:col-span-9 bg-[#0e0e0e] border border-white/10 p-6 sm:p-8 rounded-[2px] min-h-[500px]">
            
            {/* 1. TAB: PRODUCTS LIST */}
            {activeTab === 'products' && !isAddMode && !editingProduct && (
              <div>
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <h3 className="font-heading text-2xl text-white uppercase tracking-tighter font-black">
                    Product Catalog <span className="text-[#FF6B00]">({products.length})</span>
                  </h3>
                  
                  <button
                    onClick={startAddProduct}
                    className="px-5 py-2.5 rounded-[2px] bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] text-white font-sans text-xs tracking-widest font-black uppercase duration-300 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Product
                  </button>
                </div>

                {/* Catalog table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-mono tracking-widest text-[#B8B8B8] uppercase">
                        <th className="pb-4 font-semibold w-16">Image</th>
                        <th className="pb-4 font-semibold pl-4">Product Name</th>
                        <th className="pb-4 font-semibold">Category</th>
                        <th className="pb-4 font-semibold">Price</th>
                        <th className="pb-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map((p) => (
                        <tr key={p.id} className="group hover:bg-white/1 duration-200">
                          <td className="py-4">
                            <div className="w-12 h-12 rounded-[2px] bg-white/2 border border-white/10 p-1 flex items-center justify-center">
                              <img 
                                src={p.image} 
                                alt={p.name} 
                                className="max-h-full max-w-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </td>
                          <td className="py-4 pl-4">
                            <span className="font-heading text-lg text-white font-black block uppercase tracking-tighter">
                              {p.name}
                            </span>
                            <span className="text-xs text-[#B8B8B8] line-clamp-1 font-light max-w-md block">
                              {p.description}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="px-3 py-1 bg-[#161616] border border-white/10 text-[9px] font-mono tracking-wider uppercase rounded-[1px] text-[#B8B8B8]">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-4">
                            <span className="font-heading text-lg text-[#FFC857] tracking-tighter leading-none font-black">
                              ${p.price.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => startEditProduct(p)}
                                className="p-2 bg-white/2 hover:bg-[#FFC857]/10 border border-white/10 hover:border-[#FFC857]/30 text-[#B8B8B8] hover:text-[#FFC857] rounded-[2px] duration-300 cursor-pointer"
                                title="Edit Product Specs"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-2 bg-white/2 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-[#B8B8B8] hover:text-red-400 rounded-[2px] duration-300 cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. TAB: ADD/EDIT FORMS */}
            {activeTab === 'products' && (isAddMode || editingProduct) && (
              <div>
                <h3 className="font-heading text-2xl text-white uppercase tracking-wider mb-6 border-b border-white/5 pb-4">
                  {isAddMode ? 'Add New' : 'Modify'} <span className="text-[#FF6B00]">Gourmet Dish</span>
                </h3>

                <form onSubmit={handleSaveProductForm} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. The Truffle Obsidian"
                        className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                          Price ($ USD) *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0.50"
                          value={formPrice}
                          onChange={(e) => setFormPrice(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                          Category *
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors text-white"
                          required
                        >
                          <option value="Signature">Signature</option>
                          <option value="Elite">Elite</option>
                          <option value="Poultry">Poultry</option>
                          <option value="Vegetarian">Vegetarian</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                      Image URL (Direct high resolution render path) *
                    </label>
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/..."
                      className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors"
                      required
                    />
                    <p className="text-[10px] text-[#B8B8B8] mt-1.5 font-light font-mono leading-tight">
                      Provide a beautiful direct Unsplash, CDN, or Cloudinary graphic link with dark/transparent backdrop.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                      Descriptions & Infusions Ingredients *
                    </label>
                    <textarea
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      rows={4}
                      placeholder="Describe patties texture, unique glazes, specific smoked oak hickory char layers..."
                      className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Submit / Cancel layout row */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-[2px] bg-gradient-to-r from-[#FF6B00] to-[#E05300] hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] text-white font-sans text-xs tracking-widest font-black uppercase duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" /> Save Product Change
                    </button>

                    <button
                      type="button"
                      onClick={() => { setIsAddMode(false); setEditingProduct(null); }}
                      className="px-6 py-3 rounded-[2px] border border-white/15 hover:bg-white/5 text-xs font-sans tracking-widest font-black uppercase duration-300 cursor-pointer text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* 3. TAB: SYSTEM SETTINGS */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="font-heading text-2xl text-white uppercase tracking-tighter mb-6 border-b border-white/5 pb-4 font-black font-heading">
                  System <span className="text-[#FF6B00]">Configuration</span>
                </h3>

                <div className="space-y-6">
                  {/* Whatsapp number */}
                  <div>
                    <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                      <Smartphone className="w-3.5 h-3.5 text-[#FF6B00] inline mr-1.5 align-text-bottom" />
                      Admin WhatsApp Contact Number *
                    </label>
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="e.g. 03144460158"
                      className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors font-mono"
                      required
                    />
                    <p className="text-[10px] text-[#B8B8B8] mt-1.5 font-light font-mono leading-tight">
                      Required for automatic pre-filled WhatsApp routing templates.
                    </p>
                  </div>

                  {/* Hero Video URL */}
                  <div>
                    <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                      <Video className="w-3.5 h-3.5 text-[#FFC857] inline mr-1.5 align-text-bottom" />
                      Hero Background Video URL *
                    </label>
                    <input
                      type="url"
                      value={heroVideo}
                      onChange={(e) => setHeroVideo(e.target.value)}
                      placeholder="e.g. https://res.cloudinary.com/...mp4"
                      className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors font-mono"
                      required
                    />
                    <p className="text-[10px] text-[#B8B8B8] mt-1.5 font-light font-mono leading-tight text-wrap">
                      Direct MP4 link for landing background autoplay commercial loop.
                    </p>
                  </div>

                  {/* Secondary video URL */}
                  <div>
                    <label className="block text-xs font-mono text-[#B8B8B8] tracking-widest uppercase mb-2">
                      <Video className="w-3.5 h-3.5 text-[#FF6B00] inline mr-1.5 align-text-bottom" />
                      Showcase Interactive Video URL *
                    </label>
                    <input
                      type="url"
                      value={secondaryVideo}
                      onChange={(e) => setSecondaryVideo(e.target.value)}
                      placeholder="e.g. https://res.cloudinary.com/...mp4"
                      className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-[2px] focus:border-[#FF6B00] outline-none text-sm transition-colors font-mono"
                      required
                    />
                  </div>

                  {/* Actions row */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      className="px-6 py-3 rounded-[2px] bg-[#FF6B00] hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] text-black font-sans text-xs tracking-widest font-black uppercase duration-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-black" /> Save Configurations
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setWhatsapp('03144460158');
                        setHeroVideo('https://res.cloudinary.com/dchquihjt/video/upload/v1780153516/273900320_gucvfo.mp4?_s=public-apps');
                        setSecondaryVideo('https://res.cloudinary.com/dchquihjt/video/upload/v1780153623/983732204_jpbzfx.mp4?_s=public-apps');
                      }}
                      className="px-5 py-3 rounded-[2px] border border-white/15 hover:bg-white/5 text-xs font-sans tracking-widest font-black uppercase duration-300 flex items-center gap-1.5 cursor-pointer text-white"
                      title="Reset parameters to core cloud collection defaults"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-white" /> Reset to Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
