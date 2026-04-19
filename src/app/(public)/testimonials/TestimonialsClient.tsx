'use client';
import { useEffect } from 'react';
import { Star, Play, Quote } from 'lucide-react';

export default function TestimonialsClient({ testimonials }: { testimonials: any[] }) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const videoTestimonials = testimonials.filter(t => t.videoUrl); // If you have a videoUrl, else leave it. Wait, no videoUrl in Testimonial schema. Let's just say filter(t => false) or something, or assume no video testimonials for now.
  const textTestimonials = testimonials;

  return (
    <>
      <section className="page-hero"><div className="container">
        <span className="section-label">Testimonials</span>
        <h1>What Our Clients <span className="gradient-text">Say About Us</span></h1>
        <p style={{ color: 'var(--text-light)', maxWidth: 600, margin: '0 auto', fontSize: '1.15rem' }}>Don{"'"}t take our word for it — hear from the businesses we{"'"}ve helped grow.</p>
      </div></section>

      <section className={`section reveal`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Reviews</span>
            <h2>Client <span className="gradient-text">Reviews</span></h2>
          </div>
          {textTestimonials.length === 0 ? (
             <p style={{ textAlign: 'center' }}>No reviews yet.</p>
          ) : (
            <div className="grid-3">
              {textTestimonials.map((t, i) => (
                <div key={t.id} className="card review-card">
                  <Quote size={24} style={{ color: 'var(--primary)', opacity: 0.3, marginBottom: 12 }} />
                  <div className="stars">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={16} fill={j < t.rating ? '#fbbf24' : 'none'} stroke={j < t.rating ? '#fbbf24' : '#ddd'} />)}</div>
                  <p className="review-text">{t.review}</p>
                  <div className="review-author">
                    <div className="review-avatar">{t.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}</div>
                    <div><strong>{t.name}</strong><span>{t.business} {t.role ? `- ${t.role}` : ''}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
      `}</style>
    </>
  );
}
