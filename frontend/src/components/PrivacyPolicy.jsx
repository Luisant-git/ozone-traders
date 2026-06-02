import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="policy-page">
            <div className="container">
                <h1>Privacy Policy</h1>
                <div className="policy-content">
                    <p>How we collect, use, and protect your personal information</p>
                    <p>Home / Privacy Policy<br />Last Updated: April 2026</p>
                    
                    <section>
                        <h2>1. Introduction</h2>
                        <p>OZONE TRADERS ("we", "us", or "our"), located at 122/B, Pudupettai Bazaar Street, Pudupettai, Attur, Salem - 636141, Tamilnadu, India, is committed to protecting the privacy and security of your personal information.</p>
                        <p>This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, purchase our products, or interact with us in any way. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
                        <p>Our core products include: Cardamom, Black Pepper, Maize, Coffee Beans, Tea Leaves, and Red Chilli.</p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <h3>2.1 Personal Information</h3>
                        <p>We may collect personally identifiable information that you voluntarily provide to us, including but not limited to:</p>
                        <ul>
                            <li>Full name and company name (if applicable)</li>
                            <li>Shipping and billing address</li>
                            <li>Email address and phone number</li>
                            <li>Payment information (processed securely through third-party payment gateways)</li>
                            <li>Business details for wholesale/B2B orders</li>
                            <li>Any other information you choose to provide via contact forms, emails, or phone calls</li>
                        </ul>
                        
                        <h3>2.2 Automatically Collected Information</h3>
                        <p>When you visit our website, we may automatically collect:</p>
                        <ul>
                            <li>IP address and browser type/version</li>
                            <li>Device type and operating system</li>
                            <li>Pages visited, time spent, and navigation patterns</li>
                            <li>Referring website or source</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We use the collected information for the following purposes:</p>
                        <div className="table-responsive">
                            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '20px'}}>
                                <thead>
                                    <tr>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Purpose</th>
                                        <th style={{border: '1px solid #ddd', padding: '8px', textAlign: 'left'}}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Order Processing</td><td style={{border: '1px solid #ddd', padding: '8px'}}>To process, fulfill, and deliver your spice and agricultural product orders</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Communication</td><td style={{border: '1px solid #ddd', padding: '8px'}}>To send order confirmations, shipping updates, and respond to inquiries</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Customer Support</td><td style={{border: '1px solid #ddd', padding: '8px'}}>To provide assistance, handle returns, and resolve complaints</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Marketing</td><td style={{border: '1px solid #ddd', padding: '8px'}}>To send promotional offers, new product announcements (with your consent)</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Website Improvement</td><td style={{border: '1px solid #ddd', padding: '8px'}}>To analyze usage patterns and enhance user experience</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Legal Compliance</td><td style={{border: '1px solid #ddd', padding: '8px'}}>To comply with Indian laws, tax regulations, and business requirements</td></tr>
                                    <tr><td style={{border: '1px solid #ddd', padding: '8px'}}>Fraud Prevention</td><td style={{border: '1px solid #ddd', padding: '8px'}}>To detect and prevent fraudulent transactions and unauthorized access</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2>4. How We Share Your Information</h2>
                        <p>We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following circumstances:</p>
                        <ul>
                            <li><strong>Shipping Partners:</strong> We share your name, address, and phone number with courier/logistics partners (e.g., India Post, DTDC, Delhivery) solely for order delivery.</li>
                            <li><strong>Payment Processors:</strong> Payment details are handled by secure third-party payment gateways. We do not store your credit/debit card information on our servers.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government authority in India.</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Cookies & Tracking Technologies</h2>
                        <p>Our website uses cookies and similar technologies to enhance your browsing experience:</p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Required for website functionality (e.g., shopping cart, session management)</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                        </ul>
                        <p>You can control or disable cookies through your browser settings. Please note that disabling cookies may affect website functionality.</p>
                    </section>

                    <section>
                        <h2>6. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your personal information, including:</p>
                        <ul>
                            <li>SSL/TLS encryption for all data transmissions</li>
                            <li>Secure server infrastructure with regular security audits</li>
                            <li>Access controls limiting employee access to personal data</li>
                            <li>Regular software updates and vulnerability assessments</li>
                            <li>Secure payment processing through PCI-DSS compliant gateways</li>
                        </ul>
                        <p>While we strive to protect your information, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but continuously work to strengthen our data protection measures.</p>
                    </section>

                    <section>
                        <h2>7. Data Retention</h2>
                        <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including:</p>
                        <ul>
                            <li><strong>Order records:</strong> Retained for a minimum of 7 years as per Indian tax and commercial law requirements</li>
                            <li><strong>Account information:</strong> Retained until you request account deletion</li>
                            <li><strong>Marketing data:</strong> Retained until you unsubscribe or withdraw consent</li>
                            <li><strong>Analytics data:</strong> Aggregated and anonymized after 2 years</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Your Rights</h2>
                        <p>Under applicable Indian data protection laws, you have the following rights:</p>
                        <ul>
                            <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
                            <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete information</li>
                            <li><strong>Right to Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
                            <li><strong>Right to Object:</strong> Object to processing of your data for marketing purposes</li>
                            <li><strong>Right to Portability:</strong> Request transfer of your data in a structured, machine-readable format</li>
                            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                        </ul>
                        <p>To exercise any of these rights, please contact us using the details provided below. We will respond within 30 days of receiving your request.</p>
                    </section>

                    <section>
                        <h2>9. Children's Privacy</h2>
                        <p>Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a minor, we will take steps to delete such information promptly.</p>
                    </section>

                    <section>
                        <h2>10. Third-Party Links</h2>
                        <p>Our website may contain links to third-party websites (e.g., social media, payment gateways). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.</p>
                    </section>

                    <section>
                        <h2>11. Changes to This Policy</h2>
                        <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make significant changes, we will notify you through our website or via email. We encourage you to review this page periodically for the latest information.</p>
                    </section>

                    <section>
                        <h2>12. Governing Law</h2>
                        <p>This Privacy Policy is governed by the laws of India, including but not limited to the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, and any applicable rules and regulations thereunder. Any disputes arising from this policy shall be subject to the exclusive jurisdiction of courts in Salem, Tamil Nadu.</p>
                    </section>

                    <section>
                        <h2>📧 Contact Us About Privacy</h2>
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact us:</p>
                        <p><strong>Company:</strong> OZONE TRADERS</p>
                        <p><strong>Address:</strong> 122/B, Pudupettai Bazaar Street, Pudupettai, Attur, Salem - 636141, Tamilnadu, India</p>
                        <p><strong>Email:</strong> Ozonetraders03032026@gmail.com</p>
                        <p><strong>Phone:</strong> 9677951187</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;