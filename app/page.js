"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle, Smartphone, Code, Globe, ArrowRight, Zap } from 'lucide-react';

const products = [
  {
    id: 'ziba-scores',
    name: 'Ziba Scores Pro',
    description: 'AI-Powered Football Prediction Engine with Poisson & Machine Learning models.',
    price: 'K500',
    originalPrice: 'K2,500',
    features: ['Custom AI Engine', 'Real-time Scores', 'Lenco Integration', 'Admin Dashboard'],
    type: 'Mobile App'
  },
  {
    id: 'ecommerce-elite',
    name: 'RetailFlow Pro',
    description: 'Complete e-commerce solution for Zambian businesses with mobile money.',
    price: 'K500',
    originalPrice: 'K3,000',
    features: ['Inventory Sync', 'Marketplace Ready', 'R2 Storage', 'Customer CRM'],
    type: 'PWA/Mobile'
  },
  {
    id: 'church-loop',
    name: 'ChurchConnect',
    description: 'Engage your congregation with spiritual content, events, and giving.',
    price: 'K500',
    originalPrice: 'K2,000',
    features: ['Member Database', 'Events Management', 'Multi-tenant Support', 'Sermon Library'],
    type: 'Mobile App'
  }
];

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handlePurchase = (product) => {
    alert(`Redirecting to Lenco for ${product.name} (Promo Price: ${product.price})`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-green-500/10 text-[#00FF88] px-4 py-1 rounded-full text-sm font-bold border border-green-500/20 mb-6 inline-block">
            LIMITED TIME PROMO: FIRST 100 SALES
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
            CARPSO <span className="text-gradient">SOLUTIONS</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Premium App Templates for the Next Generation of Zambian Entrepreneurs.
            One-time payment. Lifetime ownership.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-[#00FF88] text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              Explore templates <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold">Featured Templates</h2>
            <p className="text-gray-500 mt-2">Professional source code ready to deploy.</p>
          </div>
          <div className="text-right">
            <Text className="text-gradient font-bold text-2xl">ONLY K500</Text>
            <p className="text-sm text-gray-600">Limited offer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-white/5 rounded-2xl">
                  {product.type === 'Mobile App' ? <Smartphone className="text-[#00FF88]" /> : <Globe className="text-[#00BAFF]" />}
                </div>
                <div className="text-right">
                  <span className="text-gray-500 line-through text-xs block">{product.originalPrice}</span>
                  <span className="text-2xl font-black text-[#00FF88]">{product.price}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-3 mb-8">
                {product.features.map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle size={14} className="text-[#00FF88]" />
                    {f}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePurchase(product)}
                className="w-full bg-white/5 hover:bg-[#00FF88] hover:text-black py-4 rounded-2xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap size={18} fill="currentColor" /> Buy Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 px-4 text-center text-gray-600">
        <p>© 2026 Carpso Solutions. Powered by Ziba AI.</p>
      </footer>
    </div>
  );
}
