import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('Full-Time Software / Data Role');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'transmitting', text: 'Transmitting message securely...' });

    const mailtoLink = `mailto:abhyudayasinha04@gmail.com?subject=Strategic Inquiry: ${inquiryType} from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AInquiry Focus: ${inquiryType}%0D%0A%0D%0AMessage:%0D%0A${message}`;

    try {
      if (window.emailjs) {
        window.emailjs.init('0radgAcsuvaKv3pPc');
        await window.emailjs.send('service_q2lh3yp', 'template_jjntvbt', {
          from_name: name,
          reply_to: email,
          message: message,
          to_name: 'Abhyudaya Sinha',
          collaboration_pack: inquiryType
        });
      } else {
        throw new Error('EmailJS client unavailable');
      }

      setStatus({ 
        type: 'success', 
        text: 'Message received! Thank you for connecting. I will respond within 24 hours.' 
      });
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus({ type: '', text: '' }), 5000);
    } catch (error) {
      console.warn('API transmission fallback to mailto:', error);
      setStatus({ 
        type: 'success', 
        text: 'Opening your default mail client to dispatch your message...' 
      });
      setTimeout(() => {
        window.location.href = mailtoLink;
        setName('');
        setEmail('');
        setMessage('');
        setStatus({ type: '', text: '' });
      }, 1200);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form-chassis">
      <div className="form-heading-row">
        <div className="form-icon-circle">
          <i className="fa-regular fa-paper-plane"></i>
        </div>
        <div>
          <h3 className="form-main-title">Send a Direct Message</h3>
          <p className="form-sub-title">Expect an executive response within 24 business hours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="brand-contact-form">
        <div className="form-input-grid">
          <div className="form-field-group">
            <label htmlFor="form-name" className="field-label">Your Name</label>
            <div className="input-with-icon">
              <i className="fa-regular fa-user field-icon"></i>
              <input 
                type="text" 
                id="form-name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="e.g. Alex Morgan"
                className="brand-input"
              />
            </div>
          </div>

          <div className="form-field-group">
            <label htmlFor="form-email" className="field-label">Email Address</label>
            <div className="input-with-icon">
              <i className="fa-regular fa-envelope field-icon"></i>
              <input 
                type="email" 
                id="form-email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="alex@company.com"
                className="brand-input"
              />
            </div>
          </div>
        </div>

        <div className="form-field-group">
          <label htmlFor="form-inquiry" className="field-label">Inquiry Nature</label>
          <div className="input-with-icon">
            <i className="fa-solid fa-briefcase field-icon"></i>
            <select 
              id="form-inquiry" 
              value={inquiryType} 
              onChange={(e) => setInquiryType(e.target.value)}
              className="brand-input brand-select"
            >
              <option value="Full-Time Software / Data Role">Full-Time Software / Data Engineering Role</option>
              <option value="AI / Web Application Contract">AI / Web Application Development</option>
              <option value="BI & Data Pipeline Project">BI Dashboard &amp; Data Pipeline Architecture</option>
              <option value="Technical Advisory / Consulting">Technical Advisory &amp; Collaboration</option>
              <option value="General Professional Inquiry">General Professional Inquiry</option>
            </select>
          </div>
        </div>

        <div className="form-field-group">
          <label htmlFor="form-message" className="field-label">Project or Opportunity Details</label>
          <div className="input-with-icon textarea-wrapper">
            <i className="fa-regular fa-message field-icon textarea-icon"></i>
            <textarea 
              id="form-message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              required 
              rows="4" 
              placeholder="Outline your team goals, project scope, or opportunity details..."
              className="brand-input brand-textarea"
            />
          </div>
        </div>

        {status.text && (
          <div className={`form-status-alert ${status.type}`}>
            {status.type === 'transmitting' && <i className="fa-solid fa-circle-notch fa-spin"></i>}
            {status.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
            <span>{status.text}</span>
          </div>
        )}

        <button 
          type="submit" 
          disabled={submitting} 
          className="btn-submit-action"
        >
          {submitting ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              <span>TRANSMITTING MESSAGE...</span>
            </>
          ) : (
            <>
              <span>DISPATCH MESSAGE</span>
              <i className="fa-solid fa-arrow-right"></i>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
