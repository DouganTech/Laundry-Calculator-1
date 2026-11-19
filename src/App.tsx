/* Halaman utama aplikasi LaundryCalc yang menggabungkan katalog layanan, kalkulator berat, add-on, form pemesan, dan ringkasan biaya WhatsApp. */

import { type MouseEvent, useMemo, useRef, useState } from 'react';
import { AddOnSection } from './components/AddOnSection';
import { CustomerFormSection } from './components/CustomerFormSection';
import { PriceSummaryBar } from './components/PriceSummaryBar';
import { ServiceCatalog } from './components/ServiceCatalog';
import { StoreHoursInfo } from './components/StoreHoursInfo';
import { WeightInputSection } from './components/WeightInputSection';
import { ESTIMATION_DISCLAIMER, MAIN_SERVICES, type ServiceCode } from './config';
import { calculateOrder } from './lib/calculator';
import { parseDecimalInput } from './lib/format';
import {
  type OrderFieldKey,
  type OrderValidationErrors,
  validateOrderForm,
} from './lib/validation';
import { buildWhatsAppUrl } from './lib/whatsapp';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] = useState<ServiceCode>(
    MAIN_SERVICES[0].code
  );
  const [weightInput, setWeightInput] = useState('');
  const [deliveryActive, setDeliveryActive] = useState(false);
  const [fragranceActive, setFragranceActive] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<OrderValidationErrors>({});

  const weightRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLTextAreaElement | null>(null);

  const parsedWeight = useMemo(
    () => parseDecimalInput(weightInput),
    [weightInput]
  );

  const calculation = useMemo(
    () =>
      calculateOrder({
        serviceCode: selectedServiceCode,
        actualWeight: parsedWeight,
        deliveryActive,
        fragranceActive,
      }),
    [selectedServiceCode, parsedWeight, deliveryActive, fragranceActive]
  );

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({
        customerName,
        pickupAddress,
        notes,
        deliveryActive,
        fragranceActive,
        calculation,
      }),
    [
      customerName,
      pickupAddress,
      notes,
      deliveryActive,
      fragranceActive,
      calculation,
    ]
  );

  const clearFieldError = (field: OrderFieldKey) => {
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const focusField = (field: OrderFieldKey | null) => {
    if (field === 'weight') {
      weightRef.current?.focus();
    } else if (field === 'customerName') {
      nameRef.current?.focus();
    } else if (field === 'pickupAddress') {
      addressRef.current?.focus();
    }
  };

  const handleSubmitClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const result = validateOrderForm({
      weightInput,
      customerName,
      deliveryActive,
      pickupAddress,
    });

    if (!result.isValid) {
      event.preventDefault();
      setErrors(result.errors);
      focusField(result.firstErrorField);
      return;
    }

    setErrors({});
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            LaundryCalc
          </h1>
          <p className="mt-1 text-sm text-neutral-600">
            Hitung estimasi biaya cucian Anda dan kirim pesanan ke WhatsApp.
          </p>
          <StoreHoursInfo />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-6 pb-28 sm:px-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-8 lg:pb-12">
        <div className="space-y-6 lg:col-span-7">
          <ServiceCatalog
            selectedServiceCode={selectedServiceCode}
            onSelectService={setSelectedServiceCode}
          />

          <WeightInputSection
            weightInput={weightInput}
            onWeightChange={(value) => {
              setWeightInput(value);
              clearFieldError('weight');
            }}
            isMinimumChargeApplied={calculation.isMinimumChargeApplied}
            billedWeight={calculation.billedWeight}
            hasValidWeight={calculation.hasValidWeight}
            error={errors.weight}
            inputRef={weightRef}
          />

          <AddOnSection
            deliveryActive={deliveryActive}
            fragranceActive={fragranceActive}
            onToggleDelivery={(checked) => {
              setDeliveryActive(checked);
              if (!checked) {
                clearFieldError('pickupAddress');
              }
            }}
            onToggleFragrance={setFragranceActive}
            fragranceCost={calculation.fragranceCost}
            hasValidWeight={calculation.hasValidWeight}
          />

          <CustomerFormSection
            customerName={customerName}
            pickupAddress={pickupAddress}
            notes={notes}
            deliveryActive={deliveryActive}
            onCustomerNameChange={(value) => {
              setCustomerName(value);
              clearFieldError('customerName');
            }}
            onPickupAddressChange={(value) => {
              setPickupAddress(value);
              clearFieldError('pickupAddress');
            }}
            onNotesChange={setNotes}
            errors={errors}
            nameRef={nameRef}
            addressRef={addressRef}
          />

          <p className="px-1 text-sm text-neutral-600 lg:hidden">
            {ESTIMATION_DISCLAIMER}
          </p>
        </div>

        <div className="lg:col-span-5">
          <PriceSummaryBar
            calculation={calculation}
            deliveryActive={deliveryActive}
            fragranceActive={fragranceActive}
            whatsappUrl={whatsappUrl}
            onSubmitClick={handleSubmitClick}
          />
        </div>
      </main>
    </div>
  );
}
