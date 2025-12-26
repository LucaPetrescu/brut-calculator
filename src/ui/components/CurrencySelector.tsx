import type { Currency } from "../utils/types/Currency";

interface CurrencySelectorProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition duration-300">
        <div className="absolute -inset-0.5 bg-gray-800/50 rounded-xl blur transition duration-300">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as Currency)}
            className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder:text-gray-600"
          >
            <option value="EUR">€ EUR</option>
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
          </select>
        </div>
      </div>
    </div>
  );
}
