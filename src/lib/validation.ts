/* Fungsi validasi formulir pemesanan sebelum membuka tautan WhatsApp (BL-03). */

import { MIN_VALID_WEIGHT_KG } from './calculator';
import { parseDecimalInput } from './format';

export type OrderFieldKey = 'weight' | 'customerName' | 'pickupAddress';

export type OrderValidationErrors = Partial<Record<OrderFieldKey, string>>;

export interface OrderFormInput {
  weightInput: string;
  customerName: string;
  deliveryActive: boolean;
  pickupAddress: string;
}

export interface OrderValidationResult {
  isValid: boolean;
  errors: OrderValidationErrors;
  firstErrorField: OrderFieldKey | null;
}

export function validateOrderForm(input: OrderFormInput): OrderValidationResult {
  const errors: OrderValidationErrors = {};
  const parsedWeight = parseDecimalInput(input.weightInput);

  if (parsedWeight === null || parsedWeight <= 0) {
    errors.weight = 'Masukkan estimasi berat lebih dari 0 kg, contoh: 2,5';
  } else if (parsedWeight < MIN_VALID_WEIGHT_KG) {
    errors.weight = 'Estimasi berat minimal 0,1 kg, contoh: 0,5';
  }

  if (!input.customerName.trim()) {
    errors.customerName = 'Nama Anda wajib diisi, contoh: Budi Santoso';
  }

  if (input.deliveryActive && !input.pickupAddress.trim()) {
    errors.pickupAddress =
      'Alamat penjemputan wajib diisi jika memilih antar-jemput, contoh: Jl. Melati No. 12';
  }

  const orderedFields: OrderFieldKey[] = ['weight', 'customerName', 'pickupAddress'];
  const firstErrorField = orderedFields.find((field) => Boolean(errors[field])) ?? null;

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}
