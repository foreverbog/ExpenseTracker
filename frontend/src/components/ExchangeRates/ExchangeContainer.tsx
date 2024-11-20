import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaExchangeAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";
// import useCurrencyContext from "../../hooks/useCurrencyContext";

type ApiResponseType = {
  [key: string]: { [currencyCode: string]: number };
};

type RatesType = {
  [currencyCode: string]: number;
};

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

const ExchangeContainer = () => {
  const { t } = useTranslation("global");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [rates, setRates] = useState<RatesType>({});
  const [baseCurrency, setBaseCurrency] = useState<string>("eur");
  const [targetCurrency, setTargetCurrency] = useState<string>("usd");
  const [amount, setAmount] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    baseCurrency: false,
    targetCurrency: false,
  });

  // const { currencySymbol, currencyHandler } = useCurrencyContext();

  //*URL FOR THE EXCHANGE RATES API
  const EXCHANGE_API_URL = import.meta.env.VITE_API_EXCHANGERATES;

  const { apiData } = useFetch<ApiResponseType>(
    `${EXCHANGE_API_URL}/${baseCurrency}.json`
  );
  //   console.log(apiData);
  useEffect(() => {
    if (apiData && apiData[baseCurrency]) {
      setRates(apiData[baseCurrency]);
    }
  }, [apiData, baseCurrency]);
  console.log(rates);

  const handleChangeBaseCurrency = (currency: string) => {
    setBaseCurrency(currency.toLowerCase());
    setIsDropdownOpen((prev) => ({ ...prev, baseCurrency: !prev }));
  };
  const handleChangeTargetCurrency = (currency: string) => {
    setTargetCurrency(currency.toLowerCase());
    setIsDropdownOpen((prev) => ({ ...prev, targetCurrency: !prev }));
  };

  return (
    <>
      <div className="flex justify-around items-center w-full lg:w-2/4 xl:w-1/4  mx-auto mt-24 font-base text-base-text">
        {/* //*BASE CURRENCY */}
        <div className="relative">
          <div
            className={` rounded-md p-2 md:p-2.5 border border-primary flex items-center justify-center bg-base-100 cursor-pointer  w-[80px] md:min-w-[109px] text-sm md:text-lg ${
              isDropdownOpen.baseCurrency && " rounded-b-none"
            }`}
            onClick={() => {
              setIsDropdownOpen((prev) => ({
                baseCurrency: !prev.baseCurrency,
                targetCurrency: false,
              }));
            }}
          >
            <p>{baseCurrency.toUpperCase()}</p>
            <IoMdArrowDropdown
              className={`text-text text-normal md:text-lg  transition-transform duration-500 ease-in-out ${
                isDropdownOpen.baseCurrency && "rotate-180"
              } `}
            />
          </div>
          <AnimatePresence>
            {isDropdownOpen.baseCurrency && !isDropdownOpen.targetCurrency && (
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: isSmallScreen ? "350px" : "400px",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
                exit={{ height: 0, transition: { duration: 0.3 } }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                }}
                className="absolute w-full  left-0 bg-base-200 rounded-b-md border-b border-b-primary border-x border-x-primary top-full flex flex-col  divide-y divide-primary drop-shadow-2xl z-50 overflow-hidden"
              >
                {mostUsedCurrencies.map((currency) => (
                  <div
                    key={currency.code}
                    onClick={() => handleChangeBaseCurrency(currency.code)}
                    className={`text-center p-2 md:p-2.5 cursor-pointer hover:bg-base-300 transition-colors duration-300 ease-in-out text-xs md:text-normal ${
                      baseCurrency.toUpperCase() === currency.code &&
                      "bg-primary text-primary-text hover:bg-primary"
                    }`}
                  >
                    {currency.code}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <FaExchangeAlt className="text-xl" />

        {/* //*TARGET CURRENCY */}
        <div className="relative">
          <div
            className={` rounded-md p-2 md:p-2.5 border border-primary flex items-center justify-center bg-base-100 cursor-pointer  w-[80px] md:min-w-[109px] text-sm md:text-lg ${
              isDropdownOpen.targetCurrency && " rounded-b-none"
            }`}
            onClick={() => {
              setIsDropdownOpen((prev) => ({
                targetCurrency: !prev.targetCurrency,
                baseCurrency: false,
              }));
            }}
          >
            <p>{targetCurrency.toUpperCase()}</p>
            <IoMdArrowDropdown
              className={`text-text text-normal md:text-lg  transition-transform duration-500 ease-in-out ${
                isDropdownOpen.targetCurrency && "rotate-180"
              } `}
            />
          </div>
          <AnimatePresence>
            {isDropdownOpen.targetCurrency && !isDropdownOpen.baseCurrency && (
              <motion.div
                initial={{ height: 0 }}
                animate={{
                  height: isSmallScreen ? "350px" : "400px",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
                exit={{ height: 0, transition: { duration: 0.3 } }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                }}
                className="absolute w-full  left-0 bg-base-200 rounded-b-md border-b border-b-primary border-x border-x-primary top-full flex flex-col  divide-y divide-primary drop-shadow-2xl z-50 overflow-hidden"
              >
                {mostUsedCurrencies.map((currency) => (
                  <div
                    key={currency.code}
                    onClick={() => handleChangeTargetCurrency(currency.code)}
                    className={`text-center p-2 md:p-2.5 cursor-pointer hover:bg-base-300 transition-colors duration-300 ease-in-out text-xs md:text-normal ${
                      targetCurrency.toUpperCase() === currency.code &&
                      "bg-primary text-primary-text hover:bg-primary"
                    }`}
                  >
                    {currency.code}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* //*FLEX for the input and the currency exchange text */}
      <div className="flex flex-col justify-center w-full gap-4 mt-24 font-base text-base-text z-20">
        <label htmlFor="amount" className="mx-auto md:text-lg">
          {t("exchange.inputLabel")}
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.target.value))
          }
          value={amount}
          className="inputStyle bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mx-auto text-center placeholder:text-center text-xl"
        />
        <div className="flex mt-8 mx-auto">
          <p className="text-2xl font-semibold">
            {(rates[baseCurrency] * amount).toFixed(0)}{" "}
            {baseCurrency.toUpperCase()} (
            {mostUsedCurrencies.find(
              (currency) => currency.code === baseCurrency.toUpperCase()
            )?.symbol || ""}
            )
          </p>
          <p className="text-2xl font-semibold  mx-4"> = </p>
          <p className="text-2xl font-semibold">
            {(rates[targetCurrency] * amount).toFixed(2)}{" "}
            {targetCurrency.toUpperCase()} (
            {mostUsedCurrencies.find(
              (currency) => currency.code === targetCurrency.toUpperCase()
            )?.symbol || ""}
            )
          </p>
        </div>
      </div>

      {/* //*MOCKUP BTN FOR STORING THE USER CURRENCY */}
      {/* <button
        onClick={() => {
          currencyHandler("€");
      }}
        className="pl-24 font-semibold cursor-pointer mt-24 bg-red-700 rounded-md p-4"
      >
        €
      </button> */}
    </>
  );
};

export default ExchangeContainer;
