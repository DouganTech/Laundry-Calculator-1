/* Komponen FT-01 untuk menampilkan katalog paket layanan utama dalam bentuk kartu radio. */

import { Clock } from 'lucide-react';
import { MAIN_SERVICES, type ServiceCode } from '../config';
import { formatRupiah } from '../lib/format';

interface ServiceCatalogProps {
  selectedServiceCode: ServiceCode;
  onSelectService: (code: ServiceCode) => void;
}

export function ServiceCatalog({
  selectedServiceCode,
  onSelectService,
}: ServiceCatalogProps) {
  return (
    <section aria-labelledby="heading-layanan">
      <div className="mb-3">
        <h2 id="heading-layanan" className="text-lg font-semibold text-neutral-900">
          Pilih Layanan Utama
        </h2>
      </div>

      <div role="radiogroup" aria-labelledby="heading-layanan" className="space-y-3">
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedServiceCode;
          return (
            <label
              key={service.code}
              className={`flex min-h-[44px] cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <input
                type="radio"
                name="main_service"
                value={service.code}
                checked={isSelected}
                onChange={() => onSelectService(service.code)}
                className="sr-only"
              />

              <span
                aria-hidden="true"
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-150 ease-out motion-reduce:transition-none ${
                  isSelected ? 'border-blue-700 bg-blue-700' : 'border-neutral-400 bg-white'
                }`}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-base font-semibold text-neutral-900">
                    {service.name}
                  </span>
                  <span className="text-base font-semibold tabular-nums text-blue-700">
                    {formatRupiah(service.price_per_kg)} / kg
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-neutral-600">
                  <Clock className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
                  <span className="tabular-nums">
                    Estimasi {service.duration_days} hari
                  </span>
                </div>

                <p className="mt-1.5 text-sm text-neutral-600">{service.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
