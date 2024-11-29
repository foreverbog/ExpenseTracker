import { useState } from "react";
import { useExpensesContext } from "../../hooks/useExpensesContext";
import moment from "moment";
import { IoMdArrowDropdown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../hooks/useMediaQuery";
import AddBtn from "../Common/AddBtn";

type isDropdownOpenType = {
  month: boolean;
  year: boolean;
};

const months = moment.months();
const years = [
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
];

type ExpensesSubHeadingProps = {
  setIsNewExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeExpenseType: string;
};

const ExpensesSubHeading: React.FC<ExpensesSubHeadingProps> = ({
  setIsNewExpenseOpen,
  activeExpenseType,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const { t } = useTranslation("global");
  const { expenseQueries, setExpenseQueries } = useExpensesContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState<isDropdownOpenType>({
    month: false,
    year: false,
  });
  const handleChangeMonth = (index: number) => {
    setExpenseQueries({ ...expenseQueries, month: index + 1 });
    setIsDropdownOpen((prev) => ({ month: !prev.month, year: false }));
  };
  const handleChangeYear = (year: string) => {
    setExpenseQueries({ ...expenseQueries, year: year });
    setIsDropdownOpen((prev) => ({ month: false, year: !prev.year }));
  };

  return (
    <div>
      <div className=" mx-auto mt-12 0 w-4/5 xl:w-2/5 flex items-center justify-between ">
        <div className="flex gap-4 items-center justify-center">
          {/* //*Year Dropdown */}
          <div className="relative">
            <div
              className={` rounded-md p-1 md:p-1.5 border border-primary flex items-center justify-center bg-base-100 cursor-pointer  w-[80px] md:min-w-[109px] text-xs md:text-normal ${
                isDropdownOpen.year && " rounded-b-none"
              }`}
              onClick={() => {
                setIsDropdownOpen((prev) => ({
                  month: false,
                  year: !prev.year,
                }));
              }}
            >
              <p>{expenseQueries.year}</p>
              <IoMdArrowDropdown
                className={`text-text text-xs md:text-lg mt-1 transition-transform duration-500 ease-in-out ${
                  isDropdownOpen.year && "rotate-180"
                } `}
              />
            </div>
            <AnimatePresence>
              {isDropdownOpen.year && !isDropdownOpen.month && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: isSmallScreen ? "200px" : "300px",
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
                  {years.map((year) => (
                    <div
                      key={year}
                      onClick={() => handleChangeYear(year)}
                      className={`text-center p-1 md:p-1.5 cursor-pointer hover:bg-base-300 transition-colors duration-300 ease-in-out text-xs md:text-normal ${
                        expenseQueries.year === year &&
                        "bg-primary text-primary-text hover:bg-primary"
                      }`}
                    >
                      {year}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* //*Month Dropdown */}
          <div className="relative">
            <div
              className={` ${
                (activeExpenseType === t("expenses.types.monthly") ||
                  activeExpenseType === t("expenses.types.yearly")) &&
                "hidden"
              } rounded-md p-1 md:p-1.5 border border-primary flex items-center justify-center bg-base-100 cursor-pointer  w-[80px] md:min-w-[109px] text-xs md:text-normal ${
                isDropdownOpen.month && " rounded-b-none"
              }`}
              onClick={() => {
                setIsDropdownOpen((prev) => ({
                  month: !prev.month,
                  year: false,
                }));
              }}
            >
              <p>{t(`expenses.months.${months[expenseQueries.month - 1]}`)}</p>
              <IoMdArrowDropdown
                className={`text-text text-xs md:text-lg mt-1 transition-transform duration-500 ease-in-out ${
                  isDropdownOpen.month && "rotate-180"
                } `}
              />
            </div>
            <AnimatePresence>
              {isDropdownOpen.month && !isDropdownOpen.year && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height: isSmallScreen ? "200px" : "300px",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                  }}
                  exit={{ height: 0, transition: { duration: 0.3 } }}
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                  }}
                  className=" absolute w-full  left-0 bg-base-200 rounded-b-md border-b border-b-primary border-x border-x-primary top-full flex flex-col  divide-y divide-primary drop-shadow-2xl z-50 overflow-hidden"
                >
                  {months.map((month, i) => (
                    <div
                      key={month + i}
                      onClick={() => handleChangeMonth(i)}
                      className={`text-center p-1 md:p-1.5 cursor-pointer hover:bg-base-300 transition-colors duration-300 ease-in-out text-xs md:text-normal ${
                        months[expenseQueries.month - 1] === month &&
                        "bg-primary text-primary-text hover:bg-primary"
                      }`}
                    >
                      {t(`expenses.months.${month}`)}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/*//* Add Button */}
        <button onClick={() => setIsNewExpenseOpen((prev) => !prev)}>
          <AddBtn btnText={t("expenses.new")} />
        </button>
      </div>
    </div>
  );
};

export default ExpensesSubHeading;
