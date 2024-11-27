import { useContext } from "react";
import {
  CurrencyContext,
  CurrencyContextType,
} from "../context/CurrencyContext";

const useCurrencyContext = (): CurrencyContextType => {
  const currencyContext = useContext(CurrencyContext);
  if (!currencyContext) {
    throw new Error(
      "useCurrencyContext must be used within CurrencyContextProvider"
    );
  }
  return currencyContext;
};

export default useCurrencyContext;
