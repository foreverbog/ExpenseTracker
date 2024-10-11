import { motion } from "framer-motion";
import { newExpenseFormType } from "./ExpenseCreator";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useExpensesContext } from "../hooks/useExpensesContext";
import usePost from "../hooks/usePost";
import Loading from "./Loading";

type ExpenseCreatorFormProps = {
  newExpenseForm: newExpenseFormType;
  setNewExpenseForm: React.Dispatch<React.SetStateAction<newExpenseFormType>>;
  setIsNewExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpenseCreatorForm: React.FC<ExpenseCreatorFormProps> = ({
  newExpenseForm,
  setNewExpenseForm,
  setIsNewExpenseOpen,
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }

  const { user } = authContext;

  const { setExpenseQueries } = useExpensesContext();

  const expenseFormData = {
    icon: newExpenseForm.expenseCategory,
    name: newExpenseForm.expenseName,
    value: newExpenseForm.expensePrice,
    date: `${newExpenseForm.expenseYear}-${newExpenseForm.expenseMonth}-${newExpenseForm.expenseDay}`,
    type: "",
    month: newExpenseForm.expenseMonth,
    year: newExpenseForm.expenseYear,
  };

  const { isLoading, serverError, handlePost } = usePost({
    url: `http://localhost:8080/${user.id}/expenses`,
    formData: expenseFormData,
    setIsModalOpen: setIsNewExpenseOpen,
    setDate: setExpenseQueries,
  });

  const { t } = useTranslation("global");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExpenseForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      onSubmit={handlePost}
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
          className="inputStyle bg-transparent flex-1 "
          placeholder="Expense Name"
        />
        <input
          onChange={handleOnChange}
          type="number"
          value={newExpenseForm.expensePrice}
          id="expensePrice"
          name="expensePrice"
          className="inputStyle bg-transparent w-1/2 md:w-1/4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Price"
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
          className="inputStyle text-center bg-transparent w-1/4  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="DD"
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
          className="inputStyle text-center bg-transparent w-1/4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
      <button className="text-xs lg:text-normal lg:px-4 py-2 bg-secondary text-secondary-text rounded-md w-1/2 mt-8 font-semibold hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out drop-shadow-xl">
        {t("expenses.addBtn")}
      </button>
    </motion.form>
  );
};

export default ExpenseCreatorForm;
