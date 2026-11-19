/* Fungsi pemformatan angka, Rupiah, berat cucian, dan pengurai input desimal di seluruh aplikasi. */

const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

const weightFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatNumberId(value: number): string {
  return rupiahFormatter.format(Math.round(value));
}

export function formatRupiah(amount: number): string {
  return `Rp ${formatNumberId(amount)}`;
}

export function formatWeight(weightKg: number): string {
  return `${weightFormatter.format(weightKg)} kg`;
}

export function formatWeightValue(weightKg: number): string {
  return weightFormatter.format(weightKg);
}

export function parseDecimalInput(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.replace(',', '.');
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}
