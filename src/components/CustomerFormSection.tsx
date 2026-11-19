/* Komponen FT-05 untuk formulir data pemesan termasuk kolom alamat kondisional dan catatan khusus. */

import type { RefObject } from 'react';
import { AlertCircle } from 'lucide-react';
import type { OrderValidationErrors } from '../lib/validation';

interface CustomerFormSectionProps {
  customerName: string;
  pickupAddress: string;
  notes: string;
  deliveryActive: boolean;
  onCustomerNameChange: (value: string) => void;
  onPickupAddressChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  errors: OrderValidationErrors;
  nameRef: RefObject<HTMLInputElement | null>;
  addressRef: RefObject<HTMLTextAreaElement | null>;
}

export function CustomerFormSection({
  customerName,
  pickupAddress,
  notes,
  deliveryActive,
  onCustomerNameChange,
  onPickupAddressChange,
  onNotesChange,
  errors,
  nameRef,
  addressRef,
}: CustomerFormSectionProps) {
  return (
    <section
      aria-labelledby="heading-pemesan"
      className="rounded-2xl bg-white p-4 sm:p-6"
    >
      <h2 id="heading-pemesan" className="text-lg font-semibold text-neutral-900">
        Data Pemesan
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="customer-name"
            className="block text-sm font-medium text-neutral-900"
          >
            Nama Anda
          </label>
          <input
            ref={nameRef}
            id="customer-name"
            name="customerName"
            type="text"
            autoComplete="name"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={Boolean(errors.customerName)}
            aria-describedby={errors.customerName ? 'name-error' : undefined}
            className={`mt-2 min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              errors.customerName ? 'border-red-600' : 'border-neutral-200'
            }`}
          />
          {errors.customerName && (
            <div
              id="name-error"
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errors.customerName}</span>
            </div>
          )}
        </div>

        {deliveryActive ? (
          <div>
            <label
              htmlFor="pickup-address"
              className="block text-sm font-medium text-neutral-900"
            >
              Alamat Penjemputan
            </label>
            <textarea
              ref={addressRef}
              id="pickup-address"
              name="pickupAddress"
              autoComplete="street-address"
              rows={2}
              value={pickupAddress}
              onChange={(e) => onPickupAddressChange(e.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, Kos Putra"
              aria-invalid={Boolean(errors.pickupAddress)}
              aria-describedby={
                errors.pickupAddress ? 'address-error' : 'address-help'
              }
              className={`mt-2 min-h-[44px] w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                errors.pickupAddress ? 'border-red-600' : 'border-neutral-200'
              }`}
            />
            <p id="address-help" className="mt-1.5 text-sm text-neutral-600">
              Wajib diisi untuk layanan antar-jemput.
            </p>
            {errors.pickupAddress && (
              <div
                id="address-error"
                role="alert"
                className="mt-2 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{errors.pickupAddress}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">
            Lokasi pengantaran: <span className="font-medium text-neutral-900">Antar Sendiri ke Toko</span>.
          </p>
        )}

        <div>
          <label
            htmlFor="order-notes"
            className="block text-sm font-medium text-neutral-900"
          >
            Catatan Khusus (Opsional)
          </label>
          <textarea
            id="order-notes"
            name="notes"
            rows={2}
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Contoh: Pisahkan baju putih"
            className="mt-2 min-h-[44px] w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
        </div>
      </div>
    </section>
  );
}
