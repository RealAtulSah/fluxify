'use client';
import { useEffect } from 'react';
import { Star, Play, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Vikram Singh', business: 'Singh Electronics', rating: 5, review: 'Fluxify Media transformed our online presence completely! Our website traffic increased by 300% in just 3 months, and we\'re getting 5x more leads than before. Best investment we ever made for our business.' },
  { name: 'Anita Desai', business: 'Anita\'s Boutique', rating: 5, review: 'The social media strategy they created for our boutique was phenomenal. We went from 500 followers to 15,000 in just 4 months. Our online sales have skyrocketed!' },
  { name: 'Rajesh Kumar', business: 'Kumar\'s Restaurant Chain', rating: 5, review: 'Working with Fluxify Media has been a game-changer for our restaurant chain. Their Google Ads campaigns bring us a consistent flow of new customers every single day.' },
  { name: 'Meera Joshi', business: 'Meera\'s Yoga Studio', rating: 5, review: 'I was skeptical about digital marketing but Fluxify proved me wrong. My yoga classes are fully booked now, and I had to open a second location!' },
  { name: 'Amit Patel', business: 'Patel Hardware', rating: 4, review: 'Great team to work with! They understand the challenges of local businesses and create strategies that actually work. Our foot traffic has doubled since we started.' },
  { name: 'Sunita Sharma', business: 'Sharma Sweets', rating: 5, review: 'Our Instagram went viral thanks to Fluxify! We now get orders from across the city. The content they create is just amazing and so professional.' },
];

const videoTestimonials = [
  { name: 'Vikram Singh', business: 'Singh Electronics', topic: 'How SEO transformed our business' },
  { name: 'Anita Desai', business: 'Anita\'s Boutique', topic: 'Our Instagram growth journey' },
  { name: 'Rajesh Kumar', business: 'Kumar\'s Restaurant', topic: 'ROI from paid advertising' },
];

export default function TestimonialsPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero"><div className="container">
        <span className="section-label">Testimonials</span>
        <h1>What Our Clients <span className="gradient-text">Say About Us</span></h1>
        <p style={{ color: 'var(--text-light)', maxWidth: 600, margin: '0 auto', fontSize: '1.15rem' }}>Don{"'"}t take our word for it — hear from the businesses we{"'"}ve helped grow.</p>
      </div></section>

      <section className="section reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Video Testimonials</span>
            <h2>Hear Their <span className="gradient-text">Stories</span></h2>
          </div>
          <div className="grid-3">
            {videoTestimonials.map((v, i) => (
              <div key={i} className="card video-card">
                <div className="video-thumb"><Play size={40} /></div>
                <h3>{v.name}</h3>
                <p className="video-biz">{v.business}</p>
                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{v.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Reviews</span>
            <h2>Client <span className="gradient-text">Reviews</span></h2>
          </div>
          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="card review-card">
                <Quote size={24} style={{ color: 'var(--primary)', opacity: 0.3, marginBottom: 12 }} />
                <div className="stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} fill={j < t.rating ? '#fbbf24' : 'none'} stroke={j < t.rating ? '#fbbf24' : '#ddd'} />)}</div>
                <p className="review-text">{t.review}</p>
                <div className="review-author">
                  <div className="review-avatar">{t.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><strong>{t.name}</strong><span>{t.business}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="gradient-text">Google Reviews</span></h2>
            <p className="section-subtitle">See what people are saying about us on Google.</p>
          </div>
          <div className="google-widget"><p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Google Reviews widget will be embedded here</p></div>
        </div>
      </section>

      <style jsx>{`
        .page-hero { padding: 120px 0 80px; text-align: center; background: var(--bg-alt); }
        .page-hero h1 { margin: 16px 0; }
        .video-card { text-align: center; }
        .video-thumb { width: 100%; height: 200px; border-radius: var(--radius-sm); background: linear-gradient(135deg, rgba(123,47,255,0.08), rgba(255,107,53,0.08)); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: var(--primary); cursor: pointer; transition: all 0.3s; }
        .video-thumb:hover { background: linear-gradient(135deg, rgba(123,47,255,0.15), rgba(255,107,53,0.15)); }
        .video-card h3 { font-size: 1rem; margin-bottom: 4px; }
        .video-biz { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 4px; }
        .review-card { display: flex; flex-direction: column; }
        .stars { display: flex; gap: 2px; margin-bottom: 12px; }
        .review-text { color: var(--text-light); font-size: 0.9rem; flex: 1; margin-bottom: 20px; line-height: 1.7; }
        .review-author { display: flex; align-items: center; gap: 12px; border-top: 1px solid var(--border); padding-top: 16px; }
        .review-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem; flex-shrink: 0; }
        .review-author strong { display: block; font-size: 0.9rem; }
        .review-author span { font-size: 0.8rem; color: var(--text-muted); }
        .google-widget { padding: 60px; border: 2px dashed var(--border); border-radius: var(--radius); }
      `}</style>
    </>
  );
}
