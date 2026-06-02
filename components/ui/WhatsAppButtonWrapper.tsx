import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { getSiteSettings, buildWhatsAppHref } from '@/lib/wordpress';

export default async function WhatsAppButtonWrapper() {
  const settings = await getSiteSettings();
  return <WhatsAppButton href={buildWhatsAppHref(settings)} />;
}
