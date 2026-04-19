'use client';
import { useState } from 'react';
import { updateSiteSettings } from '@/lib/actions';
import { Save, Check } from 'lucide-react';

const fields = [
  { key: 'site_name', label: 'Site Name (e.g. FluxifyMedia)' },
  { key: 'hero_headline', label: 'Hero Headline' },
  { key: 'hero_subheadline', label: 'Hero Subheadline' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'whatsapp_number', label: 'WhatsApp Number' },
  { key: 'office_address', label: 'Office Address' },
  { key: 'contact_email', label: 'Contact Email' },
  { key: 'contact_phone', label: 'Contact Phone' },
  { key: 'instagram_url', label: 'Instagram URL' },
  { key: 'facebook_url', label: 'Facebook URL' },
  { key: 'linkedin_url', label: 'LinkedIn URL' },
  { key: 'twitter_url', label: 'Twitter URL' },
  { key: 'meta_title', label: 'Meta Title' },
  { key: 'meta_description', label: 'Meta Description' },
  { key: 'stat1_num', label: 'Stat 1 Number' },
  { key: 'stat1_label', label: 'Stat 1 Label' },
  { key: 'stat2_num', label: 'Stat 2 Number' },
  { key: 'stat2_label', label: 'Stat 2 Label' },
  { key: 'stat3_num', label: 'Stat 3 Number' },
  { key: 'stat3_label', label: 'Stat 3 Label' },
  { key: 'stat4_num', label: 'Stat 4 Number' },
  { key: 'stat4_label', label: 'Stat 4 Label' },
];

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await updateSiteSettings(Object.entries(settings).map(([key, value]) => ({ key, value })));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Site Settings</h2>
        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}</>}
        </button>
      </div>
      <div style={{ background: 'white', borderRadius: 12, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {fields.map(f => (
          <div key={f.key} className="input-group">
            <label>{f.label}</label>
            {f.key.includes('description') || f.key.includes('subheadline') || f.key.includes('address') ? (
              <textarea className="textarea" value={settings[f.key] || ''} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })} style={{ minHeight: 80 }} />
            ) : (
              <input className="input" value={settings[f.key] || ''} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
