import type { Currency } from "../utils/types/Currency";
import { CurrencyIcon } from "./CurrencyIcon";
import { CurrencySelector } from "./CurrencySelector";

interface CurrencyRateDisplayProps {
  currency: Currency;
  rate: number;
  lastUpdated?: Date;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencyRateDisplay({
  currency,
  rate,
  lastUpdated,
  onCurrencyChange,
}: CurrencyRateDisplayProps) {
  return (
    <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <CurrencySelector value={currency} onChange={onCurrencyChange} />
        <CurrencyIcon currency={currency} />
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-gray-400 text-sm">Curs BNR {currency}:</span>
        <span className="text-white text-xl font-bold">{rate.toFixed(2)}</span>
        <span className="text-gray-400 text-sm">RON</span>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-emerald-400 text-xs font-medium">LIVE</span>
      </div>
    </div>
  );
}
