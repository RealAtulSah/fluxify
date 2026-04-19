import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AuditPopup from '@/components/AuditPopup';

export const dynamic = 'force-dynamic';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 'var(--nav-height)' }}>{children}</main>
      <Footer />
      <WhatsAppButton />
      <AuditPopup />
    </>
  );
}
