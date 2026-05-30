import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getActiveProducts } from '../api/productApi';
import { getCategories } from '../api/categoryApi';
import { generateProductUrl } from '../utils/slugify';
import API_BASE_URL from '../config/api';
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch categories
    getCategories()
      .then(data => setCategories(data || []))
      .catch(err => console.error('Categories error:', err));

    // Fetch all products
    getActiveProducts()
      .then(data => setAllProducts(data || []))
      .catch(err => console.error('Products error:', err));
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Products filtered by selected category
  const filteredProducts = activeFilter === 'all'
    ? allProducts
    : allProducts.filter(p => p.categoryId === parseInt(activeFilter));

  const handleCategoryClick = (catId) => {
    setActiveFilter(String(catId));
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryImage = (cat) => {
    let url = cat.image;
    if (url && url.includes('localhost:4062')) {
      url = url.replace('http://localhost:4062', API_BASE_URL);
    }
    return url || `https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80`;
  };

  const getProductImage = (product) => {
    let url = product.image || product.gallery?.[0]?.url;
    if (url && url.includes('localhost:4062')) {
      url = url.replace('http://localhost:4062', API_BASE_URL);
    }
    return url || `https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80`;
  };

  return (
    <div className="home-page-container">
      {/* ── Hero Section ── */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <h1 className="hero-title">
            Get 10% off<br />
            <span className="hero-highlight">On all Spicy &amp; Herbs</span>
          </h1>
          <div className="hero-buttons" style={{ justifyContent: 'center' }}>
            <button className="btn btn-outline-hero btn-filled" onClick={() => {
              const el = document.getElementById('products');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Shop Now</button>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-text-wrapper">
            <h2 className="section-heading">The Richest Masala Traders in India</h2>
            <p className="about-paragraph">
              Ozone Traders is a trusted name in premium spice trading, located in Pudupettai, Attur, Salem.
              We specialize in delivering high-quality agricultural products sourced directly from farmers and trusted suppliers.
            </p>
            <p className="about-paragraph">
              Our core products include Cardamom, Black Pepper, Maize, Coffee Beans, Tea Leaves, and Red Chilli.
              With a strong focus on freshness and purity, we ensure every product meets quality standards before reaching our customers.
            </p>
            <div className="about-quote">
              <p>
                We believe that quality spices create unforgettable flavors. At Ozone Traders, our mission is to bring
                authentic taste and natural goodness from farms to your kitchen with trust and reliability.
              </p>
            </div>
          </div>
          <div className="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Various spices on table"
              className="about-image"
            />
          </div>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section className="categories-section" id="categories">
        <div className="section-header">
          <h2 className="section-heading">Explore Our Categories</h2>
          <p className="section-subheading">Discover the essence of nature in every grain.</p>
        </div>
        <div className="categories-grid" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length || 1, 4)}, 1fr)` }}>
          {categories.length === 0 ? (
            <p style={{ color: '#9ca3af', gridColumn: '1/-1', textAlign: 'center' }}>Loading categories...</p>
          ) : (
            categories.map(cat => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => handleCategoryClick(cat.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={getCategoryImage(cat)} alt={cat.name} />
                <div className="category-overlay"><h3>{cat.name}</h3></div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── Products Section ── */}
      <section className="best-products-section" id="products">
        <div className="section-header">
          <h2 className="section-heading">Our Products</h2>
          <p className="section-subheading">Farm-fresh premium quality spices &amp; agricultural products</p>
          <div className="stars">★★★★★</div>
        </div>

        {/* Category filter pills */}
        <div className="category-pills">
          <button
            className={`pill-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`pill-btn ${activeFilter === String(cat.id) ? 'active' : ''}`}
              onClick={() => setActiveFilter(String(cat.id))}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <p style={{ color: '#9ca3af', gridColumn: '1/-1', textAlign: 'center', padding: '2rem' }}>No products found.</p>
          ) : (
            filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(generateProductUrl(product.name, product.id))}
              >
                <div className="product-image-container">
                  {product.tags && product.tags.length > 0 && (() => {
                    const tag = product.tags[0];
                    const tagLower = tag.toLowerCase();
                    let badgeClass = 'premium';
                    if (tagLower.includes('popular') || tagLower.includes('trending') || tagLower.includes('hot')) badgeClass = 'popular';
                    else if (tagLower.includes('off') || tagLower.includes('sale') || tagLower.includes('discount')) badgeClass = 'discount';
                    const tagIcon = badgeClass === 'popular' ? '🔥 ' : badgeClass === 'premium' ? '★ ' : '';
                    return <div className={`product-badge ${badgeClass}`}>{tagIcon}{tag}</div>;
                  })()}
                  <img src={getProductImage(product)} alt={product.name} />
                </div>
                <div className="product-info">
                  <span className="product-subtitle">{product.category?.name?.toUpperCase() || 'PREMIUM SPICE'}</span>
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-desc">
                    {product.description
                      ? product.description.substring(0, 100) + '...'
                      : 'Premium quality spice with rich aroma and authentic flavor.'}
                  </p>
                  <p className="product-price">₹{product.basePrice}<span>/gram</span></p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="contact-section" id="contact">
        <div className="section-header">
          <h2 className="section-heading">Contact Us</h2>
          <p className="section-subheading">We'd love to hear from you. Reach out anytime.</p>
        </div>
        <div className="contact-card-wrapper">
          <div className="contact-card">
            <div className="contact-icon"><MapPin size={32} /></div>
            <h3 className="contact-title">Our Location</h3>
            <h4 className="contact-company">OZONE TRADERS</h4>
            <div className="contact-address">
              <p>122/B, Pudupettai Bazaar Street</p>
              <p>Pudupettai, Attur, Salem - 636141</p>
              <p>Tamilnadu, India</p>
            </div>
            <div className="contact-divider"></div>
            <div className="contact-details">
              <div className="contact-detail-item">
                <Mail size={16} />
                <a href="mailto:Ozonetraders030302026@gmail.com" style={{ color: '#92400e', textDecoration: 'none' }}>
                  Ozonetraders030302026@gmail.com
                </a>
              </div>
              <div className="contact-detail-item">
                <Phone size={16} />
                <a href="tel:9677951187" style={{ color: '#92400e', textDecoration: 'none' }}>9677951187</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top */}
      <button className="scroll-to-top" onClick={scrollToTop}><ArrowUp size={20} /></button>
    </div>
  );
};

export default HomePage;
