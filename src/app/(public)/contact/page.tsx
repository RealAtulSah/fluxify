'use client';
import { useState } from 'react';
import { Send, Clock, MapPin, Mail, Phone, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const faqs = [
  { q: 'How long does it take to see results?', a: 'SEO typically takes 3-6 months for significant results. Paid ads can show results within the first week. Social media growth is usually visible within 1-2 months.' },
  { q: 'What is your minimum contract period?', a: 'We offer flexible monthly plans with no long-term contracts. However, we recommend a minimum 3-month commitment for best results.' },
  { q: 'Do you work with businesses outside India?', a: 'Yes! While we specialize in Indian small businesses, we work with clients worldwide. Our strategies are adaptable to any market.' },
  { q: 'How do you measure success?', a: 'We track KPIs that matter: website traffic, lead generation, conversion rates, ROI, and revenue growth. You get detailed monthly reports.' },
  { q: 'Can I upgrade or downgrade my plan?', a: 'Absolutely! You can change your plan at any time. We\'ll adjust your strategy accordingly with no penalties.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', businessName: '', phone: '', email: '', service: '', budget: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus('success'); setForm({ name: '', businessName: '', phone: '', email: '', service: '', budget: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      <section className="page-hero"><div className="container">
        <span className="section-label">Contact Us</span>
        <h1>Let{"'"}s <span className="gradient-text">Grow Together</span></h1>
        <p style={{ color: 'var(--text-light)', maxWidth: 600, margin: '0 auto', fontSize: '1.15rem' }}>Ready to amplify your brand? Fill out the form and we{"'"}ll get back to you within 2 hours.</p>
      </div></section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-wrap">
              <div className="response-badge"><Clock size={16} /> We reply within 2 hours</div>
              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  <div className="input-group"><label>Name *</label><input className="input" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                  <div className="input-group"><label>Business Name</label><input className="input" value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} /></div>
                </div>
                <div className="grid-2">
                  <div className="input-group"><label>Phone</label><input className="input" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                  <div className="input-group"><label>Email *</label><input className="input" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
                </div>
                <div className="grid-2">
                  <div className="input-group"><label>Service Interested In</label>
                    <select className="select" value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                      <option value="">Select a service</option>
                      <option>SEO Optimization</option><option>Social Media Marketing</option><option>Website Design & Development</option>
                      <option>Google & Meta Paid Ads</option><option>Content Creation</option><option>Branding & Identity</option>
                    </select>
                  </div>
                  <div className="input-group"><label>Budget Range</label>
                    <select className="select" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}>
                      <option value="">Select budget</option>
                      <option>Under ₹10,000/mo</option><option>₹10,000 - ₹25,000/mo</option><option>₹25,000 - ₹50,000/mo</option><option>₹50,000+/mo</option>
                    </select>
                  </div>
                </div>
                <div className="input-group"><label>Message</label><textarea className="textarea" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Tell us about your business and goals..." /></div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'} style={{ width: '100%' }}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
                </button>
                {status === 'success' && <p style={{ color: '#10b981', marginTop: 12, fontWeight: 600 }}>🎉 Message sent successfully! We{"'"}ll get back to you soon.</p>}
                {status === 'error' && <p style={{ color: '#ef4444', marginTop: 12, fontWeight: 600 }}>Something went wrong. Please try again.</p>}
              </form>
            </div>
            <div className="contact-info">
              <div className="card info-card"><Mail size={20} style={{ color: 'var(--primary)' }} /><div><strong>Email</strong><p>hello@fluxifymedia.com</p></div></div>
              <div className="card info-card"><Phone size={20} style={{ color: 'var(--accent)' }} /><div><strong>Phone</strong><p>+91 98765 43210</p></div></div>
              <div className="card info-card"><MapPin size={20} style={{ color: '#10b981' }} /><div><strong>Office</strong><p>Noida, Uttar Pradesh</p></div></div>
              <div className="card info-card"><MessageCircle size={20} style={{ color: '#25D366' }} /><div><strong>WhatsApp</strong><p>Chat with us instantly</p></div></div>
              <div className="map-embed">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sNoida!5e0!3m2!1sen!2sin!4v1" width="100%" height="250" style={{ border: 0, borderRadius: 'var(--radius-sm)' }} loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header"><span className="section-label">FAQ</span><h2>Frequently Asked <span className="gradient-text">Questions</span></h2></div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="faq-q"><span>{f.q}</span>{openFaq === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-hero { padding: 120px 0 80px; text-align: center; background: var(--bg-alt); }
        .page-hero h1 { margin: 16px 0; }
        .contact-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 48px; }
        .response-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(16,185,129,0.08); color: #10b981; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600; margin-bottom: 24px; }
        .info-card { display: flex; align-items: flex-start; gap: 16px; padding: 20px; margin-bottom: 12px; }
        .info-card strong { display: block; font-size: 0.9rem; }
        .info-card p { color: var(--text-light); font-size: 0.85rem; margin: 0; }
        .faq-list { max-width: 700px; margin: 0 auto; }
        .faq-item { background: var(--card-bg); border-radius: var(--radius-sm); margin-bottom: 12px; padding: 20px 24px; cursor: pointer; box-shadow: var(--shadow); transition: all 0.2s; }
        .faq-item:hover { box-shadow: var(--shadow-lg); }
        .faq-q { display: flex; justify-content: space-between; align-items: center; font-weight: 600; gap: 12px; }
        .faq-a { margin-top: 12px; color: var(--text-light); font-size: 0.9rem; line-height: 1.7; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
