import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FileText, Inbox, Star, Eye, PenTool, Users } from 'lucide-react';

export default async function AdminDashboard() {
  const [totalPosts, publishedPosts, totalLeads, newLeads, totalTestimonials, pendingTestimonials] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: 'New', createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } }),
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { approved: false } }),
  ]);

  const recentLeads = await prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
  const recentPosts = await prisma.blogPost.findMany({ take: 5, orderBy: { createdAt: 'desc' } });

  const statCards = [
    { label: 'Total Blog Posts', value: totalPosts, icon: <FileText size={20} />, color: '#7B2FFF' },
    { label: 'Published Posts', value: publishedPosts, icon: <Eye size={20} />, color: '#10b981' },
    { label: 'Total Leads', value: totalLeads, icon: <Inbox size={20} />, color: '#FF6B35' },
    { label: 'New Leads (Week)', value: newLeads, icon: <Users size={20} />, color: '#f59e0b' },
    { label: 'Total Testimonials', value: totalTestimonials, icon: <Star size={20} />, color: '#8b5cf6' },
    { label: 'Pending Approval', value: pendingTestimonials, icon: <PenTool size={20} />, color: '#ef4444' },
  ];

  const statusColor: Record<string, string> = { New: '#7B2FFF', 'In Progress': '#f59e0b', Closed: '#10b981', Spam: '#888' };

  return (
    <div>
      <div className="dash-stats">
        {statCards.map((s, i) => (
          <div key={i} className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
            <div><div className="dash-stat-value">{s.value}</div><div className="dash-stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="dash-section">
          <h3>Recent Leads</h3>
          <table className="dash-table">
            <thead><tr><th>Name</th><th>Business</th><th>Service</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {recentLeads.map(l => (
                <tr key={l.id}>
                  <td>{l.name}</td><td>{l.businessName || '—'}</td><td>{l.service || '—'}</td>
                  <td><span className="status-badge" style={{ background: `${statusColor[l.status] || '#888'}20`, color: statusColor[l.status] || '#888' }}>{l.status}</span></td>
                  <td>{l.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
              {recentLeads.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No leads yet</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="dash-section">
          <h3>Recent Blog Posts</h3>
          <table className="dash-table">
            <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {recentPosts.map(p => (
                <tr key={p.id}>
                  <td>{p.title}</td><td>{p.category}</td>
                  <td><span className="status-badge" style={{ background: p.published ? '#10b98120' : '#f59e0b20', color: p.published ? '#10b981' : '#f59e0b' }}>{p.published ? 'Published' : 'Draft'}</span></td>
                  <td>{p.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dash-actions">
        <Link href="/admin/blog/new" className="btn btn-primary btn-sm">Write New Blog</Link>
        <Link href="/admin/testimonials" className="btn btn-secondary btn-sm">Add Testimonial</Link>
        <Link href="/admin/leads" className="btn btn-secondary btn-sm">View All Leads</Link>
      </div>

      <style>{`
        .dash-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
        .dash-stat-card { background: white; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .dash-stat-icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .dash-stat-value { font-size: 1.75rem; font-weight: 800; }
        .dash-stat-label { font-size: 0.8rem; color: #888; }
        .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
        .dash-section { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .dash-section h3 { font-size: 1rem; margin-bottom: 16px; }
        .dash-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .dash-table th { text-align: left; padding: 8px 12px; color: #888; font-weight: 600; border-bottom: 1px solid #eee; font-size: 0.75rem; text-transform: uppercase; }
        .dash-table td { padding: 10px 12px; border-bottom: 1px solid #f5f5f5; }
        .status-badge { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .dash-actions { display: flex; gap: 12px; }
        @media (max-width: 768px) { .dash-stats { grid-template-columns: repeat(2, 1fr); } .dash-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
