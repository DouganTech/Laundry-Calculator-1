/* Komponen FT-04 dan FT-06 untuk ringkasan biaya mengambang di ponsel, panel ringkasan di desktop, dan tombol kirim WhatsApp. */

import { type MouseEvent, useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { ESTIMATION_DISCLAIMER } from '../config';
import type { OrderCalculationResult } from '../lib/calculator';
import { formatRupiah, formatWeight } from '../lib/format';

interface PriceSummaryBarProps {
  calculation: OrderCalculationResult;
  deliveryActive: boolean;
  fragranceActive: boolean;
  whatsappUrl: string;
  onSubmitClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function PriceSummaryBar({
  calculation,
  deliveryActive,
  fragranceActive,
  whatsappUrl,
  onSubmitClick,
}: PriceSummaryBarProps) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const breakdownRows = (
    <dl className="space-y-2 text-sm">
      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-neutral-600">
          {calculation.service.name}
          {calculation.hasValidWeight
            ? ` (${formatWeight(calculation.billedWeight)})`
            : ''}
        </dt>
        <dd className="font-medium tabular-nums text-neutral-900">
          {formatRupiah(calculation.mainCost)}
        </dd>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <dt className="text-neutral-600">
          Biaya Tambahan
          {(deliveryActive || fragranceActive) && (
            <span className="block text-sm text-neutral-500">
              {[
                deliveryActive ? 'Antar-Jemput' : null,
                fragranceActive ? 'Pewangi Premium' : null,
              ]
                .filter(Boolean)
                .join(', ')}
            </span>
          )}
        </dt>
        <dd className="font-medium tabular-nums text-neutral-900">
          {formatRupiah(calculation.addOnTotal)}
        </dd>
      </div>
    </dl>
  );

  return (
    <>
      {/* Panel ringkasan untuk layar desktop */}
      <aside
        aria-label="Ringkasan Biaya"
        className="hidden lg:sticky lg:top-6 lg:block lg:rounded-2xl lg:bg-white lg:p-6"
      >
        <h2 className="text-lg font-semibold text-neutral-900">Ringkasan Biaya</h2>

        <div className="mt-4 border-b border-neutral-200 pb-4">{breakdownRows}</div>

        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="text-base font-semibold text-neutral-900">
            Total Estimasi
          </span>
          <span className="text-3xl font-semibold tabular-nums text-neutral-900">
            {formatRupiah(calculation.totalEstimate)}
          </span>
        </div>

        <p className="mt-3 text-sm text-neutral-600">{ESTIMATION_DISCLAIMER}</p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSubmitClick}
          className="mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-base font-semibold text-white transition-colors duration-150 ease-out hover:bg-blue-800 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">Kirim ke WhatsApp</span>
        </a>
      </aside>

      {/* Bilah ringkasan menempel di bawah layar untuk ponsel */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mx-auto max-w-2xl px-4 py-3">
          {mobileExpanded && (
            <div className="mb-3 border-b border-neutral-200 pb-3">
              {breakdownRows}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <button
                type="button"
                onClick={() => setMobileExpanded((prev) => !prev)}
                aria-expanded={mobileExpanded}
                className="flex min-h-[44px] items-center gap-1.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <div>
                  <span className="block text-sm text-neutral-600">
                    Total Estimasi
                  </span>
                  <span className="block text-xl font-semibold tabular-nums text-neutral-900">
                    {formatRupiah(calculation.totalEstimate)}
                  </span>
                </div>
                {mobileExpanded ? (
                  <ChevronDown className="h-5 w-5 shrink-0 text-neutral-600" aria-hidden="true" />
                ) : (
                  <ChevronUp className="h-5 w-5 shrink-0 text-neutral-600" aria-hidden="true" />
                )}
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSubmitClick}
              className="flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-blue-800 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">Kirim ke WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
