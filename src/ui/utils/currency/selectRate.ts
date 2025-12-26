import type { Currency } from "../types/Currency";
import type { Rates } from "../types/Rates";

export function selectRate(currency: Currency, rates: Rates): number {
  return rates[currency as keyof Rates] ?? 0;
}
