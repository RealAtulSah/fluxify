'use client';
import { useState } from 'react';
import { createCaseStudy, updateCaseStudy, deleteCaseStudy } from '@/lib/actions';
import { Edit, Trash2, Plus, X } from 'lucide-react';

type C = { id: string; title: string; client: string; category: string; background: string | null; challenge: string | null; strategy: string | null; results: string | null; beforeStats: string | null; afterStats: string | null; testimonialQuote: string | null; published: boolean };

export default function CaseStudiesManager({ studies: initial }: { studies: C[] }) {
  const [studies, setStudies] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<C>>({});
  const [beforeText, setBeforeText] = useState('');
  const [afterText, setAfterText] = useState('');

  const startEdit = (s: C) => { 
    setEditing(s.id); 
    setForm(s); 
    setBeforeText(s.beforeStats ? JSON.parse(s.beforeStats).join('\n') : ''); 
    setAfterText(s.afterStats ? JSON.parse(s.afterStats).join('\n') : '');
    setIsAdding(false); 
  };
  
  const startAdd = () => { 
    setForm({ title: '', client: '', category: 'SEO', published: false }); 
    setBeforeText(''); setAfterText(''); 
    setIsAdding(true); setEditing(null); 
  };

  const saveEdit = async () => {
    const beforeStats = beforeText.split('\n').filter(Boolean);
    const afterStats = afterText.split('\n').filter(Boolean);
    const data = {
      title: form.title || 'New Case Study',
      client: form.client || 'Unknown',
      category: form.category || 'SEO',
      background: form.background || '',
      challenge: form.challenge || '',
      strategy: form.strategy || '',
      results: form.results || '',
      testimonialQuote: form.testimonialQuote || '',
      published: !!form.published,
      beforeStats,
      afterStats
    };

    if (isAdding) {
      await createCaseStudy(data);
    } else if (editing) {
      await updateCaseStudy(editing, data);
    }
    
    // Quick local state update (in reality we'd wait for revalidatePath to refresh the server component)
    setIsAdding(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      await deleteCaseStudy(id);
      setStudies(studies.filter(s => s.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Case Studies ({studies.length})</h2>
        <button className="btn btn-secondary btn-sm" onClick={startAdd}><Plus size={16} /> Add Case Study</button>
      </div>
      <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead><tr>{['Title','Client','Category','Published','Actions'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee' }}>{h}</th>)}</tr></thead>
          <tbody>
            {studies.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '12px 16px', fontWeight: 500 }}>{s.title}</td>
                <td style={{ padding: '12px 16px' }}>{s.client}</td>
                <td style={{ padding: '12px 16px' }}><span className="badge badge-purple">{s.category}</span></td>
                <td style={{ padding: '12px 16px' }}><span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: s.published ? '#10b98120' : '#f59e0b20', color: s.published ? '#10b981' : '#f59e0b' }}>{s.published ? 'Published' : 'Draft'}</span></td>
                <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                  <button onClick={() => startEdit(s)} style={{ padding: 6, borderRadius: 6, color: '#7B2FFF', background: '#7B2FFF10', border: 'none', cursor: 'pointer' }}><Edit size={16} /></button>
                  <button onClick={() => handleDelete(s.id)} style={{ padding: 6, borderRadius: 6, color: '#ef4444', background: '#ef444410', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(editing || isAdding) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => {setEditing(null); setIsAdding(false);}}>
          <div style={{ background: 'white', borderRadius: 12, padding: 32, maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 16 }}>{isAdding ? 'Add Case Study' : 'Edit Case Study'}</h3>
            <div className="grid-2">
              <div className="input-group"><label>Title</label><input className="input" value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} /></div>
              <div className="input-group"><label>Client</label><input className="input" value={form.client || ''} onChange={e => setForm({...form, client: e.target.value})} /></div>
            </div>
            <div className="grid-2">
              <div className="input-group"><label>Category</label><input className="input" value={form.category || ''} onChange={e => setForm({...form, category: e.target.value})} /></div>
              <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
                <input type="checkbox" id="published" checked={form.published || false} onChange={e => setForm({...form, published: e.target.checked})} style={{ width: 18, height: 18 }} />
                <label htmlFor="published" style={{ marginBottom: 0 }}>Published</label>
              </div>
            </div>
            <div className="input-group"><label>Background</label><textarea className="textarea" style={{ minHeight: 80 }} value={form.background || ''} onChange={e => setForm({...form, background: e.target.value})} /></div>
            <div className="input-group"><label>Challenge</label><textarea className="textarea" style={{ minHeight: 80 }} value={form.challenge || ''} onChange={e => setForm({...form, challenge: e.target.value})} /></div>
            <div className="input-group"><label>Strategy</label><textarea className="textarea" style={{ minHeight: 80 }} value={form.strategy || ''} onChange={e => setForm({...form, strategy: e.target.value})} /></div>
            <div className="input-group"><label>Results Summary</label><textarea className="textarea" style={{ minHeight: 80 }} value={form.results || ''} onChange={e => setForm({...form, results: e.target.value})} /></div>
            <div className="grid-2">
              <div className="input-group"><label>Before Stats (1 per line)</label><textarea className="textarea" style={{ minHeight: 80 }} value={beforeText} onChange={e => setBeforeText(e.target.value)} /></div>
              <div className="input-group"><label>After Stats (1 per line)</label><textarea className="textarea" style={{ minHeight: 80 }} value={afterText} onChange={e => setAfterText(e.target.value)} /></div>
            </div>
            <div className="input-group"><label>Testimonial Quote</label><textarea className="textarea" style={{ minHeight: 80 }} value={form.testimonialQuote || ''} onChange={e => setForm({...form, testimonialQuote: e.target.value})} /></div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="btn btn-primary btn-sm" onClick={saveEdit}>Save Case Study</button>
              <button className="btn btn-secondary btn-sm" onClick={() => {setEditing(null); setIsAdding(false);}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
