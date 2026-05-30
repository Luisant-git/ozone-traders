import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div className="footer-grid">

                    {/* Brand Column */}
                    <div style={styles.column}>
                        <h3 style={styles.brandName} onClick={() => navigate('/')}>Ozone Traders</h3>
                        <p style={styles.brandDesc}>
                            Your premium source for high-quality agricultural products and authentic Indian spices. Bringing farm-fresh purity to your doorstep.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div style={styles.column}>
                        <h4 style={styles.columnHeading}>Quick Links</h4>
                        <ul style={styles.linkList}>
                            <li><a href="#home" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/#home'); }}>Home</a></li>
                            <li><a href="#about" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/#about'); }}>About Us</a></li>
                            <li><a href="#categories" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/#categories'); }}>Categories</a></li>
                            <li><a href="#products" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/#products'); }}>Our Products</a></li>
                            <li><a href="#contact" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/#contact'); }}>Contact</a></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div style={styles.column}>
                        <h4 style={styles.columnHeading}>Information</h4>
                        <ul style={styles.linkList}>
                            <li><a href="#" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/privacy-policy'); }}>Privacy Policy</a></li>
                            <li><a href="#" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/return-policy'); }}>Return &amp; Shipping Policy</a></li>
                            <li><a href="#" style={styles.link} onClick={(e) => { e.preventDefault(); navigate('/terms-of-service'); }}>Terms &amp; Conditions</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div style={styles.column}>
                        <h4 style={styles.columnHeading}>Contact Us</h4>
                        <ul style={styles.contactList}>
                            <li style={styles.contactItem}>
                                <span style={styles.contactIcon}>✉</span>
                                <a href="mailto:Ozonetraders030302026@gmail.com" style={styles.link}>
                                    Ozonetraders030302026@gmail.com
                                </a>
                            </li>
                            <li style={styles.contactItem}>
                                <span style={styles.contactIcon}>📞</span>
                                <a href="tel:9677951187" style={styles.link}>9677951187</a>
                            </li>
                            <li style={styles.contactItem}>
                                <span style={styles.contactIcon}>📍</span>
                                <span style={styles.linkText}>Pudupettai, Attur, Salem, India</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={styles.bottomBar}>
                <p style={styles.copyright}>© 2026 Ozone Traders. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#2d2417',
        color: '#d1c4a8',
        fontFamily: "'Poppins', sans-serif",
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem 2rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2.5rem',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    brandName: {
        fontFamily: "'Playfair Display', serif",
        color: '#f59e0b',
        fontSize: '1.4rem',
        fontWeight: '700',
        margin: '0 0 0.5rem 0',
        cursor: 'pointer',
    },
    brandDesc: {
        fontSize: '0.88rem',
        lineHeight: '1.7',
        color: '#b8a88a',
        margin: 0,
    },
    columnHeading: {
        fontFamily: "'Playfair Display', serif",
        color: '#f59e0b',
        fontSize: '1.15rem',
        fontWeight: '600',
        margin: '0 0 0.75rem 0',
    },
    linkList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
    },
    link: {
        color: '#b8a88a',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.2s ease',
        cursor: 'pointer',
    },
    linkText: {
        color: '#b8a88a',
        fontSize: '0.9rem',
    },
    contactList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.6rem',
    },
    contactIcon: {
        fontSize: '0.85rem',
        marginTop: '2px',
        flexShrink: 0,
    },
    bottomBar: {
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1.25rem 2rem',
        textAlign: 'center',
    },
    copyright: {
        color: '#8a7a60',
        fontSize: '0.85rem',
        margin: 0,
    },
};

export default Footer;