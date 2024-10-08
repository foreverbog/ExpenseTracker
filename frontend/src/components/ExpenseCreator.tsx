import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useCategoriesIcons from "../utils/categoryIcons";
import { useTranslation } from "react-i18next";
import moment from "moment";

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

type newExpenseForm = {
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
  const { t } = useTranslation("global");

  const date = moment();
  const currentDay = date.date();
  const currentMonth = date.month();
  const currentYear = date.year();
  console.log(typeof currentDay, typeof currentMonth, typeof currentYear);
  const { categoryIconsExpenseCreator } = useCategoriesIcons();
  const [newExpenseForm, setNewExpenseForm] = useState<newExpenseForm>({
    expenseCategory: null,
    expenseName: "",
    expensePrice: "",
    expenseDay: currentDay,
    expenseMonth: currentMonth,
    expenseYear: currentYear,
  });

  const modalRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsNewExpenseOpen(false);
        if (!setIsNewExpenseOpen) {
          // setCategory(null);
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
      expenseCategory: selectedCategory,
    }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpenseForm((prev) => ({ ...prev, [name]: value }));
  };
  console.log(`The selected category is: ${newExpenseForm.expenseCategory}`);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
      <motion.div
        ref={modalRef}
        initial={{ width: "20px" }}
        animate={{ width: "auto" }}
        transition={{ duration: 0.5 }}
        exit={{ width: "20px", transition: { duration: 0.5, delay: 0.4 } }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-base-100 z-50 overflow-clip"
      >
        <motion.div
          className={`flex flex-col p-12 ${
            newExpenseForm.expenseCategory ? "gap-6" : "gap-12"
          }`}
          initial={{ height: "40px" }}
          animate={{ height: "auto" }}
          exit={{ height: "40px", transition: { duration: 0.3 } }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* //*TITLE */}
          <motion.p
            className="flex justify-center items-center text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {newExpenseForm.expenseCategory
              ? "Expense details:"
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
                className={`font-base flex flex-col justify-between  items-center flex-grow w-36 h-24 border border-base-200 rounded-md hover:bg-base-200 hover:cursor-pointer hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out ${
                  newExpenseForm.expenseCategory !== null
                    ? newExpenseForm.expenseCategory === category
                      ? "pointer-events-none border-0 duration-0"
                      : "hidden"
                    : null
                }`}
              >
                <div className="text-4xl flex flex-1 justify-center items-center ">
                  {
                    categoryIconsExpenseCreator[
                      t(`expenses.categories.${category.toLowerCase()}`)
                    ]
                  }
                </div>
                <div className="text-xl ">
                  {t(`expenses.categories.${category.toLowerCase()}`)}
                </div>
              </div>
            ))}
          </motion.div>
          {newExpenseForm.expenseCategory && (
            <motion.form
              className="text-center flex flex-col justify-center items-center  "
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-wrap gap-4 font-base">
                <input
                  onChange={handleOnChange}
                  type="text"
                  value={newExpenseForm.expenseName}
                  id="expenseName"
                  name="expenseName"
                  className="inputStyle bg-transparent flex-1 "
                  placeholder="Expense Name"
                />
                <input
                  onChange={handleOnChange}
                  type="number"
                  value={newExpenseForm.expensePrice}
                  id="expensePrice"
                  name="expensePrice"
                  className="inputStyle bg-transparent w-1/4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="Price"
                />
              </div>
              <div className="flex justify-center items-center w-1/3">
                <input
                  type="number"
                  min="1"
                  max="31"
                  onChange={handleOnChange}
                  value={newExpenseForm.expenseDay}
                  id="expenseDay"
                  name="expenseDay"
                  className="inputStyle text-center bg-transparent w-1/3  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="DD"
                  pattern="([1-9]|[12][0-9]|3[01])"
                  onBlur={(e) => {
                    const value = parseInt(e.target.value);
                    if (value < 1 || value > 31) {
                      setNewExpenseForm((prev) => ({ ...prev, expenseDay: 1 })); // Reset to a valid default
                    }
                  }}
                />
                <span className="">/</span>
                <input
                  type="number"
                  min="0"
                  onChange={handleOnChange}
                  value={newExpenseForm.expenseMonth}
                  id="expenseMonth"
                  name="expenseMonth"
                  className="inputStyle text-center bg-transparent w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="MM"
                />{" "}
                <span className="">/</span>
                <input
                  type="number"
                  min="0"
                  onChange={handleOnChange}
                  value={newExpenseForm.expenseYear}
                  id="expenseYear"
                  name="expenseYear"
                  className="inputStyle text-center bg-transparent w-1/2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="YYYY"
                />
              </div>
              <button>Add</button>
            </motion.form>
          )}

          {/* //*NEW EXPENSE FORM */}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExpenseCreator;
