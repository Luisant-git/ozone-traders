import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActiveProducts } from "../api/productApi";
import LoadingSpinner from "./LoadingSpinner";
import { generateProductUrl } from "../utils/slugify";

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
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>{categoryName || 'Products'}</h1>
        <p style={styles.subtitle}>{products.length} products available</p>
        <input
          type="text"
          placeholder="Search in this category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {filtered.length === 0 ? (
        <p style={styles.noResults}>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {filtered.map((product) => {
            const imgUrl = product.gallery?.[0]?.url || '/placeholder.svg';
            const isInStock = (product.stock || 0) > 0;
            return (
              <div
                key={product.id}
                style={styles.card}
                onClick={() => navigate(generateProductUrl(product.name, product.id))}
              >
                <div style={styles.imageWrapper}>
                  <img src={imgUrl} alt={product.name} style={styles.image} />
                  {!isInStock && <div style={styles.oosBadge}>Out of Stock</div>}
                </div>
                <div style={styles.cardBody}>
                  <p style={styles.catTag}>{product.category?.name?.toUpperCase()}</p>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <div style={styles.priceRow}>
                    <span style={styles.price}>₹{product.basePrice}/g</span>
                    {product.wholesalePrice && (
                      <span style={styles.wholesalePrice}>₹{product.wholesalePrice}/kg wholesale</span>
                    )}
                  </div>
                  {product.originLocation && (
                    <p style={styles.origin}>📍 {product.originLocation}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { padding: '2rem 4%', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Poppins', sans-serif" },
  header: { textAlign: 'center', marginBottom: '3rem' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#92400e', margin: '0 0 0.5rem' },
  subtitle: { color: '#6b7280', marginBottom: '1.5rem' },
  searchInput: { padding: '0.6rem 1.2rem', border: '1px solid #d1d5db', borderRadius: '30px', width: '300px', fontSize: '0.9rem', outline: 'none' },
  noResults: { textAlign: 'center', color: '#9ca3af', padding: '3rem 0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' },
  card: { border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', background: '#fff', transition: 'box-shadow 0.3s ease' },
  imageWrapper: { position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#f9fafb' },
  image: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' },
  oosBadge: { position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#dc2626', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 },
  cardBody: { padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  catTag: { color: '#f59e0b', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px', margin: 0 },
  productName: { fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#1f2937', margin: 0 },
  priceRow: { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' },
  price: { fontWeight: 700, color: '#92400e', fontSize: '1rem' },
  wholesalePrice: { color: '#6b7280', fontSize: '0.8rem' },
  origin: { color: '#9ca3af', fontSize: '0.8rem', margin: 0 },
};

export default CategoryPage;
