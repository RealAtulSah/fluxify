import prisma from '@/lib/prisma';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About Us - Fluxify Media',
  description: 'The team behind your growth.',
};

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { sortOrder: 'asc' }
  });

  return <AboutClient team={team} />;
}
