'use client';
import { useState } from 'react';
import { updatePricingPlan } from '@/lib/actions';
import { Save, Check, Star } from 'lucide-react';

type Plan = { id: string; name: string; price: string; features: string[]; popular: boolean; ctaLabel: string };

export default function PricingManager({ plans: initial }: { plans: Plan[] }) {
  const [plans, setPlans] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updatePlan = (id: string, field: string, value: string | boolean | string[]) => {
    setPlans(plans.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const plan of plans) {
      await updatePricingPlan(plan.id, { name: plan.name, price: plan.price, features: plan.features, popular: plan.popular, ctaLabel: plan.ctaLabel });
    }
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Pricing Plans</h2>
        <button className="btn btn-primary btn-sm" onClick={handleSaveAll} disabled={saving}>
          {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save All'}</>}
        </button>
      </div>
      <div className="grid-3">
        {plans.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: p.popular ? '2px solid #7B2FFF' : '1px solid #eee' }}>
            {p.popular && <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#7B2FFF', fontSize: '0.75rem', fontWeight: 700, marginBottom: 8 }}><Star size={14} /> Most Popular</div>}
            <div className="input-group"><label>Plan Name</label><input className="input" value={p.name} onChange={e => updatePlan(p.id, 'name', e.target.value)} /></div>
            <div className="input-group"><label>Price</label><input className="input" value={p.price} onChange={e => updatePlan(p.id, 'price', e.target.value)} /></div>
            <div className="input-group"><label>CTA Label</label><input className="input" value={p.ctaLabel} onChange={e => updatePlan(p.id, 'ctaLabel', e.target.value)} /></div>
            <div className="input-group"><label>Features (one per line)</label><textarea className="textarea" value={Array.isArray(p.features) ? p.features.join('\n') : (typeof p.features === 'string' ? JSON.parse(p.features || '[]').join('\n') : '')} onChange={e => updatePlan(p.id, 'features', e.target.value.split('\n'))} style={{ minHeight: 120 }} /></div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={p.popular} onChange={e => updatePlan(p.id, 'popular', e.target.checked)} /> Mark as Popular
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
