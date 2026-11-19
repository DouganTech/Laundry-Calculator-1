/* Komponen FT-03 untuk pilihan layanan tambahan Antar-Jemput dan Pewangi Premium. */

import { Check } from 'lucide-react';
import { ADD_ONS } from '../config';
import { formatRupiah } from '../lib/format';

interface AddOnSectionProps {
  deliveryActive: boolean;
  fragranceActive: boolean;
  onToggleDelivery: (checked: boolean) => void;
  onToggleFragrance: (checked: boolean) => void;
  fragranceCost: number;
  hasValidWeight: boolean;
}

export function AddOnSection({
  deliveryActive,
  fragranceActive,
  onToggleDelivery,
  onToggleFragrance,
  fragranceCost,
  hasValidWeight,
}: AddOnSectionProps) {
  return (
    <section
      aria-labelledby="heading-addon"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <h2 id="heading-addon" className="text-lg font-semibold text-neutral-900">
        Layanan Tambahan
      </h2>

      <div className="mt-3 divide-y divide-neutral-200">
        {ADD_ONS.map((addon) => {
          const isDelivery = addon.code === 'T01';
          const checked = isDelivery ? deliveryActive : fragranceActive;
          const onToggle = isDelivery ? onToggleDelivery : onToggleFragrance;

          const priceLabel =
            addon.calculation_type === 'flat'
              ? `+${formatRupiah(addon.price)}`
              : `+${formatRupiah(addon.price)} / kg ditagih`;

          return (
            <label
              key={addon.code}
              className="flex min-h-[44px] cursor-pointer items-start gap-3 py-3.5 first:pt-2 last:pb-1 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700"
            >
              <input
                type="checkbox"
                name={`addon_${addon.code.toLowerCase()}`}
                checked={checked}
                onChange={(e) => onToggle(e.target.checked)}
                className="sr-only"
              />

              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ease-out motion-reduce:transition-none ${
                  checked
                    ? 'border-blue-700 bg-blue-700 text-white'
                    : 'border-neutral-300 bg-white text-transparent'
                }`}
              >
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-base font-medium text-neutral-900">
                    {addon.name}
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-blue-700">
                    {priceLabel}
                  </span>
                </div>

                <p className="mt-1 text-sm text-neutral-600">{addon.notes}</p>

                {!isDelivery && checked && hasValidWeight && (
                  <p className="mt-1 text-sm font-medium tabular-nums text-neutral-900">
                    Tambahan pewangi: {formatRupiah(fragranceCost)}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
