import { useEffect, useRef, useState, useContext } from "react";
import { useExpensesContext } from "../hooks/useExpensesContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { ExpenseType } from "./ExpensesGrid";
import { useTranslation } from "react-i18next";
import useCategoriesIcons from "../utils/categoryIcons";
import moment from "moment";
import usePut from "../hooks/usePut";
import Loading from "./Loading";
import useDelete from "../hooks/useDelete";

type ExpenseEditModalProps = {
  setExpenseId: React.Dispatch<React.SetStateAction<string>>;
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

type ExpenseToBeUpdatedType = {
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

  const { user } = authContext;

  const { setExpenseQueries } = useExpensesContext();

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

  //*Form needed to updated the expense
  const formDataEditExpense = {
    icon: expenseToBeUpdated.icon,
    name: expenseToBeUpdated.name,
    value: expenseToBeUpdated.value,
    date: `${expenseToBeUpdated.year}-${expenseToBeUpdated.month}-${expenseToBeUpdated.day}`,
    month: expenseToBeUpdated.month,
    year: expenseToBeUpdated.year.toString(),
  };

  //* the custom hook for deleting an expense
  const { handleDelete } = useDelete({
    url: `http://localhost:8080/${user.id}/expenses/${expense?._id}`,
    setDate: setExpenseQueries,
    setIsModalOpen: setIsEditExpenseOpen,
    month: expenseToBeUpdated.month,
    year: expenseToBeUpdated.year.toString(),
  });

  //*the custom hook for updating an expense
  const { isLoading, serverError, handlePut, setServerError } = usePut({
    url: `http://localhost:8080/${user.id}/expenses/${expense?._id}`,
    formData: formDataEditExpense,
    setIsModalOpen: setIsEditExpenseOpen,
    setDate: setExpenseQueries,
  });
  // *Handle change event listener
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseToBeUpdated((prev) => ({ ...prev, [name]: value }));
  };

  // //*Handle delete Expense
  // const handleDeleteExpense = () => {};

  // *Handle submiting the updated expense
  const handleUpdateExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setExpenseQueries((prev) => ({ ...prev, month: 1, year: "" }));
    if (!expenseToBeUpdated.name) {
      setServerError(t("expenses.errors.name"));
    } else if (!expenseToBeUpdated.value) {
      setServerError(t("expenses.errors.price"));
    } else if (
      !expenseToBeUpdated.day ||
      !expenseToBeUpdated.month ||
      !expenseToBeUpdated.year
    ) {
      setServerError(t("expenses.errors.date"));
    } else {
      setExpenseQueries((prev) => ({
        ...prev,
        month: expenseToBeUpdated.month,
        year: expenseToBeUpdated.year.toString(),
      }));
      handlePut(e);
      setExpenseId("");
    }
  };

  // *Ref for closing the modal when clicking outside
  const editModal = useRef<HTMLDivElement | null>(null);
  //* Ref for submiting the form with an button that is outside the form
  const formRef = useRef<HTMLFormElement | null>(null);

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
        {isLoading && <Loading text={t("loading")} />}
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
          <form
            ref={formRef}
            className="flex flex-col justify-center items-center gap-4"
            onSubmit={handleUpdateExpense}
          >
            {serverError && (
              <p className="text-red-500 font-semibold text-balance text-center text-lg">
                {serverError}
              </p>
            )}
            <div className="flex flex-wrap justify-center items-center  gap-4 font-base ">
              <input
                className={`inputStyle bg-transparent flex-1 ${
                  serverError === t("expenses.errors.name") &&
                  "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                } `}
                value={expenseToBeUpdated.name}
                onChange={handleChange}
                type="text"
                id="name"
                name="name"
                placeholder={t("placeholders.expenseName")}
              />
              <input
                className={`inputStyle bg-transparent w-1/2 md:w-1/4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  serverError === t("expenses.errors.price") &&
                  "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                }`}
                value={expenseToBeUpdated.value}
                onChange={handleChange}
                type="number"
                id="value"
                name="value"
                placeholder={t("placeholders.price")}
              />
            </div>
            <div className="flex justify-center items-center lg:w-1/2 mx-auto">
              <input
                className={`inputStyle bg-transparent w-1/2 md:w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  serverError === t("expenses.errors.date") &&
                  "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                }`}
                value={expenseToBeUpdated.day}
                onChange={handleChange}
                type="number"
                min="1"
                max="31"
                id="day"
                name="day"
                placeholder={t("placeholders.DD")}
              />
              <span className="">/</span>

              <input
                className={`inputStyle bg-transparent w-1/2 md:w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  serverError === t("expenses.errors.date") &&
                  "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                }`}
                value={expenseToBeUpdated.month}
                onChange={handleChange}
                type="number"
                min="1"
                max="12"
                id="month"
                name="month"
                placeholder={t("placeholders.MM")}
              />
              <span className="">/</span>

              <input
                className={`inputStyle bg-transparent w-1/2 md:w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  serverError === t("expenses.errors.date") &&
                  "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
                }`}
                value={expenseToBeUpdated.year}
                onChange={handleChange}
                type="number"
                min="1980"
                max="2100"
                id="year"
                name="year"
                placeholder={t("placeholders.YYYY")}
              />
            </div>
          </form>
          <div className="flex justify-around mt-6 w-full ">
            <button
              onClick={() => {
                formRef.current?.requestSubmit();
              }}
              className="text-xs lg:text-normal px-4 py-2 bg-secondary
              text-secondary-text rounded-md  mt-8 font-semibold
              hover:scale-105 active:scale-95 transition-transform duration-300
              ease-in-out drop-shadow-xl"
            >
              {t("update")}
            </button>
            <button
              onClick={handleDelete}
              className="text-xs lg:text-normal px-4 py-2 
               rounded-md  mt-8 font-semibold
              hover:scale-105 active:scale-95 transition-transform duration-300
              ease-in-out drop-shadow-xl bg-red-700 hover:bg-red-800 text-base"
            >
              {t("delete")}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ExpenseEditModal;
