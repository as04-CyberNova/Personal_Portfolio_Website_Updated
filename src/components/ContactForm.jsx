import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('General Inquiry');
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'transmitting', text: 'Sending message...' });

    const mailtoLink = `mailto:abhyudayasinha04@gmail.com?subject=Contact Inquiry: ${inquiryType} from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

    try {
      // Initialize EmailJS with Public Key
      window.emailjs.init('0radgAcsuvaKv3pPc');
      
      await window.emailjs.send('service_q2lh3yp', 'template_jjntvbt', {
        from_name: name,
        reply_to: email,
        message: message,
        to_name: 'Abhyudaya',
        collaboration_pack: inquiryType
      });

      setStatus({ type: 'success', text: 'Message sent successfully! Thank you for connecting.' });
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus({ type: '', text: '' }), 4000);
    } catch (error) {
      console.warn("API Transmission failed, executing client mailto fallback:", error);
      setStatus({ type: 'success', text: 'Opening your email client to send message...' });
      setTimeout(() => {
        window.location.href = mailtoLink;
        setName('');
        setEmail('');
        setMessage('');
        setStatus({ type: '', text: '' });
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bento-item" style={{ padding: '2rem', background: 'rgba(10,15,30,0.7)', border: '1px solid var(--border)', borderRadius: '16px' }}>
      <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
        <i className="fa-solid fa-paper-plane" style={{ marginRight: '0.5rem' }}></i> Send a Message
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="name" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="John Doe"
            style={{ padding: '0.75rem', background: '#040814', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="email" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Email Address</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="john@example.com"
            style={{ padding: '0.75rem', background: '#040814', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="inquiryType" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Inquiry Type</label>
          <select 
            id="inquiryType" 
            value={inquiryType} 
            onChange={(e) => setInquiryType(e.target.value)}
            style={{ padding: '0.75rem', background: '#040814', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem' }}
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Internship Opportunity">Internship Opportunity</option>
            <option value="Freelance Contract">Freelance Contract</option>
            <option value="Data Project Collaboration">Data Project Collaboration</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label htmlFor="message" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Your Message</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
            rows="4" 
            placeholder="Describe your project, role, or questions..."
            style={{ padding: '0.75rem', background: '#040814', border: '1px solid var(--border)', borderRadius: '8px', color: '#fff', fontSize: '0.9rem', resize: 'vertical' }}
          />
        </div>

        {status.text && (
          <div className={`form-status ${status.type}`} style={{
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)',
            border: status.type === 'success' ? '1px solid #10b981' : '1px solid var(--border)',
            color: status.type === 'success' ? '#10b981' : '#fff'
          }}>
            {status.type === 'transmitting' && <i className="fa-solid fa-circle-notch fa-spin"></i>}
            {status.type === 'success' && <i className="fa-solid fa-circle-check"></i>}
            {status.text}
          </div>
        )}

        <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          {submitting ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i> SENDING...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane"></i> SEND MESSAGE
            </>
          )}
        </button>
      </form>
    </div>
  );
}
