import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActiveProducts } from "../api/productApi";
import LoadingSpinner from "./LoadingSpinner";
import { generateProductUrl } from "../utils/slugify";
import API_BASE_URL from "../config/api";

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getActiveProducts();
        const catId = parseInt(categoryId || subcategoryId);
        const filtered = data.filter((p) => p.categoryId === catId);
        setProducts(filtered);
        if (filtered.length > 0) {
          setCategoryName(filtered[0].category?.name || 'Products');
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, subcategoryId]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><LoadingSpinner /></div>;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        .cat-page {
          padding: 90px 4% 3rem;
          max-width: 1400px;
          margin: 0 auto;
          font-family: 'Poppins', sans-serif;
        }
        .cat-page-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .cat-page-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #92400e;
          margin: 0 0 0.5rem;
        }
        .cat-page-subtitle {
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        .cat-search-input {
          padding: 0.6rem 1.2rem;
          border: 1px solid #d1d5db;
          border-radius: 30px;
          width: 300px;
          max-width: 90%;
          font-size: 0.9rem;
          outline: none;
        }
        .cat-no-results {
          text-align: center;
          color: #9ca3af;
          padding: 3rem 0;
        }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .cat-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          background: #fff;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }
        .cat-card:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }
        .cat-image-wrapper {
          position: relative;
          aspect-ratio: 1/1;
          overflow: hidden;
          background: #f9fafb;
        }
        .cat-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .cat-card:hover .cat-image {
          transform: scale(1.05);
        }
        .cat-oos-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: #dc2626;
          color: #fff;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .cat-card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .cat-tag {
          color: #f59e0b;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin: 0;
        }
        .cat-product-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          color: #1f2937;
          margin: 0;
        }
        .cat-price-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .cat-price {
          font-weight: 700;
          color: #92400e;
          font-size: 1rem;
        }
        .cat-wholesale-price {
          color: #6b7280;
          font-size: 0.8rem;
        }
        .cat-origin {
          color: #9ca3af;
          font-size: 0.8rem;
          margin: 0;
        }

        @media (max-width: 768px) {
          .cat-page {
            padding: 80px 4% 2rem;
          }
          .cat-page-title {
            font-size: 1.8rem;
          }
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .cat-card-body {
            padding: 0.85rem;
          }
          .cat-product-name {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .cat-page {
            padding: 80px 3% 2rem;
          }
          .cat-page-title {
            font-size: 1.5rem;
          }
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
          }
          .cat-search-input {
            width: 100%;
            max-width: 100%;
          }
          .cat-card-body {
            padding: 0.6rem;
          }
          .cat-product-name {
            font-size: 0.85rem;
          }
          .cat-price {
            font-size: 0.8rem;
          }
          .cat-wholesale-price {
            display: none;
          }
        }
      `}</style>

      <div className="cat-page">
        <div className="cat-page-header">
          <h1 className="cat-page-title">{categoryName || 'Products'}</h1>
          <p className="cat-page-subtitle">{products.length} products available</p>
          <input
            type="text"
            placeholder="Search in this category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="cat-search-input"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="cat-no-results">No products found.</p>
        ) : (
          <div className="cat-grid">
            {filtered.map((product) => {
              const rawUrl = product.gallery?.[0]?.url || '';
              const imgUrl = rawUrl
                ? rawUrl.replace('http://localhost:4062', API_BASE_URL)
                : '/placeholder.svg';
              const isInStock = (product.stock || 0) > 0;
              return (
                <div
                  key={product.id}
                  className="cat-card"
                  onClick={() => navigate(generateProductUrl(product.name, product.id))}
                >
                  <div className="cat-image-wrapper">
                    <img src={imgUrl} alt={product.name} className="cat-image" />
                    {!isInStock && <div className="cat-oos-badge">Out of Stock</div>}
                  </div>
                  <div className="cat-card-body">
                    <p className="cat-tag">{product.category?.name?.toUpperCase()}</p>
                    <h3 className="cat-product-name">{product.name}</h3>
                    <div className="cat-price-row">
                      <span className="cat-price">₹{product.basePrice}/g</span>
                      {product.wholesalePrice && (
                        <span className="cat-wholesale-price">₹{product.wholesalePrice}/kg wholesale</span>
                      )}
                    </div>
                    {product.originLocation && (
                      <p className="cat-origin">📍 {product.originLocation}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
