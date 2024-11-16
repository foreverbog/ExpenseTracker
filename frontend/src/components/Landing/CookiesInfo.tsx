import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuCookie } from "react-icons/lu";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";

const CookiesInfo = () => {
  const { t } = useTranslation("global");
  const [isCookieAccepted, setIsCookieAccepted] = useState<boolean | null>(
    null
  );

  const handleAcceptCookies = () => {
    Cookies.set("cookies-accepted", "accepted");
    setIsCookieAccepted(true);
  };

  useEffect(() => {
    const acceptedCookies = Cookies.get("cookies-accepted");

    if (acceptedCookies) {
      setIsCookieAccepted(true);
    } else setIsCookieAccepted(false);
  }, []);
  if (isCookieAccepted === null) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isCookieAccepted && (
        <motion.div
          initial={{ scale: 0.5, translateX: "-50%", opacity: 0 }}
          animate={{ scale: 1, translateX: "-50%", opacity: 100 }}
          exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-1/2 bg-base border border-base-300 drop-shadow-2xl z-50 flex flex-col gap-4 p-4 w-full font-base text-base-text md:rounded-md md:w-2/3 lg:w-auto"
        >
          <div className="flex items-center gap-2">
            <LuCookie className="text-xl" />
            <h1 className="text-md">{t("cookies.title")}</h1>
          </div>
          <div className="flex lg:gap-4">
            <div className="text-xs text-balance md:text-sm md:text-wrap">
              {t("cookies.text")}
            </div>
            <button
              onClick={handleAcceptCookies}
              className="self-center rounded-md text-sm px-1 py-1 bg-secondary text-secondary-text hover:bg-secondary-darker hover:scale-105 transition-transform duration-300 ease-in-out active:scale-95 md:px-2 md:py-2 xl:px-4 xl:py-2"
            >
              {t("cookies.accept")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookiesInfo;
