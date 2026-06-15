export interface SalesAgent {
  name: string;
  displayPhone: string;
  whatsappPhone: string;
}

export const SALES_AGENTS: SalesAgent[] = [
  { name: 'Qing Yi',   displayPhone: '+60 12-426 8155', whatsappPhone: '60124268155' },
  { name: 'Gan',       displayPhone: '+60 12-680 1680', whatsappPhone: '60126801680' },
  { name: 'Alan Wong', displayPhone: '+60 12-301 0776', whatsappPhone: '60123010776' },
  { name: 'Zulaika',   displayPhone: '+60 12-864 8155', whatsappPhone: '60128648155' },
  { name: 'Rafidah',   displayPhone: '+60 12-901 8671', whatsappPhone: '60129018671' },
  { name: 'Afiqah',    displayPhone: '+60 12-266 9277', whatsappPhone: '60122669277' },
];

export function buildAgentWhatsAppUrl(
  whatsappPhone: string,
  message = 'Hi, I am interested in Parkland By The River',
): string {
  return `https://api.whatsapp.com/send/?phone=${whatsappPhone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}
