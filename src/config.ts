/* Data bisnis resmi dari PRD Bagian 11 beserta tipe konfigurasi dan teks wajib aplikasi. */

export type ServiceCode = 'L01' | 'L02' | 'L03';
export type AddOnCode = 'T01' | 'T02';
export type AddOnCalculationType = 'flat' | 'per_billed_kg';

export interface StoreInfo {
  readonly name: string;
  readonly whatsapp_number: string;
  readonly opening_hours: string;
  readonly pickup_hours: string;
  readonly pickup_radius_max_km: number;
  readonly minimum_charge_kg: number;
}

export interface MainService {
  readonly code: ServiceCode;
  readonly name: string;
  readonly price_per_kg: number;
  readonly duration_days: number;
  readonly description: string;
}

export interface AddOnService {
  readonly code: AddOnCode;
  readonly name: string;
  readonly price: number;
  readonly calculation_type: AddOnCalculationType;
  readonly notes: string;
}

export const STORE_INFO: StoreInfo = {
  name: 'Laundry UMKM',
  whatsapp_number: '628xxxxxxxxxx',
  opening_hours: '08:00 - 20:00 WIB',
  pickup_hours: '09:00 - 17:00 WIB',
  pickup_radius_max_km: 5,
  minimum_charge_kg: 3.0,
};

export const MAIN_SERVICES: readonly MainService[] = [
  {
    code: 'L01',
    name: 'Cuci Lipat',
    price_per_kg: 6000,
    duration_days: 3,
    description: 'Dicuci, dikeringkan, dilipat tanpa setrika (Min. charge 3 kg)',
  },
  {
    code: 'L02',
    name: 'Cuci Setrika',
    price_per_kg: 8000,
    duration_days: 3,
    description: 'Dicuci, disetrika, dilipat rapi (Min. charge 3 kg)',
  },
  {
    code: 'L03',
    name: 'Cuci Setrika Ekspres',
    price_per_kg: 15000,
    duration_days: 1,
    description: 'Sama dengan Cuci Setrika, selesai besok (Min. charge 3 kg)',
  },
];

export const ADD_ONS: readonly AddOnService[] = [
  {
    code: 'T01',
    name: 'Antar-Jemput',
    price: 10000,
    calculation_type: 'flat',
    notes: 'Area penjemputan radius max 5 km',
  },
  {
    code: 'T02',
    name: 'Pewangi Premium',
    price: 2000,
    calculation_type: 'per_billed_kg',
    notes: 'Aroma mewah pilihan tahan lama (Downy Passion / Mystique)',
  },
];

export const ESTIMATION_DISCLAIMER =
  'Total di atas adalah estimasi awal. Berat pasti akan ditimbang kembali saat pakaian diterima oleh kasir/kurir laundry.';
