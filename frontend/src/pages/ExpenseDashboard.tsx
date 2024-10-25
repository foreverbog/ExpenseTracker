import { useState } from "react";
import ExpensesHeading from "../components/ExpensesHeading";
import ExpensesSubHeading from "../components/ExpensesSubHeading";
import ExpensesGrid from "../components/ExpensesGrid";
import { useTranslation } from "react-i18next";
import { MdBarChart } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import ExpenseCreator from "../components/ExpenseCreator";
import { useExpensesContext } from "../hooks/useExpensesContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useOutletContext } from "react-router-dom";
import { MenuContextType } from "../layout/MenuLayout";

const ExpenseDashboard = () => {
  const { setIsMenuOpen } = useOutletContext<MenuContextType>();
  const [t] = useTranslation("global");
  // console.log(expenses);
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);

  const [activeExpenseType, setActiveExpenseType] = useState<string>(
    t("expenses.types.daily")
  );

  const { setExpenseQueries } = useExpensesContext();

  const handleExpenseTypesSelect = (type: string) => {
    setActiveExpenseType(type);
    if (type === t("expenses.types.monthly")) {
      setExpenseQueries((prev) => ({ ...prev, type: "monthly" }));
      // console.log(expenseQueries);
    } else if (type === t("expenses.types.yearly")) {
      setExpenseQueries((prev) => ({ ...prev, type: "yearly" }));
      // console.log(expenseQueries);
    } else {
      setExpenseQueries((prev) => ({ ...prev, type: "" }));
      // console.log(expenseQueries);
    }
  };

  return (
    <div className=" relative bg-base   font-base text-base-text min-h-dvh flex flex-col overflow-hidden">
      <MdBarChart className="absolute -bottom-12 -right-12 md:-bottom-24 md:-right-12 text-[240px] md:text-[440px] opacity-20 text-base-text" />
      <div className="flex  justify-between items-center bg-primary px-4 py-6 gap-4 md:block md:pl-6 ">
        <GiHamburgerMenu
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-xl text-primary-text block md:hidden hover:cursor-pointer"
        />
        <h1 className="text-lg md:text-4xl  bg-primary text-primary-text  ">
          {t("menu.expense")}
        </h1>
      </div>
      <ExpensesHeading
        activeExpenseType={activeExpenseType}
        handleExpenseTypesSelect={handleExpenseTypesSelect}
      />
      <ExpensesSubHeading
        setIsNewExpenseOpen={setIsNewExpenseOpen}
        activeExpenseType={activeExpenseType}
      />

      <ExpensesGrid activeExpenseType={activeExpenseType} />
      <AnimatePresence>
        {isNewExpenseOpen && (
          <ExpenseCreator
            activeExpenseType={activeExpenseType}
            setIsNewExpenseOpen={setIsNewExpenseOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseDashboard;
