import prisma from '@/lib/prisma';
import PricingManager from '@/components/admin/PricingManager';

export default async function AdminPricingPage() {
  const plans = await prisma.pricingPlan.findMany({ orderBy: { sortOrder: 'asc' } });
  const serialized = plans.map(p => ({
    ...p,
    features: JSON.parse(p.features)
  }));
  return <PricingManager plans={serialized} />;
}
