import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ExpenseType } from "./ExpensesGrid";
import { useTranslation } from "react-i18next";
import useCategoriesIcons from "../utils/categoryIcons";
import moment from "moment";
import ExpenseEditForm from "./ExpenseEditForm";

type ExpenseEditModalProps = {
  setExpenseId: React.Dispatch<React.SetStateAction<string>>;
  expense: ExpenseType | null;
  isEditExpenseOpen: boolean;
  setIsEditExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ExpenseToBeUpdatedType = {
  icon: string;
  name: string;
  value: number;
  day: number;
  month: number;
  year: number;
};

const ExpenseEditModal: React.FC<ExpenseEditModalProps> = ({
  expense,
  setExpenseId,
  setIsEditExpenseOpen,
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }

  //*Define a default expense

  const [expenseToBeUpdated, setExpenseToBeUpdated] =
    useState<ExpenseToBeUpdatedType>({
      icon: "",
      name: "",
      value: 0,
      day: 0,
      month: 0,
      year: 0,
    });

  //*Update the expense to be updated icon from the selected expense
  useEffect(() => {
    setExpenseToBeUpdated({
      icon: expense?.icon || "",
      name: expense?.name || "",
      value: expense?.value || 0,
      day: Number(moment(expense?.date).format("DD")),
      month: Number(moment(expense?.date).format("MM")),
      year: Number(moment(expense?.date).format("YYYY")),
    });
  }, [expense]);

  // *Ref for closing the modal when clicking outside
  const editModal = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation("global");

  const { categories, categoryIconsExpenseEditor } = useCategoriesIcons();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editModal.current && !editModal.current.contains(e.target as Node)) {
        setIsEditExpenseOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsEditExpenseOpen]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>

      {/* //*Main Div to animate Width */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-50 rounded-md bg-base-100 font-base"
        initial={{ width: "40px" }}
        animate={{ width: "auto" }}
        transition={{ duration: 0.5 }}
        exit={{ width: "20px", transition: { duration: 0.5, delay: 0.4 } }}
        ref={editModal}
      >
        {/* //* Div to animate Height */}
        <motion.div
          className="flex flex-col gap-12 p-12 overflow-hidden"
          initial={{ height: "40px" }}
          animate={{ height: "auto" }}
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
            {t("expenses.oneExpense.title")}
          </motion.p>

          {/* //*GRID FOR Category change */}
          <motion.div
            className="grid grid-cols-3 gap-2  justify-center items-center  mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.p
              className="col-span-3 text-center mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {t("expenses.oneExpense.categoryChange")}
            </motion.p>
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => {
                  setExpenseToBeUpdated((prev) => ({
                    ...prev,
                    icon: category.toLowerCase(),
                  }));
                }}
                className={`flex items-center justify-around border border-base-300 px-3 py-2 rounded-md hover:cursor-pointer duration-300 transition-all ease-in-out  active:scale-95 ${
                  expenseToBeUpdated.icon === category.toLowerCase() &&
                  "bg-base-300"
                }`}
              >
                <div className="size-4">
                  {
                    categoryIconsExpenseEditor[
                      t(`expenses.categories.${category?.toLowerCase()}`)
                    ]
                  }
                </div>
                <div className="text-xs">
                  {t(`expenses.categories.${category?.toLowerCase()}`)}
                </div>
              </div>
            ))}
          </motion.div>

          {/* //*FORM To update */}
          <ExpenseEditForm
            expense={expense}
            expenseToBeUpdated={expenseToBeUpdated}
            setExpenseToBeUpdated={setExpenseToBeUpdated}
            setExpenseId={setExpenseId}
            setIsEditExpenseOpen={setIsEditExpenseOpen}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExpenseEditModal;
