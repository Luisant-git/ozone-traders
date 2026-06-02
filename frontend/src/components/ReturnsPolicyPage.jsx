import React, { useEffect } from 'react';

const ReturnsPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="policy-page">
            <div className="container">
                <h1>Return & Shipping Policy</h1>
                <div className="policy-content">
                    <p>Everything you need to know about shipping, returns, and refunds</p>
                    <p>Home / Return & Shipping Policy<br />Last Updated: April 2026</p>
                    
                    <section>
                        <h2>1. Shipping Policy</h2>
                        <h3>1.1 Shipping Coverage</h3>
                        <p>OZONE TRADERS ships products across all states and union territories of India. We currently do not offer international shipping. All orders are dispatched from our warehouse located at 122/B, Pudupettai Bazaar Street, Pudupettai, Attur, Salem - 636141, Tamilnadu, India.</p>

                        <h3>1.2 Shipping Carriers</h3>
                        <p>We partner with trusted logistics providers to ensure safe and timely delivery:</p>
                        <ul>
                            <li>India Post (Speed Post & Registered Parcel)</li>
                            <li>DTDC Express</li>
                            <li>Delhivery</li>
                            <li>Local courier services for regional deliveries</li>
                        </ul>

                        <h3>1.3 Shipping Charges</h3>
                        <div className="table-responsive">
                            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '10px'}}>
                                <thead>
                                    <tr>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Order Value</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Shipping Charge</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Delivery Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Below ₹500</td><td style={{border: '1px solid #ddd', padding: '8px'}}>₹60</td><td style={{border: '1px solid #ddd', padding: '8px'}}>5–8 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>₹500 – ₹1,999</td><td style={{border: '1px solid #ddd', padding: '8px'}}>₹40</td><td style={{border: '1px solid #ddd', padding: '8px'}}>4–7 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>₹2,000 and above</td><td style={{border: '1px solid #ddd', padding: '8px'}}>FREE</td><td style={{border: '1px solid #ddd', padding: '8px'}}>3–6 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Bulk / Wholesale Orders</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Contact us for rates</td><td style={{border: '1px solid #ddd', padding: '8px'}}>5–10 business days</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p>🎉 Enjoy FREE shipping on all orders above ₹2,000!</p>

                        <h3>1.4 Order Processing Time</h3>
                        <ul>
                            <li>Orders placed before 2:00 PM IST (Monday–Saturday) are processed the same day</li>
                            <li>Orders placed after 2:00 PM or on Sundays/public holidays are processed the next business day</li>
                            <li>Processing includes quality check, weighing, and secure packaging</li>
                            <li>Typical processing time: 1–2 business days</li>
                        </ul>

                        <h3>1.5 Delivery Timeline</h3>
                        <div className="table-responsive">
                            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '10px'}}>
                                <thead>
                                    <tr>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Region</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Estimated Delivery</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Tamil Nadu (Local)</td><td style={{border: '1px solid #ddd', padding: '8px'}}>2–4 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>South India (Kerala, Karnataka, Andhra, Telangana)</td><td style={{border: '1px solid #ddd', padding: '8px'}}>3–5 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Rest of India (North, East, West)</td><td style={{border: '1px solid #ddd', padding: '8px'}}>5–8 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Northeast & Remote Areas</td><td style={{border: '1px solid #ddd', padding: '8px'}}>7–12 business days</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p>Delivery timelines are estimates and may vary due to weather, festivals, strikes, or other unforeseen circumstances.</p>

                        <h3>1.6 Order Tracking</h3>
                        <p>Once your order is shipped, you will receive a tracking number via SMS and email. You can use this number to track your package on the courier partner's website. If you do not receive tracking details within 48 hours of order confirmation, please contact us.</p>

                        <h3>1.7 Failed Delivery Attempts</h3>
                        <p>If a delivery attempt fails due to incorrect address, recipient unavailability, or refusal to accept, the courier will make up to 2 additional attempts. If all attempts fail, the package will be returned to our warehouse. In such cases, re-shipping charges will apply, or a refund will be issued minus shipping costs.</p>
                    </section>

                    <section>
                        <h2>2. Return Policy</h2>
                        <h3>2.1 Return Eligibility</h3>
                        <p>We accept returns under the following conditions:</p>
                        <ul>
                            <li>Product received is damaged, defective, or different from what was ordered</li>
                            <li>Return request is initiated within 7 calendar days of delivery</li>
                            <li>Product is in its original, unopened packaging (for quality and hygiene reasons)</li>
                            <li>Proof of purchase (order ID/invoice) is provided</li>
                            <li>Product has not been used, consumed, or tampered with</li>
                        </ul>
                        <p>⚠️ Due to the nature of food products, we cannot accept returns for opened, used, or partially consumed items unless the product is defective or contaminated.</p>

                        <h3>2.2 Non-Returnable Items</h3>
                        <p>The following items are not eligible for return:</p>
                        <ul>
                            <li>Products past the return window (7 days from delivery)</li>
                            <li>Opened or partially used spice packages</li>
                            <li>Custom or bulk orders specifically prepared for the customer</li>
                            <li>Products damaged due to improper storage after delivery</li>
                            <li>Items purchased during clearance or special promotional sales (unless defective)</li>
                        </ul>

                        <h3>2.3 How to Initiate a Return</h3>
                        <ul>
                            <li>Contact us within 7 days of delivery via email or phone with your Order ID and a description of the issue</li>
                            <li>Attach clear photographs of the damaged/defective product and packaging</li>
                            <li>Our team will review your request and respond within 24–48 hours</li>
                            <li>If approved, we will provide a Return Authorization Number (RAN) and pickup instructions</li>
                            <li>Courier will be arranged for product pickup from your address (return shipping is covered by us for defective items)</li>
                            <li>Once we receive and inspect the returned product, your refund or replacement will be processed</li>
                        </ul>

                        <h3>2.4 Refund Policy</h3>
                        <ul>
                            <li>Refunds are processed within 7–10 business days after we receive and inspect the returned product</li>
                            <li>Refunds will be issued to the original payment method used during purchase</li>
                            <li>For prepaid orders, the full product amount will be refunded</li>
                            <li>For Cash on Delivery (COD) orders, bank details will be required for refund processing</li>
                            <li>Shipping charges are non-refundable unless the return is due to our error (wrong/damaged product)</li>
                        </ul>
                        <div className="table-responsive">
                            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '10px'}}>
                                <thead>
                                    <tr>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Refund Scenario</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Refund Amount</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Processing Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Defective / Wrong Product</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Full amount (incl. shipping)</td><td style={{border: '1px solid #ddd', padding: '8px'}}>7–10 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Customer Changed Mind (unopened)</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Product amount only</td><td style={{border: '1px solid #ddd', padding: '8px'}}>7–10 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Cancelled Before Shipment</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Full amount</td><td style={{border: '1px solid #ddd', padding: '8px'}}>3–5 business days</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Partial Damage</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Proportional refund</td><td style={{border: '1px solid #ddd', padding: '8px'}}>7–10 business days</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>2.5 Exchange Policy</h3>
                        <p>If you received a wrong or damaged product, we offer a free exchange instead of a refund. The replacement will be shipped within 3–5 business days after we receive the original product. Exchanges are subject to product availability.</p>
                    </section>

                    <section>
                        <h2>3. Product Quality & Shelf Life</h2>
                        <p>At Ozone Traders, we are committed to delivering the freshest and highest quality agricultural products. Below is information about our core products:</p>
                        <div className="table-responsive">
                            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '10px'}}>
                                <thead>
                                    <tr>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Product</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Shelf Life</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Storage Recommendation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Cardamom</td><td style={{border: '1px solid #ddd', padding: '8px'}}>12–18 months</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Airtight container, cool & dry place</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Black Pepper</td><td style={{border: '1px solid #ddd', padding: '8px'}}>12–24 months</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Airtight container, away from sunlight</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Maize</td><td style={{border: '1px solid #ddd', padding: '8px'}}>6–12 months</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Dry, well-ventilated storage</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Coffee Beans</td><td style={{border: '1px solid #ddd', padding: '8px'}}>6–12 months</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Airtight container, cool & dark place</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Tea Leaves</td><td style={{border: '1px solid #ddd', padding: '8px'}}>12–18 months</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Airtight container, away from moisture</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Red Chilli</td><td style={{border: '1px solid #ddd', padding: '8px'}}>12–18 months</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Airtight container, cool & dry place</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2>4. Missing or Lost Packages</h2>
                        <p>If your tracking shows "Delivered" but you haven't received your package:</p>
                        <ul>
                            <li>Check with family members, neighbors, or building security</li>
                            <li>Wait 48 hours as sometimes packages are marked delivered in advance</li>
                            <li>If still not received, contact us immediately with your Order ID</li>
                            <li>We will initiate a trace with the courier partner and resolve within 5–7 business days</li>
                            <li>If the package is confirmed lost, we will ship a replacement or issue a full refund</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Order Cancellation</h2>
                        <ul>
                            <li>Orders can be cancelled before they are shipped by contacting us via email or phone</li>
                            <li>Cancellation requests are processed within 24 hours</li>
                            <li>Full refund is issued for cancelled orders within 3–5 business days</li>
                            <li>Orders already shipped cannot be cancelled but can be returned after delivery (subject to return policy)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Contact Us</h2>
                        <p>For any questions, concerns, or requests related to shipping, returns, or refunds, please reach out to us:</p>
                        <p>📦 <strong>Shipping & Returns Support</strong></p>
                        <p><strong>Company:</strong> OZONE TRADERS</p>
                        <p><strong>Address:</strong> 122/B, Pudupettai Bazaar Street, Pudupettai, Attur, Salem - 636141, Tamilnadu, India</p>
                        <p><strong>Email:</strong> Ozonetraders03032026@gmail.com</p>
                        <p><strong>Phone:</strong> 9677951187</p>
                        <p><strong>Support Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM IST</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPolicyPage;