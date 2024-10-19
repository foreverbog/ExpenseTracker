import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExpenseType } from "./ExpensesGrid";
import { useTranslation } from "react-i18next";
import useCategoriesIcons from "../utils/categoryIcons";

type ExpenseEditModalProps = {
  expense: ExpenseType | null;
  isEditExpenseOpen: boolean;
  setIsEditExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

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

const ExpenseEditModal: React.FC<ExpenseEditModalProps> = ({
  expense,
  isEditExpenseOpen,
  setIsEditExpenseOpen,
}) => {
  const editModal = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation("global");

  const { categoryIconsExpenseEditor } = useCategoriesIcons();

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
                className={`flex items-center justify-around border border-base-300 px-3 py-2 rounded-md hover:cursor-pointer ${
                  expense?.icon === category.toLowerCase() && "bg-base-300"
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
          <form>
            <input
              className="inputStyle bg-transparent"
              placeholder="edit"
              value={expense?.name}
            />
            <input
              className="inputStyle bg-transparent"
              placeholder="edit"
              value={expense?.value}
            />
            <input
              className="inputStyle bg-transparent"
              placeholder="edit"
              value={expense?.date}
            />
            <button>Save</button>
            <button>Delete</button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExpenseEditModal;
