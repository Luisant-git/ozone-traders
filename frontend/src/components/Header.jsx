import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { getCategories } from '../api/categoryApi';
import { searchProducts } from '../api/productApi';
import { generateProductUrl } from '../utils/slugify';
import API_BASE_URL from '../config/api';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showCatDropdown, setShowCatDropdown] = useState(false);
    const catDropdownRef = useRef(null);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Fetch categories from backend
    useEffect(() => {
        getCategories()
            .then(data => setCategories(data || []))
            .catch(err => console.error('Failed to load categories:', err));
    }, []);

    // Close category dropdown when clicking outside
    useEffect(() => {
        const handleClick = (e) => {
            if (catDropdownRef.current && !catDropdownRef.current.contains(e.target)) {
                setShowCatDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setSearchResults([]);
        }
    };

    const handleSearchInput = async (e) => {
        const q = e.target.value;
        setSearchQuery(q);
        if (q.trim()) {
            try {
                const results = await searchProducts(q);
                setSearchResults(results.slice(0, 5));
            } catch { setSearchResults([]); }
        } else {
            setSearchResults([]);
        }
    };

    const handleNavClick = (hash) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/' + hash);
        } else {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleCategoryClick = (cat) => {
        setShowCatDropdown(false);
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/#products');
        } else {
            const element = document.getElementById('products');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <header style={styles.header}>
                {/* Logo */}
                <div style={styles.logoWrap} onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="Ozone Traders" style={styles.logo} />
                    <span style={styles.logoText}>OZONE TRADERS</span>
                </div>

                {/* Desktop Navigation */}
                <nav style={styles.nav}>
                    <a href="#home" style={styles.link} onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>HOME</a>
                    <a href="#about" style={styles.link} onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}>ABOUT</a>

                    <a href="#categories" style={styles.link} onClick={(e) => { e.preventDefault(); handleNavClick('#categories'); }}>CATEGORIES</a>

                    <a href="#products" style={styles.link} onClick={(e) => { e.preventDefault(); handleNavClick('#products'); }}>PRODUCTS</a>
                    <a href="#contact" style={styles.link} onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}>CONTACT</a>
                    {user && (
                        <a href="#" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/orders'); }}>MY ORDERS</a>
                    )}
                </nav>

                {/* Right side */}
                <div style={styles.rightSection}>
                    <form style={styles.searchForm} onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            style={styles.searchInput}
                            onChange={handleSearchInput}
                        />
                        {searchResults.length > 0 && (
                            <div style={styles.searchDropdown}>
                                {searchResults.map(p => {
                                    let imgUrl = p.image || p.gallery?.[0]?.url || '';
                                    if (imgUrl && imgUrl.includes('localhost:4062')) {
                                        imgUrl = imgUrl.replace('http://localhost:4062', API_BASE_URL);
                                    }
                                    return (
                                        <div
                                            key={p.id}
                                            style={styles.searchItem}
                                            onClick={() => {
                                                navigate(generateProductUrl(p.name, p.id));
                                                setSearchQuery('');
                                                setSearchResults([]);
                                            }}
                                        >
                                            <img
                                                src={imgUrl || '/placeholder.svg'}
                                                alt={p.name}
                                                style={styles.searchThumb}
                                                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=80&q=60'; }}
                                            />
                                            <div style={{ flex: 1, overflow: 'hidden' }}>
                                                <div style={styles.searchName}>{p.name}</div>
                                                <div style={styles.searchPrice}>
                                                    ₹{p.basePrice}<span style={{ color: '#9ca3af', fontWeight: 400 }}>/gram</span>
                                                </div>
                                                {p.category?.name && (
                                                    <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '1px' }}>{p.category.name}</div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </form>

                    <div style={styles.icons}>
                        <button style={styles.iconBtn} onClick={() => navigate(user ? '/profile' : '/login')} title={user ? 'Profile' : 'Login'}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>
                        </button>
                        <button style={styles.iconBtn} onClick={() => navigate('/cart')} title="Cart">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" /></svg>
                            {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
                        </button>
                    </div>

                    {/* Hamburger */}
                    <button style={styles.hamburger} onClick={() => setIsMobileMenuOpen(v => !v)}>
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <>
                    <div style={styles.backdrop} onClick={() => setIsMobileMenuOpen(false)} />
                    <div style={styles.mobileMenu}>
                        <button style={styles.mobileClose} onClick={() => setIsMobileMenuOpen(false)}>✕</button>
                        {[
                            { label: 'Home', hash: '#home' },
                            { label: 'About', hash: '#about' },
                            { label: 'Categories', hash: '#categories' },
                            { label: 'Products', hash: '#products' },
                            { label: 'Contact', hash: '#contact' },
                        ].map(({ label, hash }) => (
                            <a key={label} href={hash} style={styles.mobileLink}
                                onClick={(e) => { e.preventDefault(); handleNavClick(hash); }}>
                                {label}
                            </a>
                        ))}
                        <a href="#" style={{ ...styles.mobileLink, color: '#92400e', fontWeight: 600 }}
                            onClick={(e) => { e.preventDefault(); navigate(user ? '/profile' : '/login'); setIsMobileMenuOpen(false); }}>
                            {user ? 'Profile' : 'Login'}
                        </a>
                    </div>
                </>
            )}
        </>
    );
};

const styles = {
    header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4%', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '70px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', gap: '1rem' },
    logoWrap: { cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' },
    logo: { height: '48px', width: 'auto', objectFit: 'contain' },
    logoText: { fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#92400e', whiteSpace: 'nowrap' },
    nav: { display: 'flex', gap: '1.75rem', alignItems: 'center' },
    link: { color: '#374151', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.07em', fontFamily: "'Poppins',sans-serif", whiteSpace: 'nowrap' },
    navItem: { position: 'relative' },
    dropdown: { position: 'absolute', top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 200, minWidth: '180px', overflow: 'hidden', padding: '0.4rem 0' },
    dropItem: { display: 'block', padding: '0.65rem 1.2rem', fontSize: '0.88rem', color: '#374151', cursor: 'pointer', transition: 'background 0.15s', fontFamily: "'Poppins',sans-serif", background: 'transparent' },
    rightSection: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    searchForm: { position: 'relative' },
    searchInput: { padding: '0.4rem 1rem', border: '1px solid #d1d5db', borderRadius: '20px', fontSize: '0.83rem', outline: 'none', width: '185px', fontFamily: "'Poppins',sans-serif" },
    searchDropdown: { position: 'absolute', top: '110%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', zIndex: 300, overflow: 'hidden' },
    searchItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' },
    searchThumb: { width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', background: '#f9fafb' },
    searchName: { fontSize: '0.85rem', color: '#374151', fontWeight: 500 },
    searchPrice: { fontSize: '0.78rem', color: '#92400e', fontWeight: 600 },
    icons: { display: 'flex', alignItems: 'center', gap: '0.25rem' },
    iconBtn: { position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0.35rem', color: '#374151', display: 'flex', alignItems: 'center' },
    badge: { position: 'absolute', top: '-4px', right: '-6px', backgroundColor: '#92400e', color: '#fff', borderRadius: '10px', minWidth: '18px', height: '18px', padding: '0 4px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 },
    hamburger: { display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: '0.25rem' },
    backdrop: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 150 },
    mobileMenu: { position: 'fixed', top: 0, right: 0, bottom: 0, width: '270px', backgroundColor: '#fff', zIndex: 200, padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', boxShadow: '-4px 0 20px rgba(0,0,0,0.1)', overflowY: 'auto' },
    mobileClose: { alignSelf: 'flex-end', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#374151', marginBottom: '0.5rem' },
    mobileLink: { color: '#374151', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, padding: '0.45rem 0', borderBottom: '1px solid #f3f4f6', fontFamily: "'Poppins',sans-serif", display: 'block' },
};

export default Header;