import prisma from '@/lib/prisma';
import ServicesClient from './ServicesClient';

export default async function ServicesPage() {
  const [servicesData, plansData] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.pricingPlan.findMany({ orderBy: { sortOrder: 'asc' } })
  ]);

  const services = servicesData.map(s => ({
    ...s,
    features: JSON.parse(s.features || '[]')
  }));

  const plans = plansData.map(p => ({
    ...p,
    period: '/mo', // Static period for now
    features: JSON.parse(p.features || '[]')
  }));

  return <ServicesClient services={services} plans={plans} />;
}

