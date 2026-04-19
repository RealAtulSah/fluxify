import prisma from '@/lib/prisma';
import ServicesClient from './ServicesClient';

export default async function ServicesPage() {
  const [servicesData, plansData] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.pricingPlan.findMany({ orderBy: { sortOrder: 'asc' } })
  ]);

  const services = servicesData.map(s => {
    let feats = [];
    try { feats = JSON.parse(s.features || '[]'); } catch (e) {}
    return { ...s, features: Array.isArray(feats) ? feats : [] };
  });

  const plans = plansData.map(p => {
    let feats = [];
    try { feats = JSON.parse(p.features || '[]'); } catch (e) {}
    return { ...p, period: '/mo', features: Array.isArray(feats) ? feats : [] };
  });

  return <ServicesClient services={services} plans={plans} />;
}

