'use client';
import { useState } from 'react';
import Link from 'next/link';
import { deleteBlogPost, toggleBlogPublished } from '@/lib/actions';
import { Search, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

type Post = { id: string; title: string; slug: string; category: string; published: boolean; createdAt: string };

export default function BlogTable({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState('');
  const filtered = posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: '1.5px solid #e8e8e8', borderRadius: 10, background: 'white', maxWidth: 320 }}>
        <Search size={16} color="#888" />
        <input type="text" placeholder="Search posts..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '0.875rem', width: '100%', fontFamily: 'inherit' }} />
      </div>
      <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead><tr>
            <th style={{ textAlign: 'left', padding: '12px 16px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Title</th>
            <th style={{ textAlign: 'left', padding: '12px 16px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Category</th>
            <th style={{ textAlign: 'left', padding: '12px 16px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '12px 16px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Date</th>
            <th style={{ textAlign: 'right', padding: '12px 16px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{p.title}</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-purple">{p.category}</span></td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: p.published ? '#10b98120' : '#f59e0b20', color: p.published ? '#10b981' : '#f59e0b' }}>
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#888' }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <Link href={`/admin/blog/${p.id}/edit`} style={{ padding: 6, borderRadius: 6, color: '#7B2FFF', background: '#7B2FFF10' }}><Edit size={16} /></Link>
                    <button onClick={() => toggleBlogPublished(p.id, !p.published)} style={{ padding: 6, borderRadius: 6, color: p.published ? '#f59e0b' : '#10b981', background: p.published ? '#f59e0b10' : '#10b98110', border: 'none', cursor: 'pointer' }}>
                      {p.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button onClick={() => { if (confirm('Delete this post?')) deleteBlogPost(p.id); }} style={{ padding: 6, borderRadius: 6, color: '#ef4444', background: '#ef444410', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
