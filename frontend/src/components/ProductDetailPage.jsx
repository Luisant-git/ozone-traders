import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductById } from '../api/productApi';
import API_BASE_URL from '../config/api';
import { CartContext } from '../contexts/CartContext';
import LoadingSpinner from './LoadingSpinner';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { addToCart, loading: cartLoading } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [quantity, setQuantity] = useState(100); // grams

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(productId);
                setProduct(data);
                let firstImg = data.image || data.gallery?.[0]?.url || null;
                if (firstImg && firstImg.includes('localhost:4062')) {
                    firstImg = firstImg.replace('http://localhost:4062', API_BASE_URL);
                }
                setActiveImage(firstImg);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><LoadingSpinner /></div>;
    if (!product) return <div style={{ textAlign: 'center', padding: '4rem' }}>Product not found!</div>;

    let rawImages = [];
    if (product.image) rawImages.push(product.image);
    if (product.gallery) rawImages.push(...product.gallery.map(g => g.url));
    const images = [...new Set(rawImages)].map(url => {
        if (url && url.includes('localhost:4062')) {
            return url.replace('http://localhost:4062', API_BASE_URL);
        }
        return url;
    });

    const pricePerGram = parseFloat(product.basePrice) || 0;
    const calculatedPrice = ((pricePerGram * quantity) / 1).toFixed(2);
    const isInStock = (product.stock || 0) > 0;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: String(pricePerGram),
            quantity: 1,
            imageUrl: images[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
        });
    };

    const handleBuyNow = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: String(pricePerGram),
            quantity: 1,
            imageUrl: images[0] || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
        });
        navigate('/checkout');
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                {/* Image Gallery */}
                <div style={styles.imageSection}>
                    <div style={styles.mainImageWrapper}>
                        <img
                            src={activeImage || '/placeholder.svg'}
                            alt={product.name}
                            style={styles.mainImage}
                        />
                        {!isInStock && (
                            <div style={styles.outOfStockBadge}>Out of Stock</div>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div style={styles.thumbnailRow}>
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product.name} ${i + 1}`}
                                    style={{
                                        ...styles.thumbnail,
                                        border: activeImage === img ? '2px solid #92400e' : '2px solid #e5e7eb',
                                    }}
                                    onClick={() => setActiveImage(img)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div style={styles.detailsSection}>
                    <p style={styles.categoryTag}>{product.category?.name?.toUpperCase() || 'SPICE'}</p>
                    <h1 style={styles.productName}>{product.name}</h1>

                    {product.qualityGrade && (
                        <p style={styles.qualityTag}>Grade: <strong>{product.qualityGrade}</strong></p>
                    )}
                    {product.originLocation && (
                        <p style={styles.originTag}>📍 Origin: {product.originLocation}</p>
                    )}

                    {/* Pricing */}
                    <div style={styles.pricingBox}>
                        <div style={styles.priceRow}>
                            <span style={styles.priceLabel}>Retail Price</span>
                            <span style={styles.priceValue}>₹{product.basePrice} / gram</span>
                        </div>
                        {product.wholesalePrice && (
                            <div style={styles.priceRow}>
                                <span style={styles.priceLabel}>Wholesale Price</span>
                                <span style={{ ...styles.priceValue, color: '#15803d' }}>₹{product.wholesalePrice} / kg</span>
                            </div>
                        )}
                        <div style={styles.stockRow}>
                            <span style={{ color: isInStock ? '#15803d' : '#dc2626', fontWeight: 600 }}>
                                {isInStock ? `✓ In Stock (${product.stock} units)` : '✗ Out of Stock'}
                            </span>
                        </div>
                    </div>

                    {product.description && (
                        <div style={styles.descBox}>
                            <p style={styles.description}>{product.description}</p>
                        </div>
                    )}

                    {product.hsnCode && (
                        <p style={styles.hsnCode}>HSN Code: {product.hsnCode}</p>
                    )}

                    {/* Actions */}
                    <div style={styles.actionsRow}>
                        <button
                            style={{ ...styles.addCartBtn, opacity: (!isInStock || cartLoading) ? 0.6 : 1 }}
                            onClick={handleAddToCart}
                            disabled={!isInStock || cartLoading}
                        >
                            {cartLoading ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <button
                            style={{ ...styles.buyNowBtn, opacity: (!isInStock || cartLoading) ? 0.6 : 1 }}
                            onClick={handleBuyNow}
                            disabled={!isInStock || cartLoading}
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Wholesale note */}
                    {product.wholesalePrice && (
                        <div style={styles.wholesaleNote}>
                            <p>🌾 <strong>Bulk/Wholesale orders available.</strong> Contact us for special rates on orders above 10 kg.</p>
                            <a href="tel:9677951187" style={styles.callBtn}>📞 Call for Wholesale Pricing</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 4%', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Poppins', sans-serif" },
    container: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' },
    imageSection: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    mainImageWrapper: { position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#f9fafb' },
    mainImage: { width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' },
    outOfStockBadge: { position: 'absolute', top: '1rem', left: '1rem', background: '#dc2626', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 },
    thumbnailRow: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' },
    thumbnail: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' },
    detailsSection: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    categoryTag: { color: '#f59e0b', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', margin: 0 },
    productName: { fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: '#1f2937', margin: 0 },
    qualityTag: { color: '#6b7280', fontSize: '0.9rem', margin: 0 },
    originTag: { color: '#6b7280', fontSize: '0.9rem', margin: 0 },
    pricingBox: { background: '#fefce8', border: '1px solid #fef08a', borderRadius: '10px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    priceLabel: { color: '#6b7280', fontSize: '0.9rem' },
    priceValue: { fontWeight: 700, color: '#92400e', fontSize: '1.1rem' },
    stockRow: { marginTop: '0.5rem', fontSize: '0.9rem' },
    descBox: { background: '#f9fafb', borderRadius: '8px', padding: '1rem' },
    description: { color: '#4b5563', lineHeight: '1.7', margin: 0, fontSize: '0.95rem' },
    hsnCode: { color: '#9ca3af', fontSize: '0.8rem', margin: 0 },
    actionsRow: { display: 'flex', gap: '1rem', alignItems: 'center' },
    addCartBtn: { flex: 1, padding: '0.85rem', border: '2px solid #92400e', background: 'transparent', color: '#92400e', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', fontFamily: "'Poppins', sans-serif" },
    buyNowBtn: { flex: 1, padding: '0.85rem', border: 'none', background: '#92400e', color: '#fff', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem', fontFamily: "'Poppins', sans-serif" },
    wishlistBtn: { fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' },
    wholesaleNote: { background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#15803d' },
    callBtn: { color: '#92400e', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' },
};

export default ProductDetailPage;