import prisma from '@/lib/prisma';
import ServicesManager from '@/components/admin/ServicesManager';

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: 'asc' } });
  return <ServicesManager services={JSON.parse(JSON.stringify(services))} />;
}
