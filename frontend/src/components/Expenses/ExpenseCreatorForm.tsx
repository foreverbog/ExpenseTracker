import { motion } from "framer-motion";
import { newExpenseFormType } from "./ExpenseCreator";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useExpensesContext } from "../../hooks/useExpensesContext";
import usePost from "../../hooks/usePost";
import Loading from "../Loading/Loading";

type ExpenseCreatorFormProps = {
  activeExpenseType: string;
  newExpenseForm: newExpenseFormType;
  setNewExpenseForm: React.Dispatch<React.SetStateAction<newExpenseFormType>>;
  setIsNewExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpenseCreatorForm: React.FC<ExpenseCreatorFormProps> = ({
  activeExpenseType,
  newExpenseForm,
  setNewExpenseForm,
  setIsNewExpenseOpen,
}) => {
  const API_URL: string = import.meta.env.VITE_API_SERVER;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }

  const { user } = authContext;
  const { t } = useTranslation("global");

  const { setExpenseQueries } = useExpensesContext();

  const expenseFormData = {
    icon: newExpenseForm.expenseCategory,
    name: newExpenseForm.expenseName,
    value: newExpenseForm.expensePrice,
    date: `${newExpenseForm.expenseYear}-${newExpenseForm.expenseMonth}-${newExpenseForm.expenseDay}`,
    type:
      activeExpenseType === t("expenses.types.daily")
        ? ""
        : activeExpenseType === t("expenses.types.monthly")
        ? "monthly"
        : activeExpenseType === t("expenses.types.yearly") && "yearly",
    month: newExpenseForm.expenseMonth,
    year: newExpenseForm.expenseYear,
  };

  const { isLoading, serverError, setServerError, handlePost } = usePost({
    url: `${API_URL}/${user.id}/expenses`,
    formData: expenseFormData,
    setIsModalOpen: setIsNewExpenseOpen,
    setDate: setExpenseQueries,
    successMessage: t("toasters.create", { feature: t("expense") }),
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpenseForm((prev) => ({ ...prev, [name]: value }));
  };

  //*the function to update the expense, and setting the error for every specific field
  const handleUpdateExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newExpenseForm.expenseName) {
      setServerError(t("expenses.errors.name"));
    } else if (!newExpenseForm.expensePrice) {
      setServerError(t("expenses.errors.price"));
    } else if (
      !newExpenseForm.expenseDay ||
      !newExpenseForm.expenseMonth ||
      !newExpenseForm.expenseYear
    ) {
      setServerError(t("expenses.errors.date"));
    } else {
      handlePost(e);
    }
  };

  return (
    <motion.form
      onSubmit={handleUpdateExpense}
      className="text-center flex flex-col justify-center items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {isLoading && <Loading text={t("loading")} />}
      <p className="text-red-500 font-semibold text-balance text-center text-lg">
        {serverError}
      </p>
      <div className="flex flex-wrap justify-center items-center  gap-4 font-base w-full">
        <input
          onChange={handleOnChange}
          type="text"
          value={newExpenseForm.expenseName}
          id="expenseName"
          name="expenseName"
          className={`inputStyle bg-transparent flex-1 ${
            serverError === t("expenses.errors.name") &&
            "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
          }`}
          placeholder={t("placeholders.expenseName")}
        />
        <input
          onChange={handleOnChange}
          type="number"
          value={newExpenseForm.expensePrice}
          id="expensePrice"
          name="expensePrice"
          className={`inputStyle text-center bg-transparent w-1/2 md:w-1/4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            serverError === t("expenses.errors.price") &&
            "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
          }`}
          placeholder={t("placeholders.price")}
        />
      </div>
      <div className="flex justify-center items-center lg:w-1/2">
        <input
          type="number"
          min="1"
          max="31"
          onChange={handleOnChange}
          value={newExpenseForm.expenseDay}
          id="expenseDay"
          name="expenseDay"
          className={`inputStyle bg-transparent w-1/2 md:w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            serverError === t("expenses.errors.date") &&
            "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
          }`}
          placeholder={t("placeholders.DD")}
          pattern="([1-9]|[12][0-9]|3[01])"
        />
        <span className="">/</span>
        <input
          type="number"
          min="0"
          onChange={handleOnChange}
          value={newExpenseForm.expenseMonth}
          id="expenseMonth"
          name="expenseMonth"
          className={`inputStyle bg-transparent w-1/2 md:w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            serverError === t("expenses.errors.date") &&
            "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
          }`}
          placeholder={t("placeholders.MM")}
        />{" "}
        <span className="">/</span>
        <input
          type="number"
          min="0"
          onChange={handleOnChange}
          value={newExpenseForm.expenseYear}
          id="expenseYear"
          name="expenseYear"
          className={`inputStyle bg-transparent w-1/2 md:w-1/4 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            serverError === t("expenses.errors.date") &&
            "border-b-red-500 animate-[wiggle_0.3s_ease-in-out]"
          }`}
          placeholder={t("placeholders.YYYY")}
        />
      </div>
      <button className="text-xs lg:text-normal lg:px-4 py-2 bg-secondary text-secondary-text rounded-md w-1/2 mt-8 font-semibold hover:scale-105 hover:bg-secondary-darker active:scale-95 transition-transform duration-300 ease-in-out drop-shadow-xl">
        {t("expenses.addBtn")}
      </button>
    </motion.form>
  );
};

export default ExpenseCreatorForm;
