type CurrencyType = {
  code: string;
  symbol: string;
};

const mostUsedCurrencies: CurrencyType[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "RON", symbol: "lei" },
  { code: "JPY", symbol: "¥" },
  { code: "GBP", symbol: "£" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
  { code: "CHF", symbol: "CHF" },
  { code: "CNY", symbol: "¥" },
  { code: "HKD", symbol: "HK$" },
  { code: "NZD", symbol: "NZ$" },
  { code: "SEK", symbol: "kr" },
  { code: "KRW", symbol: "₩" },
  { code: "SGD", symbol: "S$" },
  { code: "NOK", symbol: "kr" },
  { code: "MXN", symbol: "$" },
  { code: "INR", symbol: "₹" },
  { code: "RUB", symbol: "₽" },
  { code: "ZAR", symbol: "R" },
  { code: "TRY", symbol: "₺" },
  { code: "BRL", symbol: "R$" },
];

export default mostUsedCurrencies;
