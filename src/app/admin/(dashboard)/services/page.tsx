import prisma from '@/lib/prisma';
import ServicesManager from '@/components/admin/ServicesManager';

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
  const serialized = services.map(s => {
    let feats = [];
    try { feats = JSON.parse(s.features || '[]'); } catch (e) {}
    return { ...s, features: Array.isArray(feats) ? feats : [] };
  });
  return <ServicesManager services={serialized} />;
}
