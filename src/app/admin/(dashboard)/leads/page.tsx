import prisma from '@/lib/prisma';
import LeadsInbox from '@/components/admin/LeadsInbox';

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
  return <LeadsInbox leads={JSON.parse(JSON.stringify(leads))} />;
}
