import { useState, useEffect } from "react";

import { selectRate } from "./utils/currency/selectRate";

import type { Currency } from "./utils/types/Currency";

import { CurrencyRateDisplay } from "./components/CurrencyRateDisplay";
import { SalaryInput } from "./components/SalaryInput";
import { SalaryResultField } from "./components/SalaryResultField";
import { Header } from "./components/Header";

function App() {
  const [salary, setSalary] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [euroRate, setEuroRate] = useState<number>(0);
  const [usdRate, setUsdRate] = useState<number>(0);
  const [gbpRate, setGbpRate] = useState<number>(0);

  const RATES = {
    EUR: euroRate,
    USD: usdRate,
    GBP: gbpRate,
  };

  useEffect(() => {
    const unsub = window.electron.subscribeBNRCourseRate((rates) => {
      setEuroRate(rates.euroRate);
      setUsdRate(rates.usdRate);
      setGbpRate(rates.gbpRate);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl pt-16">
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Calculator Salariu BRUT
          </h1>
          <p className="text-gray-400 text-lg">
            Calculează salariul brut pornind de la salariul NET
          </p>
          <CurrencyRateDisplay
            currency={currency}
            rate={selectRate(currency, RATES)}
            onCurrencyChange={setCurrency}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-start-2 backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Introdu salariul NET Lunar in RON
              </h2>
            </div>
            <SalaryInput value={salary} onChange={setSalary} />
          </div>
        </div>

        {salary > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl">🏦</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Rezultate RON
                </h2>
              </div>
              <SalaryResultField
                value={salary}
                currency={currency}
                rate={selectRate(currency, RATES)}
                showOnly="ron"
              />
            </div>
            <div className="lg:col-start-3 backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl">💱</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">
                  Rezultate {currency}
                </h2>
              </div>
              <SalaryResultField
                value={salary}
                currency={currency}
                rate={selectRate(currency, RATES)}
                showOnly="currency"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
