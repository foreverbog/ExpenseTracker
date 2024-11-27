import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type CurrencyContextProviderProps = {
  children: React.ReactNode;
};

export type CurrencyContextType = {
  currency: {
    code: string;
    symbol: string;
  };
  currencyHandler: (newCurrency: { code: string; symbol: string }) => void;
};

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const CurrencyContextProvider: React.FC<CurrencyContextProviderProps> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<{
    code: string;
    symbol: string;
  }>({ code: "EUR", symbol: "€" });

  useEffect(() => {
    const userCurrency = Cookies.get("user-currency");
    if (userCurrency) {
      setCurrency(JSON.parse(userCurrency));
    }
  }, []);

  const currencyHandler = (newCurrency: { code: string; symbol: string }) => {
    setCurrency(newCurrency);
    Cookies.set("user-currency", JSON.stringify(newCurrency), { expires: 365 });
  };

  return (
    <CurrencyContext.Provider value={{ currency, currencyHandler }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContextProvider;
