import prisma from '@/lib/prisma';
import PricingManager from '@/components/admin/PricingManager';

export default async function AdminPricingPage() {
  const plans = await prisma.pricingPlan.findMany({ orderBy: { sortOrder: 'asc' } });
  const serialized = plans.map(p => {
    let feats = [];
    try { feats = JSON.parse(p.features); } catch (e) {}
    return {
      ...p,
      features: Array.isArray(feats) ? feats : []
    };
  });
  return <PricingManager plans={serialized} />;
}
