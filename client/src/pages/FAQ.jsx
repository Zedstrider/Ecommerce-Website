// client/src/pages/FAQ.jsx
import React from 'react';

const FAQ = () => {
  return (
    <div className="container py-5" style={{ maxWidth: '800px', minHeight: '70vh' }}>
      <h1 className="fw-bold text-center mb-5">Frequently Asked Questions</h1>
      
      <div className="accordion accordion-flush shadow-sm rounded-3 overflow-hidden" id="faqAccordion">
        
        {/* Question 1 */}
        <div className="accordion-item border-0 border-bottom">
          <h2 className="accordion-header">
            <button className="accordion-button bg-white fw-bold py-4" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
              What is your shipping policy?
            </button>
          </h2>
          <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
            <div className="accordion-body text-muted pb-4">
              We offer free standard shipping on all orders over $50. Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout.
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="accordion-item border-0 border-bottom">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-white fw-bold py-4" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
              Do you accept returns?
            </button>
          </h2>
          <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body text-muted pb-4">
              Yes, we offer a 30-day hassle-free return policy. If you are not completely satisfied with your gear, return it in its original condition for a full refund.
            </div>
          </div>
        </div>

        {/* Question 3 */}
        <div className="accordion-item border-0">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed bg-white fw-bold py-4" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
              Does your gear come with a warranty?
            </button>
          </h2>
          <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
            <div className="accordion-body text-muted pb-4">
              All TechGear products come with a standard 1-year manufacturer warranty covering defects in materials and workmanship.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;