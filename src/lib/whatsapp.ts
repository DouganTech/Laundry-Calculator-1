/* Pembuat pesan template WhatsApp resmi PRD dan URL deep-link https://wa.me (BL-03). */

import { ESTIMATION_DISCLAIMER, STORE_INFO } from '../config';
import type { OrderCalculationResult } from './calculator';
import { formatNumberId, formatWeightValue } from './format';

export interface WhatsAppOrderParams {
  customerName: string;
  pickupAddress: string;
  notes: string;
  deliveryActive: boolean;
  fragranceActive: boolean;
  calculation: OrderCalculationResult;
}

export function buildWhatsAppMessage(params: WhatsAppOrderParams): string {
  const cleanName = params.customerName.trim();
  const cleanAddress = params.deliveryActive
    ? params.pickupAddress.trim()
    : 'Antar Sendiri ke Toko';
  const cleanNotes = params.notes.trim() || '-';

  const actualWeightText = formatWeightValue(params.calculation.actualWeight);
  const billedWeightText = formatWeightValue(params.calculation.billedWeight);

  const deliveryText = params.deliveryActive
    ? `Ya (+Rp ${formatNumberId(params.calculation.deliveryCost)})`
    : 'Tidak';

  const fragranceText = params.fragranceActive
    ? `Ya (+Rp ${formatNumberId(params.calculation.fragranceCost)})`
    : 'Tidak';

  const totalText = formatNumberId(params.calculation.totalEstimate);

  const disclaimerBody = ESTIMATION_DISCLAIMER.replace(/\.$/, '');

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${cleanName}`,
    `*Layanan Utama:* ${params.calculation.service.name}`,
    `*Estimasi Berat:* ${actualWeightText} kg (Berat Ditagih: ${billedWeightText} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${deliveryText}`,
    `- Pewangi Premium: ${fragranceText}`,
    '',
    `*Alamat Penjemputan:* ${cleanAddress}`,
    `*Catatan Khusus:* ${cleanNotes}`,
    '',
    `*Estimasi Total Biaya:* *Rp ${totalText}*`,
    '',
    `_(Catatan: ${disclaimerBody})._`,
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

export function buildWhatsAppUrl(params: WhatsAppOrderParams): string {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${STORE_INFO.whatsapp_number}?text=${encodeURIComponent(message)}`;
}
