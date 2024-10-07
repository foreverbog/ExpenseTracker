import { useState } from "react";
import ExpensesHeading from "../components/ExpensesHeading";
import ExpensesSubHeading from "../components/ExpensesSubHeading";
import ExpensesGrid from "../components/ExpensesGrid";
import { useTranslation } from "react-i18next";
import { MdBarChart } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import ExpenseCreator from "../components/ExpenseCreator";

const ExpenseDashboard = () => {
  const [t] = useTranslation("global");
  // console.log(expenses);
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);

  const [activeExpenseType, setActiveExpenseType] = useState<string>(
    t("expenses.types.daily")
  );

  const handleExpenseTypesSelect = (type: string) => {
    setActiveExpenseType(type);
  };

  return (
    <div className=" relative bg-base   font-base text-base-text min-h-dvh flex flex-col overflow-hidden">
      <MdBarChart className="absolute -bottom-12 -right-12 md:-bottom-24 md:-right-12 text-[240px] md:text-[440px] opacity-20 text-base-text" />
      <h1 className="text-4xl py-6 pl-6 bg-primary text-primary-text">
        {t("menu.expense")}
      </h1>
      <ExpensesHeading
        activeExpenseType={activeExpenseType}
        handleExpenseTypesSelect={handleExpenseTypesSelect}
      />
      <ExpensesSubHeading setIsNewExpenseOpen={setIsNewExpenseOpen} />

      <ExpensesGrid activeExpenseType={activeExpenseType} />
      <AnimatePresence>
        {isNewExpenseOpen && (
          <ExpenseCreator setIsNewExpenseOpen={setIsNewExpenseOpen} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseDashboard;
