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
        <>
        <style>{`
            .pdp-page { padding: 90px 4% 4rem; max-width: 1200px; margin: 0 auto; font-family: 'Poppins', sans-serif; }
            .pdp-container { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
            .pdp-image-section { display: flex; flex-direction: column; gap: 1rem; }
            .pdp-main-image-wrapper { position: relative; border-radius: 12px; overflow: hidden; background: #f9fafb; }
            .pdp-main-image { width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; }
            .pdp-out-of-stock { position: absolute; top: 1rem; left: 1rem; background: #dc2626; color: #fff; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
            .pdp-thumbnail-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }
            .pdp-thumbnail { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; cursor: pointer; }
            .pdp-details-section { display: flex; flex-direction: column; gap: 1rem; }
            .pdp-category { color: #f59e0b; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; margin: 0; }
            .pdp-title { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #1f2937; margin: 0; }
            .pdp-quality { color: #6b7280; font-size: 0.9rem; margin: 0; }
            .pdp-origin { color: #6b7280; font-size: 0.9rem; margin: 0; }
            .pdp-pricing-box { background: #fefce8; border: 1px solid #fef08a; border-radius: 10px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; }
            .pdp-price-row { display: flex; justify-content: space-between; align-items: center; }
            .pdp-price-label { color: #6b7280; font-size: 0.9rem; }
            .pdp-price-value { font-weight: 700; color: #92400e; font-size: 1.1rem; }
            .pdp-stock-row { margin-top: 0.5rem; font-size: 0.9rem; }
            .pdp-desc-box { background: #f9fafb; border-radius: 8px; padding: 1rem; }
            .pdp-desc { color: #4b5563; line-height: 1.7; margin: 0; font-size: 0.95rem; }
            .pdp-hsn { color: #9ca3af; font-size: 0.8rem; margin: 0; }
            .pdp-actions { display: flex; gap: 1rem; align-items: center; }
            .pdp-add-btn { flex: 1; padding: 0.85rem; border: 2px solid #92400e; background: transparent; color: #92400e; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.95rem; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
            .pdp-add-btn:hover:not(:disabled) { background: #fffbeb; }
            .pdp-buy-btn { flex: 1; padding: 0.85rem; border: none; background: #92400e; color: #fff; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.95rem; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
            .pdp-buy-btn:hover:not(:disabled) { background: #78350f; }
            .pdp-wholesale { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; color: #15803d; }
            .pdp-call-btn { color: #92400e; font-weight: 600; text-decoration: none; font-size: 0.9rem; }
            
            @media (max-width: 900px) {
                .pdp-container { grid-template-columns: 1fr; gap: 2rem; }
                .pdp-page { padding: 90px 4% 2rem; }
            }
            @media (max-width: 480px) {
                .pdp-page { padding: 80px 4% 2rem; }
                .pdp-title { font-size: 1.8rem; }
                .pdp-actions { flex-direction: column; }
                .pdp-add-btn, .pdp-buy-btn { width: 100%; }
                .pdp-pricing-box { padding: 1rem; }
                .pdp-desc-box { padding: 0.8rem; }
            }
        `}</style>
        <div className="pdp-page">
            <div className="pdp-container">
                {/* Image Gallery */}
                <div className="pdp-image-section">
                    <div className="pdp-main-image-wrapper">
                        <img
                            src={activeImage || '/placeholder.svg'}
                            alt={product.name}
                            className="pdp-main-image"
                        />
                        {!isInStock && (
                            <div className="pdp-out-of-stock">Out of Stock</div>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="pdp-thumbnail-row">
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product.name} ${i + 1}`}
                                    className="pdp-thumbnail"
                                    style={{
                                        border: activeImage === img ? '2px solid #92400e' : '2px solid #e5e7eb',
                                    }}
                                    onClick={() => setActiveImage(img)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="pdp-details-section">
                    <p className="pdp-category">{product.category?.name?.toUpperCase() || 'SPICE'}</p>
                    <h1 className="pdp-title">{product.name}</h1>

                    {product.qualityGrade && (
                        <p className="pdp-quality">Grade: <strong>{product.qualityGrade}</strong></p>
                    )}
                    {product.originLocation && (
                        <p className="pdp-origin">📍 Origin: {product.originLocation}</p>
                    )}

                    {/* Pricing */}
                    <div className="pdp-pricing-box">
                        <div className="pdp-price-row">
                            <span className="pdp-price-label">Retail Price</span>
                            <span className="pdp-price-value">₹{product.basePrice} / gram</span>
                        </div>
                        {product.wholesalePrice && (
                            <div className="pdp-price-row">
                                <span className="pdp-price-label">Wholesale Price</span>
                                <span className="pdp-price-value" style={{ color: '#15803d' }}>₹{product.wholesalePrice} / kg</span>
                            </div>
                        )}
                        <div className="pdp-stock-row">
                            <span style={{ color: isInStock ? '#15803d' : '#dc2626', fontWeight: 600 }}>
                                {isInStock ? `✓ In Stock (${product.stock} units)` : '✗ Out of Stock'}
                            </span>
                        </div>
                    </div>

                    {product.description && (
                        <div className="pdp-desc-box">
                            <p className="pdp-desc">{product.description}</p>
                        </div>
                    )}

                    {product.hsnCode && (
                        <p className="pdp-hsn">HSN Code: {product.hsnCode}</p>
                    )}

                    {/* Actions */}
                    <div className="pdp-actions">
                        <button
                            className="pdp-add-btn"
                            style={{ opacity: (!isInStock || cartLoading) ? 0.6 : 1 }}
                            onClick={handleAddToCart}
                            disabled={!isInStock || cartLoading}
                        >
                            {cartLoading ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <button
                            className="pdp-buy-btn"
                            style={{ opacity: (!isInStock || cartLoading) ? 0.6 : 1 }}
                            onClick={handleBuyNow}
                            disabled={!isInStock || cartLoading}
                        >
                            Buy Now
                        </button>
                    </div>

                    {/* Wholesale note */}
                    {product.wholesalePrice && (
                        <div className="pdp-wholesale">
                            <p>🌾 <strong>Bulk/Wholesale orders available.</strong> Contact us for special rates on orders above 10 kg.</p>
                            <a href="tel:9677951187" className="pdp-call-btn">📞 Call for Wholesale Pricing</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};
// Styles removed as they are now injected via <style>
export default ProductDetailPage;