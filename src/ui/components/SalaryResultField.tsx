import { calculateSalary } from "../utils/salary/calculateSalary";
import type { Currency } from "../utils/types/Currency";

interface SalaryResultFieldProps {
  value: number;
  rate: number;
  currency: Currency;
  showOnly?: "ron" | "currency";
}

export function SalaryResultField({
  value,
  rate,
  currency,
  showOnly,
}: SalaryResultFieldProps) {
  const { grossSalary, netSalary } = calculateSalary(value, rate);

  const {
    netSalaryInRonPerYear,
    netSalaryInRonPerMonth,
    netSalaryInCurrencyPerYear,
    netSalaryInCurrencyPerMonth,
  } = netSalary;

  const {
    grossSalaryInRonPerYear,
    grossSalaryInRonPerMonth,
    grossSalaryInCurrencyPerYear,
    grossSalaryInCurrencyPerMonth,
  } = grossSalary;

  return (
    <div className="space-y-6">
      {/* RON Column */}
      {(!showOnly || showOnly === "ron") && (
        <div className="space-y-3">
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu NET Anual in RON
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {netSalaryInRonPerYear.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                RON
              </div>
            </div>
          </div>
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu NET Lunar in RON
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {netSalaryInRonPerMonth.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                RON
              </div>
            </div>
          </div>
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu BRUT Anual in RON
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {grossSalaryInRonPerYear.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                RON
              </div>
            </div>
          </div>
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu BRUT Lunar in RON
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {grossSalaryInRonPerMonth.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                RON
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Currency Column */}
      {(!showOnly || showOnly === "currency") && (
        <div className="space-y-3">
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu NET Anual in {currency}
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {netSalaryInCurrencyPerYear.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                {currency}
              </div>
            </div>
          </div>
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu NET Lunar in {currency}
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {netSalaryInCurrencyPerMonth.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                {currency}
              </div>
            </div>
          </div>
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu BRUT Anual in {currency}
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {grossSalaryInCurrencyPerYear.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                {currency}
              </div>
            </div>
          </div>
          <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
            Salariu BRUT Lunar in {currency}
          </label>
          <div className="relative group">
            <div className="relative flex items-center">
              <div className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 transition-all duration-300">
                {grossSalaryInCurrencyPerMonth.toLocaleString("ro-RO", {
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
                {currency}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
