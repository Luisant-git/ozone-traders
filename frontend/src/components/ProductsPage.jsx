import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getActiveProducts } from '../api/productApi';
import { getCategories } from '../api/categoryApi';
import { generateProductUrl } from '../utils/slugify';
import LoadingSpinner from './LoadingSpinner';
import API_BASE_URL from '../config/api';

const ProductsPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const selectedCategory = searchParams.get('category') || 'all';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [prods, cats] = await Promise.all([getActiveProducts(), getCategories()]);
                setProducts(prods || []);
                setCategories(cats || []);
            } catch (err) {
                console.error('Failed to load products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = products.filter(p => {
        const catMatch = selectedCategory === 'all' || p.categoryId === parseInt(selectedCategory);
        const searchMatch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return catMatch && searchMatch;
    });

    return (
        <div style={styles.page}>
            {/* Page Header */}
            <div style={styles.pageHeader}>
                <h1 style={styles.title}>Our Products</h1>
                <p style={styles.subtitle}>Farm-fresh premium quality spices & agricultural products</p>
            </div>

            {/* Filters */}
            <div style={styles.filterBar}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
                <div style={styles.categoryPills}>
                    <button
                        style={{ ...styles.pill, ...(selectedCategory === 'all' ? styles.pillActive : {}) }}
                        onClick={() => setSearchParams({})}
                    >
                        All Products
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            style={{ ...styles.pill, ...(selectedCategory === String(cat.id) ? styles.pillActive : {}) }}
                            onClick={() => setSearchParams({ category: cat.id })}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            <p style={styles.resultCount}>{filtered.length} products found</p>

            {/* Grid */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <LoadingSpinner />
                </div>
            ) : filtered.length === 0 ? (
                <p style={styles.noResults}>No products found.</p>
            ) : (
                <div style={styles.grid}>
                    {filtered.map(product => {
                        const rawUrl = product.gallery?.[0]?.url || '';
                        const imgUrl = rawUrl
                            ? rawUrl.replace('http://localhost:4062', API_BASE_URL)
                            : '/placeholder.svg';
                        const isInStock = (product.stock || 0) > 0;
                        return (
                            <div
                                key={product.id}
                                style={styles.card}
                                onClick={() => navigate(generateProductUrl(product.name, product.id))}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'}
                            >
                                <div style={styles.imgWrap}>
                                    <img src={imgUrl} alt={product.name} style={styles.img} />
                                    {!isInStock && <div style={styles.oosBadge}>Out of Stock</div>}
                                    {product.featured && <div style={styles.featuredBadge}>★ Featured</div>}
                                </div>
                                <div style={styles.cardBody}>
                                    <p style={styles.catTag}>{product.category?.name?.toUpperCase() || ''}</p>
                                    <h3 style={styles.productName}>{product.name}</h3>
                                    {product.description && (
                                        <p style={styles.desc}>{product.description.slice(0, 80)}...</p>
                                    )}
                                    <div style={styles.priceRow}>
                                        <span style={styles.price}>₹{product.basePrice}<span style={styles.unit}>/g</span></span>
                                        {product.wholesalePrice && (
                                            <span style={styles.wholesale}>₹{product.wholesalePrice}/kg wholesale</span>
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
    page: { padding: '90px 4% 3rem', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Poppins',sans-serif" },
    pageHeader: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontFamily: "'Playfair Display',serif", fontSize: '2.8rem', color: '#92400e', margin: '0 0 0.5rem' },
    subtitle: { color: '#6b7280', fontSize: '1rem', margin: 0 },
    filterBar: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1rem' },
    searchInput: { padding: '0.6rem 1.25rem', border: '1px solid #d1d5db', borderRadius: '30px', width: '320px', fontSize: '0.9rem', outline: 'none', fontFamily: "'Poppins',sans-serif" },
    categoryPills: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' },
    pill: { padding: '0.45rem 1.25rem', border: '1px solid #92400e', background: 'transparent', color: '#92400e', borderRadius: '30px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: "'Poppins',sans-serif", transition: 'all 0.2s' },
    pillActive: { background: '#92400e', color: '#fff' },
    resultCount: { textAlign: 'center', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '1.5rem' },
    noResults: { textAlign: 'center', color: '#9ca3af', padding: '3rem 0' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' },
    card: { border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s ease' },
    imgWrap: { position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#f9fafb' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    oosBadge: { position: 'absolute', top: '0.75rem', left: '0.75rem', background: '#dc2626', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600 },
    featuredBadge: { position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#92400e', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600 },
    cardBody: { padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' },
    catTag: { color: '#f59e0b', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1px', margin: 0 },
    productName: { fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', color: '#1f2937', margin: 0 },
    desc: { color: '#9ca3af', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 },
    priceRow: { display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' },
    price: { fontWeight: 700, color: '#92400e', fontSize: '1.05rem' },
    unit: { fontSize: '0.75rem', fontWeight: 400, color: '#6b7280' },
    wholesale: { color: '#6b7280', fontSize: '0.75rem' },
    origin: { color: '#9ca3af', fontSize: '0.75rem', margin: 0 },
};

export default ProductsPage;
