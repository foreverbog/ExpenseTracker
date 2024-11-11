import { useTranslation } from "react-i18next";
import { useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useExpensesContext } from "../../hooks/useExpensesContext";
import useDelete from "../../hooks/useDelete";
import usePut from "../../hooks/usePut";
import { ExpenseToBeUpdatedType } from "./ExpenseEditModal";
import Loading from "../Loading/Loading";
import { ExpenseType } from "./ExpensesGrid";

type ExpenseEditFormProps = {
  expense: ExpenseType | null;
  expenseToBeUpdated: ExpenseToBeUpdatedType;
  setExpenseToBeUpdated: React.Dispatch<
    React.SetStateAction<ExpenseToBeUpdatedType>
  >;
  setExpenseId: React.Dispatch<React.SetStateAction<string>>;
  setIsEditExpenseOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExpenseEditForm: React.FC<ExpenseEditFormProps> = ({
  expense,
  expenseToBeUpdated,
  setExpenseToBeUpdated,
  setExpenseId,
  setIsEditExpenseOpen,
}) => {
  const deployedUrl = "https://extr-backend.onrender.com";
  // const local = "http://localhost:8080";
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }

  const { user } = authContext;

  const { setExpenseQueries } = useExpensesContext();

  //* Ref for submiting the form with an button that is outside the form
  const formRef = useRef<HTMLFormElement | null>(null);

  const { t } = useTranslation("global");

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
    url: `${deployedUrl}/${user.id}/expenses/${expense?._id}`,
    setDate: setExpenseQueries,
    setIsModalOpen: setIsEditExpenseOpen,
    month: expenseToBeUpdated.month,
    year: expenseToBeUpdated.year.toString(),
  });

  //*the custom hook for updating an expense
  const { isLoading, serverError, handlePut, setServerError } = usePut({
    url: `${deployedUrl}/${user.id}/expenses/${expense?._id}`,
    formData: formDataEditExpense,
    setIsModalOpen: setIsEditExpenseOpen,
    setDate: setExpenseQueries,
  });
  // *Handle change event listener
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpenseToBeUpdated((prev) => ({ ...prev, [name]: value }));
  };

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

  return (
    <>
      {isLoading && <Loading text={t("loading")} />}

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
    </>
  );
};

export default ExpenseEditForm;
