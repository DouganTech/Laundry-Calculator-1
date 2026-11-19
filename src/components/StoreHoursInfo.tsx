/* Komponen FT-07 untuk menampilkan info jam operasional toko dan jadwal penjemputan dari konfigurasi. */

import { STORE_INFO } from '../config';

export function StoreHoursInfo() {
  return (
    <div
      aria-label="Jam operasional toko"
      className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600"
    >
      <span>
        Buka Senin - Jumaat{' '}
        <span className="font-medium tabular-nums text-neutral-900">
          {STORE_INFO.opening_hours}
        </span>
      </span>
      <span aria-hidden="true" className="hidden text-neutral-400 sm:inline">
        /
      </span>
      <span>
        Jadwal jemput{' '}
        <span className="font-medium tabular-nums text-neutral-900">
          {STORE_INFO.pickup_hours}
        </span>
      </span>
    </div>
  );
}
