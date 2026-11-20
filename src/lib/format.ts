import type { BranchPrices, Lang, LocalizedString, PassId } from "./types";

export function t(value: LocalizedString, lang: Lang): string {
  return value[lang];
}

export function formatBaht(amount: number): string {
  return `฿${amount.toLocaleString("en-US")}`;
}

export function getPassPrice(
  prices: BranchPrices,
  pass: PassId,
): number | null {
  return prices[pass];
}
