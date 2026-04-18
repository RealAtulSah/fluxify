import prisma from '@/lib/prisma';
import TeamManager from '@/components/admin/TeamManager';

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } });
  return <TeamManager members={JSON.parse(JSON.stringify(members))} />;
}
