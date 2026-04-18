'use client';
import { useState } from 'react';
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/actions';
import { Star, Edit, Trash2, Check, X, Plus } from 'lucide-react';

type T = { id: string; name: string; business: string; role: string | null; rating: number; review: string; approved: boolean; featured: boolean; createdAt: string };

export default function TestimonialsManager({ testimonials }: { testimonials: T[] }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', business: '', role: '', rating: 5, review: '' });

  const handleAdd = async () => {
    await createTestimonial(form);
    setForm({ name: '', business: '', role: '', rating: 5, review: '' });
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Testimonials ({testimonials.length})</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Add Testimonial</button>
      </div>

      {showForm && (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="grid-2">
            <div className="input-group"><label>Name</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div className="input-group"><label>Business</label><input className="input" value={form.business} onChange={e => setForm({...form, business: e.target.value})} /></div>
          </div>
          <div className="grid-2">
            <div className="input-group"><label>Role</label><input className="input" value={form.role} onChange={e => setForm({...form, role: e.target.value})} /></div>
            <div className="input-group"><label>Rating</label>
              <div style={{ display: 'flex', gap: 4 }}>{[1,2,3,4,5].map(n => <button key={n} onClick={() => setForm({...form, rating: n})} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Star size={20} fill={n <= form.rating ? '#fbbf24' : 'none'} stroke={n <= form.rating ? '#fbbf24' : '#ddd'} /></button>)}</div>
            </div>
          </div>
          <div className="input-group"><label>Review</label><textarea className="textarea" value={form.review} onChange={e => setForm({...form, review: e.target.value})} /></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead><tr>
            {['Name','Business','Rating','Approved','Featured','Actions'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {testimonials.map(t => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{t.name}</td>
                <td style={{ padding: '12px 16px' }}>{t.business}</td>
                <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', gap: 1 }}>{[1,2,3,4,5].map(n => <Star key={n} size={14} fill={n <= t.rating ? '#fbbf24' : 'none'} stroke={n <= t.rating ? '#fbbf24' : '#ddd'} />)}</div></td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => updateTestimonial(t.id, { approved: !t.approved })} style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer', background: t.approved ? '#10b98120' : '#ef444420', color: t.approved ? '#10b981' : '#ef4444' }}>
                    {t.approved ? 'Approved' : 'Pending'}
                  </button>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => updateTestimonial(t.id, { featured: !t.featured })} style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, border: 'none', cursor: 'pointer', background: t.featured ? '#7B2FFF20' : '#88820', color: t.featured ? '#7B2FFF' : '#888' }}>
                    {t.featured ? 'Featured' : 'Normal'}
                  </button>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => { if (confirm('Delete?')) deleteTestimonial(t.id); }} style={{ padding: 6, borderRadius: 6, color: '#ef4444', background: '#ef444410', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
