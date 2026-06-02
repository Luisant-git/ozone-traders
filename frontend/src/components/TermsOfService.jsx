import React, { useEffect } from 'react';

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="policy-page">
            <div className="container">
                <h1>Terms & Conditions</h1>
                <div className="policy-content">
                    <p>Please read these terms carefully before using our services</p>
                    <p>Home / Terms & Conditions<br />Last Updated: April 2026</p>
                    
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>Welcome to OZONE TRADERS. By accessing, browsing, or using our website and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions ("Terms"). If you do not agree with any part of these Terms, please do not use our website or services.</p>
                        <p>These Terms constitute a legally binding agreement between you (the "User", "Customer", or "Buyer") and OZONE TRADERS, located at 122/B, Pudupettai Bazaar Street, Pudupettai, Attur, Salem - 636141, Tamilnadu, India (referred to as "we", "us", or "our").</p>
                    </section>

                    <section>
                        <h2>2. About Our Business</h2>
                        <p>Ozone Traders is a spice and agricultural product trading business specializing in premium quality products sourced directly from farmers and trusted suppliers across India.</p>
                        <div className="table-responsive">
                            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '10px'}}>
                                <tbody>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px', fontWeight: 'bold'}}>Company Name</td><td style={{border: '1px solid #ddd', padding: '8px'}}>OZONE TRADERS</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px', fontWeight: 'bold'}}>Registered Address</td><td style={{border: '1px solid #ddd', padding: '8px'}}>122/B, Pudupettai Bazaar Street, Pudupettai, Attur, Salem - 636141, Tamilnadu, India</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px', fontWeight: 'bold'}}>Products</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Cardamom, Black Pepper, Maize, Coffee Beans, Tea Leaves, Red Chilli</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px', fontWeight: 'bold'}}>Business Type</td><td style={{border: '1px solid #ddd', padding: '8px'}}>Wholesale & Retail Spice Trading</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2>3. Eligibility</h2>
                        <p>To use our website and purchase products, you must:</p>
                        <ul>
                            <li>Be at least 18 years of age or have parental/guardian consent</li>
                            <li>Have the legal capacity to enter into a binding contract under the Indian Contract Act, 1872</li>
                            <li>Provide accurate, current, and complete information during registration and checkout</li>
                            <li>Use our services only for lawful purposes</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Products & Pricing</h2>
                        <h3>4.1 Product Descriptions</h3>
                        <p>We strive to display our products as accurately as possible, including images, descriptions, weights, and prices. However, we do not guarantee that product images or descriptions are 100% accurate, complete, or error-free. Slight variations in color, size, or appearance may occur as our products are natural agricultural goods.</p>

                        <h3>4.2 Pricing</h3>
                        <ul>
                            <li>All prices are listed in Indian Rupees (₹) and are inclusive of applicable GST unless stated otherwise</li>
                            <li>Prices are subject to change without prior notice due to market fluctuations, seasonal availability, and supply chain factors</li>
                            <li>The price displayed at checkout is the final price you will be charged</li>
                            <li>We reserve the right to correct pricing errors even after an order is placed</li>
                            <li>Bulk and wholesale pricing is available upon request — contact us for custom quotes</li>
                        </ul>

                        <h3>4.3 Product Availability</h3>
                        <p>All products are subject to availability. We reserve the right to discontinue any product at any time. If an ordered product becomes unavailable after purchase, we will notify you promptly and offer a full refund or suitable alternative.</p>
                    </section>

                    <section>
                        <h2>5. Orders & Payment</h2>
                        <h3>5.1 Order Placement</h3>
                        <p>Placing an order on our website constitutes an offer to purchase. We reserve the right to accept or decline any order at our sole discretion. An order is confirmed only when you receive an order confirmation email or SMS.</p>

                        <h3>5.2 Payment Methods</h3>
                        <p>We accept the following payment methods:</p>
                        <ul>
                            <li>UPI (Google Pay, PhonePe, Paytm, BHIM, etc.)</li>
                            <li>Credit / Debit Cards (Visa, Mastercard, RuPay)</li>
                            <li>Net Banking</li>
                            <li>Bank Transfer / NEFT / IMPS</li>
                            <li>Cash on Delivery (COD) — available for select locations and order values</li>
                            <li>Wallet payments (Paytm, Amazon Pay, etc.)</li>
                        </ul>

                        <h3>5.3 Payment Security</h3>
                        <p>All payment transactions are processed through secure, PCI-DSS compliant third-party payment gateways. We do not store your credit/debit card details on our servers. By making a payment, you authorize us to charge the applicable amount.</p>

                        <h3>5.4 Order Cancellation by Us</h3>
                        <p>We reserve the right to cancel any order in the following situations:</p>
                        <ul>
                            <li>Product is out of stock or unavailable</li>
                            <li>Pricing error is detected</li>
                            <li>Suspected fraudulent activity or unauthorized payment</li>
                            <li>Delivery address is in a non-serviceable area</li>
                            <li>Violation of these Terms & Conditions</li>
                        </ul>
                        <p>In such cases, a full refund will be issued within 3–5 business days.</p>
                    </section>

                    <section>
                        <h2>6. Shipping & Delivery</h2>
                        <p>Shipping and delivery are governed by our separate Return & Shipping Policy. Key points include:</p>
                        <ul>
                            <li>We ship across all states and union territories of India</li>
                            <li>Estimated delivery times vary by region (2–12 business days)</li>
                            <li>Free shipping on orders above ₹2,000</li>
                            <li>Risk of loss transfers to the buyer upon delivery to the shipping address</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Returns, Refunds & Exchanges</h2>
                        <p>Returns, refunds, and exchanges are governed by our separate Return & Shipping Policy. Key points include:</p>
                        <ul>
                            <li>Returns accepted within 7 calendar days of delivery for damaged/defective/wrong products</li>
                            <li>Products must be unopened and in original packaging</li>
                            <li>Refunds processed within 7–10 business days</li>
                            <li>Free exchanges for wrong or damaged products</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Intellectual Property</h2>
                        <p>All content on this website, including but not limited to text, images, logos, graphics, product photographs, icons, and design elements, is the exclusive property of OZONE TRADERS and is protected under the Indian Copyright Act, 1957 and other applicable intellectual property laws.</p>
                        <p>You may not:</p>
                        <ul>
                            <li>Reproduce, distribute, or modify any content without prior written consent</li>
                            <li>Use our trademarks, logos, or brand elements for commercial purposes</li>
                            <li>Scrape, crawl, or extract data from our website using automated tools</li>
                            <li>Create derivative works based on our content</li>
                        </ul>
                    </section>

                    <section>
                        <h2>9. User Obligations & Prohibited Activities</h2>
                        <p>When using our website and services, you agree NOT to:</p>
                        <ul>
                            <li>Provide false, inaccurate, or misleading information</li>
                            <li>Use the website for any illegal or unauthorized purpose</li>
                            <li>Attempt to gain unauthorized access to our systems or data</li>
                            <li>Upload viruses, malware, or harmful code</li>
                            <li>Interfere with the proper functioning of the website</li>
                            <li>Resell our products without authorization</li>
                            <li>Harass, threaten, or abuse our staff or other users</li>
                            <li>Post defamatory, obscene, or offensive content</li>
                        </ul>
                        <p>Violation of these obligations may result in account suspension, order cancellation, and legal action.</p>
                    </section>

                    <section>
                        <h2>10. Product Disclaimer</h2>
                        <p>⚠️ Our products are natural agricultural goods. Slight variations in color, size, aroma, and texture are normal and do not indicate a defect. We do not make medical or health claims about our products.</p>
                        <ul>
                            <li>Product images are for illustrative purposes and may differ slightly from the actual product</li>
                            <li>We do not guarantee that our products are free from allergens. Please check product details before purchasing</li>
                            <li>Storage conditions after delivery are the responsibility of the buyer</li>
                            <li>We recommend consuming products within their stated shelf life for optimal quality</li>
                            <li>For bulk/wholesale orders, sample approval may be required before dispatch</li>
                        </ul>
                    </section>

                    <section>
                        <h2>11. Limitation of Liability</h2>
                        <p>To the maximum extent permitted by applicable Indian law:</p>
                        <ul>
                            <li>Ozone Traders shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of our website or products</li>
                            <li>Our total liability for any claim shall not exceed the amount paid by you for the specific product giving rise to the claim</li>
                            <li>We are not liable for delays or failures in performance caused by events beyond our reasonable control, including but not limited to natural disasters, pandemics, government actions, strikes, or courier disruptions</li>
                            <li>We do not guarantee uninterrupted, error-free, or secure operation of our website</li>
                        </ul>
                    </section>

                    <section>
                        <h2>12. Indemnification</h2>
                        <p>You agree to indemnify, defend, and hold harmless Ozone Traders, its owners, employees, agents, and affiliates from any claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to:</p>
                        <ul>
                            <li>Your use of our website or services</li>
                            <li>Your violation of these Terms & Conditions</li>
                            <li>Your violation of any third-party rights</li>
                            <li>Any information you provide that is false or misleading</li>
                        </ul>
                    </section>

                    <section>
                        <h2>13. Governing Law & Dispute Resolution</h2>
                        <p>These Terms shall be governed by and construed in accordance with the laws of India, including but not limited to:</p>
                        <ul>
                            <li>The Indian Contract Act, 1872</li>
                            <li>The Consumer Protection Act, 2019</li>
                            <li>The Information Technology Act, 2000</li>
                            <li>The Sale of Goods Act, 1930</li>
                            <li>The Goods and Services Tax (GST) laws</li>
                        </ul>

                        <h3>13.1 Jurisdiction</h3>
                        <p>Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Salem, Tamil Nadu, India.</p>

                        <h3>13.2 Dispute Resolution</h3>
                        <p>In the event of any dispute, both parties agree to first attempt to resolve the matter through amicable negotiation. If the dispute is not resolved within 30 days, it shall be referred to arbitration under the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in Salem, Tamil Nadu in the English language.</p>
                    </section>

                    <section>
                        <h2>14. Privacy</h2>
                        <p>Your privacy is important to us. Our collection and use of personal information is governed by our separate Privacy Policy, which is incorporated into these Terms by reference. By using our website, you consent to the practices described in our Privacy Policy.</p>
                    </section>

                    <section>
                        <h2>15. Modifications to Terms</h2>
                        <p>We reserve the right to modify, update, or replace these Terms at any time at our sole discretion. Changes will be effective immediately upon posting on this page. Your continued use of the website after changes constitutes your acceptance of the updated Terms. We encourage you to review this page periodically.</p>
                    </section>

                    <section>
                        <h2>16. Severability</h2>
                        <p>If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced with a valid provision that most closely reflects the original intent.</p>
                    </section>

                    <section>
                        <h2>17. Entire Agreement</h2>
                        <p>These Terms & Conditions, along with our Privacy Policy and Return & Shipping Policy, constitute the entire agreement between you and Ozone Traders regarding the use of our website and services, and supersede all prior agreements, understandings, and communications.</p>
                    </section>

                    <section>
                        <h2>18. Force Majeure</h2>
                        <p>Ozone Traders shall not be held liable for any failure or delay in performing its obligations under these Terms if such failure or delay is caused by circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, pandemics, war, terrorism, government restrictions, labor disputes, power outages, or internet service disruptions.</p>
                    </section>

                    <section>
                        <h2>19. Contact Information</h2>
                        <p>If you have any questions, concerns, or feedback regarding these Terms & Conditions, please contact us:</p>
                        <p>📋 <strong>Legal & General Inquiries</strong></p>
                        <p><strong>Company:</strong> OZONE TRADERS</p>
                        <p><strong>Address:</strong> 122/B, Pudupettai Bazaar Street, Pudupettai, Attur, Salem - 636141, Tamilnadu, India</p>
                        <p><strong>Email:</strong> Ozonetraders03032026@gmail.com</p>
                        <p><strong>Phone:</strong> 9677951187</p>
                        <p><strong>Business Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM IST</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;