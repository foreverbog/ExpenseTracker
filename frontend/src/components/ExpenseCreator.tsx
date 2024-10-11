import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useCategoriesIcons from "../utils/categoryIcons";
import { useTranslation } from "react-i18next";
import moment from "moment";
import ExpenseCreatorForm from "./ExpenseCreatorForm";
import useMediaQuery from "../hooks/useMediaQuery";

const categories: string[] = [
  "House",
  "Food",
  "Transport",
  "Clothes",
  "Health",
  "Wellness",
  "Sport",
  "Education",
  "Gift",
  "Gaming",
  "Other",
];
type ExpenseCreatorProps = {
  setIsNewExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type newExpenseFormType = {
  expenseCategory: string | null;
  expenseName: string;
  expensePrice: string;
  expenseDay: number;
  expenseMonth: number;
  expenseYear: number;
};

const ExpenseCreator: React.FC<ExpenseCreatorProps> = ({
  setIsNewExpenseOpen,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const { t } = useTranslation("global");

  const date = moment();
  const currentDay = date.date();
  const currentMonth = date.month();
  const currentYear = date.year();
  const { categoryIconsExpenseCreator } = useCategoriesIcons();
  const [newExpenseForm, setNewExpenseForm] = useState<newExpenseFormType>({
    expenseCategory: null,
    expenseName: "",
    expensePrice: "",
    expenseDay: currentDay,
    expenseMonth: currentMonth + 1,
    expenseYear: currentYear,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsNewExpenseOpen(false);
        if (!setIsNewExpenseOpen) {
          setNewExpenseForm({
            expenseCategory: null,
            expenseName: "",
            expensePrice: "",
            expenseDay: 0,
            expenseMonth: 0,
            expenseYear: 0,
          });
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsNewExpenseOpen]);

  const handleSelectCategory = (selectedCategory: string) => {
    setNewExpenseForm((prev) => ({
      ...prev,
      expenseCategory: selectedCategory.toLowerCase(),
    }));
  };

  console.log(`The selected category is: ${newExpenseForm.expenseCategory}`);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
      <motion.div
        ref={modalRef}
        initial={{ width: "20px" }}
        animate={{ width: isSmallScreen ? "350px" : "auto" }}
        transition={{ duration: 0.5 }}
        exit={{ width: "20px", transition: { duration: 0.5, delay: 0.4 } }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-base-100 z-50 overflow-clip mx-auto"
      >
        <motion.div
          className={`flex flex-col p-12 ${
            newExpenseForm.expenseCategory ? "gap-6" : "gap-12"
          }`}
          initial={{ height: "40px" }}
          animate={{ height: isSmallScreen ? "450px" : "auto" }}
          exit={{ height: "40px", transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* //*TITLE */}
          <motion.p
            className="flex justify-center items-center text-lg md:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {newExpenseForm.expenseCategory
              ? t("expenses.expenseDetail")
              : t("expenses.selectCat")}
          </motion.p>

          {/* //*DIV FOR CAT. */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {categories.map((category) => (
              <div
                onClick={() => handleSelectCategory(category)}
                key={category}
                className={`font-base flex flex-col justify-between  items-center flex-grow w-12 h-12 lg:w-36 lg:h-24 border border-base-200 rounded-md hover:bg-base-200 hover:cursor-pointer hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out ${
                  newExpenseForm.expenseCategory !== null
                    ? newExpenseForm.expenseCategory === category.toLowerCase()
                      ? "pointer-events-none border-0 duration-0"
                      : "hidden"
                    : null
                }`}
              >
                <div className="lg:text-4xl flex flex-1 justify-center items-center ">
                  {
                    categoryIconsExpenseCreator[
                      t(`expenses.categories.${category.toLowerCase()}`)
                    ]
                  }
                </div>
                <div className="text-xs font-semibold lg:text-xl ">
                  {t(`expenses.categories.${category.toLowerCase()}`)}
                </div>
              </div>
            ))}
          </motion.div>
          {newExpenseForm.expenseCategory && (
            <ExpenseCreatorForm
              setIsNewExpenseOpen={setIsNewExpenseOpen}
              setNewExpenseForm={setNewExpenseForm}
              newExpenseForm={newExpenseForm}
            />
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExpenseCreator;
