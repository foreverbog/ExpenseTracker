import { useTranslation } from "react-i18next";
import { useExpensesContext } from "../hooks/useExpensesContext";
import { IoMdArrowDropdown } from "react-icons/io";

import Loading from "./Loading";
import moment from "moment";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type isDropdownOpenType = {
  month: boolean;
  year: boolean;
};

const ExpensesGrid = () => {
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

  const [t] = useTranslation("global");
  const { expenses, isLoading, expenseDate, setExpenseDate } =
    useExpensesContext();
  // console.log(expenses);
  const [isDropdownOpen, setIsDropdownOpen] = useState<isDropdownOpenType>({
    month: false,
    year: false,
  });

  const handleChangeMonth = (index: number) => {
    setExpenseDate({ ...expenseDate, month: index + 1 });
    setIsDropdownOpen((prev) => ({ ...prev, month: !prev.month }));
  };
  const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpenseDate({ ...expenseDate, year: e.target.value });
  };

  return (
    <>
      <div className=" mx-auto mt-12 0 w-1/3 flex items-center justify-evenly ">
        <div className="relative">
          <div
            className={`rounded-md p-2 border border-primary flex items-center justify-center bg-base-100 cursor-pointer  min-w-[109px] ${
              isDropdownOpen.month && " rounded-b-none"
            }`}
            onClick={() => {
              setIsDropdownOpen((prev) => ({ ...prev, month: !prev.month }));
            }}
          >
            <p>{t(`expenses.months.${months[expenseDate.month - 1]}`)}</p>
            <IoMdArrowDropdown
              className={`text-text text-lg mt-1 transition-transform duration-500 ease-in-out ${
                isDropdownOpen.month && "rotate-180"
              } `}
            />
          </div>
          <AnimatePresence>
            {isDropdownOpen.month && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto " }}
                exit={{ height: 0, transition: { duration: 0.3 } }}
                transition={{
                  type: "spring",
                  bounce: 0.3,
                }}
                className=" absolute w-full  left-0 bg-base-200 rounded-b-md border-b border-b-primary border-x border-x-primary top-full flex flex-col  divide-y divide-primary drop-shadow-2xl z-10 overflow-hidden"
              >
                {months.map((month, i) => (
                  <div
                    onClick={() => handleChangeMonth(i)}
                    className={`text-center p-2 ${
                      months[expenseDate.month - 1] === month &&
                      "bg-primary text-primary-text"
                    }`}
                  >
                    {t(`expenses.months.${month}`)}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <select
          name="year"
          id="year"
          defaultValue={expenseDate.year}
          onChange={handleChangeYear}
        >
          {years.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className=" relative border grid grid-cols-1  mx-auto mt-12 w-full xl:w-2/5 max-h-[700px] overflow-y-scroll overflow-x-hidden  ">
        {isLoading && <Loading text="Loading..." />}
        {expenses.length > 0 ? (
          <>
            <div
              className="sticky  top-0 left-0 right-0 border grid grid-cols-4 w-full divide-x text-primary-text font-semibold  bg-primary-lighter"
              style={{ gridTemplateColumns: "100px auto 150px 150px" }}
            >
              <p className=" p-4 ">{t("expenses.gridHeading.category")}</p>
              <p className=" p-4  ">{t("expenses.gridHeading.name")}</p>
              <p className=" p-4  ">{t("expenses.gridHeading.price")}</p>
              <p className=" p-4  ">{t("expenses.gridHeading.date")}</p>
            </div>
            {expenses?.map((expense) => (
              <div
                key={expense._id}
                className=" border grid grid-cols-4  w-full divide-x even:bg-base odd:bg-base-100"
                style={{ gridTemplateColumns: "100px auto 150px 150px" }}
              >
                <p className="text-center">{expense.icon}</p>
                <p>{expense.name}</p>
                <p>{expense.value}</p>
                <p className="text-ellipsis">
                  {moment(expense.date).format("DD/MM/YY")}
                  {/* {expense.date} */}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p>No expenses found</p>
        )}
      </div>
    </>
  );
};

export default ExpensesGrid;
