'use client';
import { useState } from 'react';
import { updateLeadStatus, updateLeadNotes } from '@/lib/actions';
import { X, Download, Mail } from 'lucide-react';

type Lead = { id: string; name: string; businessName: string | null; phone: string | null; email: string; service: string | null; budget: string | null; message: string | null; status: string; internalNotes: string | null; createdAt: string };

const tabs = ['All', 'New', 'In Progress', 'Closed', 'Spam'];
const statusColors: Record<string, string> = { New: '#7B2FFF', 'In Progress': '#f59e0b', Closed: '#10b981', Spam: '#888' };

export default function LeadsInbox({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');

  const filtered = filter === 'All' ? leads : leads.filter(l => l.status === filter);

  const exportCSV = () => {
    const headers = ['Name','Business','Phone','Email','Service','Budget','Status','Date','Message'];
    const rows = leads.map(l => [l.name, l.businessName, l.phone, l.email, l.service, l.budget, l.status, new Date(l.createdAt).toLocaleDateString(), l.message]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c || ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'leads.csv'; a.click();
  };

  const openLead = (lead: Lead) => { setSelected(lead); setNotes(lead.internalNotes || ''); };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Leads Inbox ({leads.length})</h2>
        <button className="btn btn-secondary btn-sm" onClick={exportCSV}><Download size={16} /> Export CSV</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {tabs.map(t => <button key={t} onClick={() => setFilter(t)} className={`filter-btn ${filter === t ? 'active' : ''}`} style={{ padding: '8px 16px', borderRadius: 20, border: filter === t ? 'none' : '1.5px solid #e8e8e8', background: filter === t ? '#7B2FFF' : 'white', color: filter === t ? 'white' : '#555', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>{t} {t !== 'All' && <span>({leads.filter(l => l.status === t).length})</span>}</button>)}
      </div>

      <div style={{ background: 'white', borderRadius: 12, overflow: 'auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: 800 }}>
          <thead><tr>{['Name','Business','Phone','Email','Service','Budget','Date','Status'].map(h => <th key={h} style={{ textAlign: 'left', padding: '12px 14px', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} onClick={() => openLead(l)} style={{ borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }}>
                <td style={{ padding: '12px 14px', fontWeight: 500 }}>{l.name}</td>
                <td style={{ padding: '12px 14px' }}>{l.businessName || '—'}</td>
                <td style={{ padding: '12px 14px' }}>{l.phone || '—'}</td>
                <td style={{ padding: '12px 14px' }}>{l.email}</td>
                <td style={{ padding: '12px 14px' }}>{l.service || '—'}</td>
                <td style={{ padding: '12px 14px' }}>{l.budget || '—'}</td>
                <td style={{ padding: '12px 14px', color: '#888', whiteSpace: 'nowrap' }}>{new Date(l.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '12px 14px' }}><span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: `${statusColors[l.status] || '#888'}20`, color: statusColors[l.status] || '#888' }}>{l.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setSelected(null)}>
          <div style={{ width: 400, maxWidth: '100%', background: 'white', height: '100%', padding: 32, overflowY: 'auto', animation: 'slideInLeft 0.3s ease' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.1rem' }}>{selected.name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><strong>Email:</strong> {selected.email} <a href={`mailto:${selected.email}`} style={{ marginLeft: 4 }}><Mail size={14} /></a></div>
              <div><strong>Business:</strong> {selected.businessName || '—'}</div>
              <div><strong>Phone:</strong> {selected.phone || '—'}</div>
              <div><strong>Service:</strong> {selected.service || '—'}</div>
              <div><strong>Budget:</strong> {selected.budget || '—'}</div>
              <div><strong>Message:</strong><p style={{ marginTop: 4, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>{selected.message || 'No message'}</p></div>
              <div className="input-group"><label>Status</label>
                <select className="select" value={selected.status} onChange={e => { updateLeadStatus(selected.id, e.target.value); setSelected({ ...selected, status: e.target.value }); }}>
                  <option>New</option><option>In Progress</option><option>Closed</option><option>Spam</option>
                </select>
              </div>
              <div className="input-group"><label>Internal Notes</label>
                <textarea className="textarea" value={notes} onChange={e => setNotes(e.target.value)} />
                <button className="btn btn-primary btn-sm" onClick={() => updateLeadNotes(selected.id, notes)} style={{ marginTop: 8 }}>Save Notes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
