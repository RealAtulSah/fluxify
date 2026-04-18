import prisma from '@/lib/prisma';
import LogosManager from '@/components/admin/LogosManager';

export default async function AdminLogosPage() {
  const logos = await prisma.clientLogo.findMany({ orderBy: { sortOrder: 'asc' } });
  return <LogosManager logos={JSON.parse(JSON.stringify(logos))} />;
}
