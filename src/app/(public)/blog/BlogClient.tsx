'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Clock } from 'lucide-react';

export default function BlogClient({ posts, categories }: { posts: any[], categories: string[] }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const filtered = posts.filter(p => (filter === 'All' || p.category === filter) && p.title.toLowerCase().includes(search.toLowerCase()));
  const featured = posts.length > 0 ? posts[0] : null;

  return (
    <>
      <section className="page-hero"><div className="container">
        <span className="section-label">Blog</span>
        <h1>Marketing Tips & <span className="gradient-text">Insights</span></h1>
        <p style={{ color: 'var(--text-light)', maxWidth: 600, margin: '0 auto', fontSize: '1.15rem' }}>Actionable tips, strategies, and trends to help your business grow online.</p>
      </div></section>

      <section className="section">
        <div className="container">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="featured-post">
              <div className="featured-thumb"><span className="gradient-text" style={{ fontSize: '4rem', fontWeight: 900 }}>{featured.title[0]}</span></div>
              <div className="featured-info">
                <span className="badge badge-orange">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="card-link">Read More <ArrowRight size={16} /></span>
              </div>
            </Link>
          )}

          <div className="blog-controls">
            <div className="search-box"><Search size={18} /><input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <div className="filter-bar">{categories.map(c => <button key={c} onClick={() => setFilter(c)} className={`filter-btn ${filter === c ? 'active' : ''}`}>{c}</button>)}</div>
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: 40 }}>No articles found matching your criteria.</p>
          ) : (
            <div className="grid-3">
              {filtered.map((p, i) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="card blog-card">
                  <div className="blog-thumb"><span className="gradient-text" style={{ fontSize: '2rem', fontWeight: 900 }}>{p.title[0]}</span></div>
                  <span className="badge badge-purple">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="blog-meta"><Clock size={14} /><span>{new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
                </Link>
              ))}
            </div>
          )}

          <div className="newsletter-section">
            <h3>Stay Updated 📬</h3>
            <p>Get the latest marketing tips delivered to your inbox.</p>
            <form onSubmit={e => e.preventDefault()} className="newsletter-form">
              <input type="email" placeholder="Your email address" className="input" />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-hero { padding: 120px 0 80px; text-align: center; background: var(--bg-alt); }
        .page-hero h1 { margin: 16px 0; }
        .featured-post { display: flex; gap: 32px; background: var(--card-bg); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); margin-bottom: 48px; transition: all 0.3s; text-decoration: none; color: inherit; }
        .featured-post:hover { box-shadow: var(--shadow-lg); }
        .featured-thumb { width: 320px; min-height: 240px; background: linear-gradient(135deg, rgba(123,47,255,0.08), rgba(255,107,53,0.08)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .featured-info { padding: 32px; display: flex; flex-direction: column; justify-content: center; }
        .featured-info h2 { font-size: 1.5rem; margin: 12px 0; }
        .featured-info p { color: var(--text-light); margin-bottom: 16px; }
        .blog-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; gap: 16px; flex-wrap: wrap; }
        .search-box { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1.5px solid var(--border); border-radius: var(--radius-full); background: white; }
        .search-box input { border: none; outline: none; font-size: 0.9rem; font-family: inherit; min-width: 200px; }
        .filter-bar { display: flex; gap: 8px; flex-wrap: wrap; }
        .filter-btn { padding: 8px 18px; border-radius: var(--radius-full); border: 1.5px solid var(--border); background: white; font-weight: 600; font-size: 0.8rem; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        .blog-card { display: flex; flex-direction: column; text-decoration: none; color: inherit; }
        .blog-thumb { height: 160px; border-radius: var(--radius-sm); background: linear-gradient(135deg, rgba(123,47,255,0.06), rgba(255,107,53,0.06)); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .blog-card .badge { align-self: flex-start; margin-bottom: 8px; }
        .blog-card h3 { font-size: 1rem; margin-bottom: 8px; }
        .blog-card p { color: var(--text-light); font-size: 0.85rem; flex: 1; margin-bottom: 12px; }
        .blog-meta { display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 0.8rem; }
        .newsletter-section { text-align: center; padding: 60px; background: var(--bg-alt); border-radius: var(--radius); margin-top: 64px; }
        .newsletter-section h3 { margin-bottom: 8px; }
        .newsletter-section p { color: var(--text-light); margin-bottom: 20px; }
        .newsletter-form { display: flex; gap: 12px; max-width: 400px; margin: 0 auto; }
        .newsletter-form .input { flex: 1; }
        @media (max-width: 768px) { .featured-post { flex-direction: column; } .featured-thumb { width: 100%; min-height: 160px; } .newsletter-form { flex-direction: column; } }
      `}</style>
    </>
  );
}
