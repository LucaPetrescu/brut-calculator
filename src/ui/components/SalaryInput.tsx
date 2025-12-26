interface SalaryInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function SalaryInput({ value, onChange }: SalaryInputProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="block text-gray-300 text-sm font-medium uppercase tracking-wide">
          Salariu NET Lunar in RON
        </label>
        <div className="relative group">
          <div className="relative flex items-center">
            <input
              type="number"
              value={value || ""}
              onChange={(e) => onChange(Number(e.target.value))}
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}
              className="w-full px-6 py-4 text-3xl font-bold rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder:text-gray-600"
            />
            <div className="absolute right-6 text-gray-400 text-lg font-semibold pointer-events-none">
              RON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
