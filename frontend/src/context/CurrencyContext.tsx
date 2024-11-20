import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type CurrencyContextProviderProps = {
  children: React.ReactNode;
};

export type CurrencyContextType = {
  currencySymbol: string;
  currencyHandler: (symbol: string) => void;
};

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const CurrencyContextProvider: React.FC<CurrencyContextProviderProps> = ({
  children,
}) => {
  const [currencySymbol, setCurrencySymbol] = useState<string>("€");

  useEffect(() => {
    const userCurrency = Cookies.get("user-currency");
    if (userCurrency) {
      setCurrencySymbol(userCurrency);
    }
  }, []);

  const currencyHandler = (symbol: string) => {
    setCurrencySymbol(symbol);
    Cookies.set("user-currency", symbol);
  };

  return (
    <CurrencyContext.Provider value={{ currencySymbol, currencyHandler }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContextProvider;
