import prisma from '@/lib/prisma';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const [services, caseStudies, logos, settingsData] = await Promise.all([
    prisma.service.findMany({ orderBy: { sortOrder: 'asc' }, take: 6 }),
    prisma.caseStudy.findMany({ where: { published: true }, orderBy: { sortOrder: 'asc' }, take: 3 }),
    prisma.clientLogo.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.siteSetting.findMany()
  ]);

  const settings = settingsData.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>);

  return (
    <HomeClient 
      services={services} 
      caseStudies={caseStudies} 
      logos={logos} 
      settings={settings} 
    />
  );
}
