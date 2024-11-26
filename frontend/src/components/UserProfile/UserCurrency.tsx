import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";

import { motion, AnimatePresence } from "framer-motion";
import mostUsedCurrencies from "../../utils/mostUsedCurrencies";
import useCurrencyContext from "../../hooks/useCurrencyContext";
import useMediaQuery from "../../hooks/useMediaQuery";

const UserCurrency = () => {
  const { t } = useTranslation("global");
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const { currency, currencyHandler } = useCurrencyContext();

  const currencyCode = currency.code;

  const [isCurrencyPrefOpen, setIsCurrencyPrefOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col font-base justify-center items-center text-base-text ">
      <div
        onClick={() => {
          setIsCurrencyPrefOpen((prev) => !prev);
          setIsDropdownOpen(false);
        }}
        className=" flex items-center border-b-2 border-base-300 text-lg text-center w-full "
      >
        <h1 className="flex-1 text-balance">{t("settings.currency")}</h1>
        <IoMdArrowDropdown
          className={`text-2xl transition-transform duration-500 ease-in-out  ${
            isCurrencyPrefOpen && "rotate-180"
          }`}
        />
      </div>
      <AnimatePresence>
        {isCurrencyPrefOpen && (
          <>
            <motion.h1
              initial={{ translateY: "-20px", opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{
                translateY: "-20px",
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              className="mt-4 text-xs text-center text-balance"
            >
              {t("settings.currencyInfo")}
            </motion.h1>
            <motion.div
              initial={{ translateY: "-20px", opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{
                translateY: "-20px",
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              className="relative mt-4"
            >
              <div
                className={` rounded-md p-2 md:p-2.5 border border-primary flex items-center justify-center bg-base-100 cursor-pointer  w-[80px] md:min-w-[109px] text-sm md:text-lg ${
                  isDropdownOpen && " rounded-b-none"
                }`}
                onClick={() => {
                  setIsDropdownOpen((prev) => !prev);
                }}
              >
                <p>{currency.code}</p>
                <IoMdArrowDropdown
                  className={`text-text text-normal md:text-lg  transition-transform duration-500 ease-in-out ${
                    isDropdownOpen && "rotate-180"
                  } `}
                />
              </div>

              {/* //*DROPDOWN ANIMATION */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: isSmallScreen ? "250px" : "400px",
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
                        onClick={() => {
                          currencyHandler(currency);
                          setIsDropdownOpen(false);
                        }}
                        className={`text-center p-2 md:p-2.5 cursor-pointer hover:bg-base-300 transition-colors duration-300 ease-in-out text-xs md:text-normal ${
                          currencyCode === currency.code &&
                          "bg-primary text-primary-text hover:bg-primary"
                        }  `}
                      >
                        {currency.code}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserCurrency;
