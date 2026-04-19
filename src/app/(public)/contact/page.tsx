import prisma from '@/lib/prisma';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us - Fluxify Media',
  description: 'Ready to amplify your brand? Fill out the form and we\'ll get back to you within 2 hours.',
};

export default async function ContactPage() {
  const settingsData = await prisma.siteSetting.findMany();
  const settings = settingsData.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>);

  return <ContactClient settings={settings} />;
}
