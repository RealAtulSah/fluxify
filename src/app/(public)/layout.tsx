import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AuditPopup from '@/components/AuditPopup';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settingsData = await prisma.siteSetting.findMany();
  const settings = settingsData.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as Record<string, string>);

  return (
    <>
      <Navbar settings={settings} />
      <main style={{ paddingTop: 'var(--nav-height)' }}>{children}</main>
      <Footer settings={settings} />
      <WhatsAppButton phone={settings.whatsapp_number} />
      <AuditPopup />
    </>
  );
}
