// client/src/pages/PolicyPage.jsx
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

// Dictionary holding all our policy content
const policyContent = {
  shipping: {
    title: "Shipping Policy",
    updated: "March 15, 2026",
    content: (
      <>
        <h5>Order Processing</h5>
        <p>All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
        
        <h5>Domestic Shipping Rates and Estimates</h5>
        <p>We offer simple flat-rate shipping:</p>
        <ul>
          <li><strong>Standard Shipping (3-5 business days):</strong> $10.00</li>
          <li><strong>Expedited Shipping (1-2 business days):</strong> $25.00</li>
          <li><strong>Orders over $50:</strong> FREE Standard Shipping</li>
        </ul>
        
        <h5>International Shipping</h5>
        <p>We currently offer international shipping to select countries. Shipping charges for your order will be calculated and displayed at checkout.</p>
      </>
    )
  },
  returns: {
    title: "Return & Refund Policy",
    updated: "March 15, 2026",
    content: (
      <>
        <h5>30-Day Return Window</h5>
        <p>We accept returns up to 30 days after delivery, if the item is unused and in its original condition, and we will refund the full order amount minus the shipping costs for the return.</p>
        
        <h5>Damaged Items</h5>
        <p>In the event that your order arrives damaged in any way, please email us as soon as possible with your order number and a photo of the item's condition. We address these on a case-by-case basis but will try our best to work towards a satisfactory solution.</p>
      </>
    )
  },
  privacy: {
    title: "Privacy Policy",
    updated: "March 15, 2026",
    content: (
      <>
        <h5>Information We Collect</h5>
        <p>We collect information from you when you register on our site, place an order, subscribe to our newsletter, or fill out a form. This includes your name, email address, mailing address, phone number, and credit card information (which is encrypted and securely processed).</p>
        
        <h5>How We Use Your Information</h5>
        <p>Any of the information we collect from you may be used to personalize your experience, improve our website, improve customer service, or process transactions.</p>
        
        <h5>Data Protection</h5>
        <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
      </>
    )
  },
  terms: {
    title: "Terms of Service",
    updated: "March 15, 2026",
    content: (
      <>
        <h5>Overview</h5>
        <p>This website is operated by TechGear. Throughout the site, the terms "we", "us" and "our" refer to TechGear. By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions.</p>
        
        <h5>Accuracy of Information</h5>
        <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions.</p>
        
        <h5>Modifications to the Service and Prices</h5>
        <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
      </>
    )
  }
};

const PolicyPage = () => {
  const { policyType } = useParams(); // Grabs 'shipping', 'returns', etc. from the URL
  
  const currentPolicy = policyContent[policyType];

  // If a user types a random policy URL that doesn't exist, redirect to home
  if (!currentPolicy) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container py-5" style={{ maxWidth: '800px', minHeight: '70vh' }}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{currentPolicy.title}</li>
        </ol>
      </nav>

      <div className="card border-0 shadow-sm p-4 p-md-5">
        <h1 className="fw-bold mb-2">{currentPolicy.title}</h1>
        <p className="text-muted mb-5">Last Updated: {currentPolicy.updated}</p>
        
        <div className="policy-content" style={{ lineHeight: '1.8' }}>
          {currentPolicy.content}
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;