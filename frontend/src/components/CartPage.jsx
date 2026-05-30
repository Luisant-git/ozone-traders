import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { getBundlePrice } from '../data/mockData';
import API_BASE_URL from '../config/api';

// Separate component so each item has its own local quantity state
const QuantityInput = ({ quantity, onUpdate }) => {
    const [localVal, setLocalVal] = useState(String(quantity));

    // Sync if parent quantity changes externally (e.g. +/- button)
    React.useEffect(() => {
        setLocalVal(String(quantity));
    }, [quantity]);

    const commit = () => {
        const parsed = parseInt(localVal);
        if (!isNaN(parsed) && parsed >= 1) {
            onUpdate(parsed);
        } else {
            setLocalVal(String(quantity)); // revert if invalid
        }
    };

    return (
        <div className="quantity-control">
            <button onClick={() => onUpdate(Math.max(1, quantity - 1))}>-</button>
            <input
                type="number"
                value={localVal}
                min={1}
                onChange={(e) => setLocalVal(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => { if (e.key === 'Enter') commit(); }}
                style={{
                    width: '48px',
                    textAlign: 'center',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    padding: '4px 0',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                }}
            />
            <button onClick={() => onUpdate(quantity + 1)}>+</button>
        </div>
    );
};

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    // const [deliveryOption, setDeliveryOption] = useState({ fee: 50, name: 'Standard Delivery' });

    if (!Array.isArray(cart) || cart.length === 0) {
        return <div className="cart-page empty-cart"><h2>Your Cart is Empty</h2><button onClick={() => navigate('/')}>Continue Shopping</button></div>;
    }

    const bundleItems = cart.filter(item => item.type === 'bundle');
    const regularItems = cart.filter(item => item.type !== 'bundle');

    const bundleTotal = bundleItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    const regularTotal = regularItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0);
    
    const subtotal = bundleTotal + regularTotal;
    const totalSavings = bundleItems.reduce((sum, item) => {
        if (item.bundleItems) {
            const originalTotal = item.bundleItems.reduce((bundleSum, bundleItem) => 
                bundleSum + parseInt(bundleItem.originalPrice || 0), 0);
            return sum + (originalTotal - parseInt(item.price));
        }
        return sum;
    }, 0);
    // const deliveryOptions = [
    //     { fee: 50, name: 'Standard Delivery', duration: '3-5 days' },
    //     { fee: 150, name: 'Express Delivery', duration: '1-2 days' },
    //     { fee: 250, name: 'Next Day Delivery', duration: 'Tomorrow' },
    // ];
    const finalTotal = subtotal;
    
    if (false) {
        return <div className="cart-page empty-cart"><h2>Your Cart is Empty</h2><button onClick={() => navigate('/')}>Continue Shopping</button></div>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <div className="cart-content">
                <div className="cart-items">
                    {Array.isArray(cart) && cart.map(item => (
                        <div key={item.id} className="cart-item">
                            {item.type === 'bundle' ? (
                                <div className="bundle-images">
                                    {item.bundleItems?.map((bundleItem, idx) => {
                                        let imgUrl = bundleItem.colorImage || item.imageUrl || '/placeholder.svg';
                                        if (imgUrl.includes('localhost:4062')) imgUrl = imgUrl.replace('http://localhost:4062', API_BASE_URL);
                                        return (
                                            <img 
                                                key={idx}
                                                src={imgUrl} 
                                                alt={`${bundleItem.color}`}
                                            />
                                        )
                                    })}
                                </div>
                            ) : (
                                <img src={
                                    (item.imageUrl || '/placeholder.svg').includes('localhost:4062') 
                                        ? item.imageUrl.replace('http://localhost:4062', API_BASE_URL) 
                                        : (item.imageUrl || '/placeholder.svg')
                                } alt={item.name} />
                            )}
                            
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                {item.type === 'bundle' && (
                                    <span className="bundle-tag">Bundle</span>
                                )}
                                

                                
                                <p className="product-price">₹{item.price}</p>
                                {item.type === 'bundle' && item.bundleItems && (
                                    <span className="simple-savings">Save ₹{item.bundleItems.reduce((sum, i) => sum + parseInt(i.originalPrice), 0) - parseInt(item.price)}</span>
                                )}
                                
                                {item.type !== 'bundle' && (
                                    <QuantityInput
                                        quantity={item.quantity}
                                        onUpdate={(val) => updateQuantity(item.id, val)}
                                    />
                                )}
                            </div>
                            
                            <button className="remove-item" onClick={() => removeFromCart(item.id)}></button>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {totalSavings > 0 && (
                        <div className="summary-row savings">
                            <span>Bundle Savings</span>
                            <span>- ₹{totalSavings.toFixed(2)}</span>
                        </div>
                    )}
                    {/* <div className="delivery-options">
                        <h3>Delivery Options</h3>
                        {deliveryOptions.map(opt => (
                            <div key={opt.name} className={`delivery-option-card ${deliveryOption.name === opt.name ? 'selected' : ''}`} onClick={() => setDeliveryOption(opt)}>
                                <div>
                                    <strong>{opt.name}</strong> ({opt.duration})
                                </div>
                                <span>₹{opt.fee}</span>
                            </div>
                        ))}
                    </div>
                     <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryOption.fee.toFixed(2)}</span>
                    </div> */}
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;