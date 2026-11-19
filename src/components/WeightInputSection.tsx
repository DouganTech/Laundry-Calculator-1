/* Komponen FT-02 untuk input estimasi berat cucian dan notifikasi otomatis minimum charge 3 kg. */

import type { RefObject } from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { STORE_INFO } from '../config';
import { formatWeight } from '../lib/format';

interface WeightInputSectionProps {
  weightInput: string;
  onWeightChange: (value: string) => void;
  isMinimumChargeApplied: boolean;
  billedWeight: number;
  hasValidWeight: boolean;
  error?: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

export function WeightInputSection({
  weightInput,
  onWeightChange,
  isMinimumChargeApplied,
  billedWeight,
  hasValidWeight,
  error,
  inputRef,
}: WeightInputSectionProps) {
  const minChargeText = formatWeight(STORE_INFO.minimum_charge_kg);

  return (
    <section
      aria-labelledby="heading-berat"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <h2 id="heading-berat" className="text-lg font-semibold text-neutral-900">
        Estimasi Berat Cucian
      </h2>

      <div className="mt-4">
        <label
          htmlFor="weight-input"
          className="block text-sm font-medium text-neutral-900"
        >
          Berat cucian Anda (kg)
        </label>

        <div className="relative mt-2">
          <input
            ref={inputRef}
            id="weight-input"
            name="weight"
            type="text"
            inputMode="decimal"
            value={weightInput}
            onChange={(e) => onWeightChange(e.target.value)}
            placeholder="Contoh: 2,5"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'weight-error' : 'weight-help'}
            className={`min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 pr-12 text-base tabular-nums text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              error ? 'border-red-600' : 'border-neutral-200'
            }`}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-neutral-600"
          >
            kg
          </span>
        </div>

        <p id="weight-help" className="mt-1.5 text-sm text-neutral-600">
          Minimal 0,1 kg, bisa pakai koma atau titik.
        </p>

        {error && (
          <div
            id="weight-error"
            role="alert"
            className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {isMinimumChargeApplied && (
          <div
            role="status"
            aria-live="polite"
            className="mt-3 flex items-start gap-2.5 rounded-xl bg-amber-50 px-3.5 py-3 text-sm text-amber-800"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Ketentuan minimum charge {minChargeText} berlaku. Berat ditagih menjadi{' '}
              <strong className="font-semibold tabular-nums">
                {formatWeight(billedWeight)}
              </strong>
              .
            </span>
          </div>
        )}

        {hasValidWeight && !isMinimumChargeApplied && (
          <p className="mt-3 text-sm text-neutral-600">
            Berat ditagih:{' '}
            <span className="font-semibold tabular-nums text-neutral-900">
              {formatWeight(billedWeight)}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
