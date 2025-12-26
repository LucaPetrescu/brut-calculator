const currencies = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

export function CurrencyIcon({ currency }: { currency: string }) {
  return (
    <span className="text-white text-sm font-bold">
      {currencies[currency as keyof typeof currencies]}
    </span>
  );
}
