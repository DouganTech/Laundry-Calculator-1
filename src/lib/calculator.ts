/* Rumus perhitungan berat ditagih (BL-01) dan total estimasi biaya layanan serta add-on (BL-02). */

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  type MainService,
  type ServiceCode,
} from '../config';

export interface OrderCalculationInput {
  serviceCode: ServiceCode;
  actualWeight: number | null;
  deliveryActive: boolean;
  fragranceActive: boolean;
}

export interface OrderCalculationResult {
  service: MainService;
  actualWeight: number;
  hasValidWeight: boolean;
  billedWeight: number;
  isMinimumChargeApplied: boolean;
  mainCost: number;
  deliveryCost: number;
  fragranceCost: number;
  addOnTotal: number;
  totalEstimate: number;
}

export const MIN_VALID_WEIGHT_KG = 0.1;

export function calculateOrder(input: OrderCalculationInput): OrderCalculationResult {
  const service =
    MAIN_SERVICES.find((item) => item.code === input.serviceCode) ?? MAIN_SERVICES[0];
  const deliveryAddon = ADD_ONS.find((item) => item.code === 'T01');
  const fragranceAddon = ADD_ONS.find((item) => item.code === 'T02');

  const actualWeight =
    input.actualWeight !== null && Number.isFinite(input.actualWeight)
      ? input.actualWeight
      : 0;
  const hasValidWeight = actualWeight >= MIN_VALID_WEIGHT_KG;

  const billedWeight = hasValidWeight
    ? Math.max(STORE_INFO.minimum_charge_kg, actualWeight)
    : 0;

  const isMinimumChargeApplied =
    hasValidWeight && actualWeight < STORE_INFO.minimum_charge_kg;

  const mainCost = hasValidWeight ? Math.round(billedWeight * service.price_per_kg) : 0;
  const deliveryCost = input.deliveryActive && deliveryAddon ? deliveryAddon.price : 0;
  const fragranceCost =
    hasValidWeight && input.fragranceActive && fragranceAddon
      ? Math.round(billedWeight * fragranceAddon.price)
      : 0;

  const addOnTotal = deliveryCost + fragranceCost;
  const totalEstimate = mainCost + addOnTotal;

  return {
    service,
    actualWeight,
    hasValidWeight,
    billedWeight,
    isMinimumChargeApplied,
    mainCost,
    deliveryCost,
    fragranceCost,
    addOnTotal,
    totalEstimate,
  };
}
