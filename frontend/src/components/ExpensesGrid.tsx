import { useTranslation } from "react-i18next";
import { useExpensesContext } from "../hooks/useExpensesContext";
import { FaRegEdit } from "react-icons/fa";
import Loading from "./Loading";
import moment from "moment";
import useCategoriesIcons from "../utils/categoryIcons";

type ExpenseGridProps = {
  activeExpenseType: string | "Daily";
};

const ExpensesGrid: React.FC<ExpenseGridProps> = ({ activeExpenseType }) => {
  const { categoryIcons } = useCategoriesIcons();
  const [t] = useTranslation("global");
  const { expenses, isLoading } = useExpensesContext();
  console.log(expenses);

  const handleEditExpense = (id: string) => {
    console.log("clicked");
    console.log(`expenseId: ${id}`);
  };

  return (
    <div className=" relative border grid grid-cols-1  mx-auto mt-12 w-full xl:w-2/5 max-h-[700px] overflow-y-scroll overflow-x-hidden  ">
      {isLoading && <Loading text="Loading..." />}
      <>
        <div
          className="sticky  top-0 left-0 right-0 border grid grid-cols-4 w-full divide-x text-primary-text font-semibold  bg-primary-lighter"
          style={{ gridTemplateColumns: "50px auto 150px 150px" }}
        >
          <p className=" p-4 ">{t("expenses.gridHeading.category")}</p>
          <p className=" p-4  ">{t("expenses.gridHeading.name")}</p>
          <p className=" p-4  ">{t("expenses.gridHeading.price")}</p>
          <p className=" p-4  ">{t("expenses.gridHeading.date")}</p>
        </div>
        {expenses?.some(
          (expense) =>
            (!expense.type &&
              activeExpenseType === t("expenses.types.daily")) ||
            (expense.type === "monthly" &&
              activeExpenseType === t("expenses.types.monthly")) ||
            (expense.type === "yearly" &&
              activeExpenseType === t("expenses.types.yearly"))
        ) ? (
          expenses.map((expense) =>
            (!expense.type &&
              activeExpenseType === t("expenses.types.daily")) ||
            (expense.type === "monthly" &&
              activeExpenseType === t("expenses.types.monthly")) ||
            (expense.type === "yearly" &&
              activeExpenseType === t("expenses.types.yearly")) ? (
              <div
                key={expense._id}
                className="relative grid grid-cols-4  w-full divide-x even:bg-base odd:bg-base-100 hover:cursor-pointer group"
                style={{ gridTemplateColumns: "50px auto 150px 150px" }}
              >
                <div
                  onClick={() => handleEditExpense(expense._id)}
                  className="absolute w-full h-full  hover:bg-base-300  hover:cursor-pointer opacity-60 group flex justify-center items-center"
                >
                  <div className="hidden group-hover:block text-xl text-primary">
                    <FaRegEdit />
                  </div>
                </div>
                <div className="flex items-center justify-center  p-2 text-2xl text-base-text">
                  {categoryIcons[t(`expenses.categories.${expense.icon}`)]}
                </div>
                <p className="text-lg flex justify-start items-center pl-4 p-2 z">
                  {expense.name}
                </p>
                <p className="flex justify-start items-center pl-4 p-2 ">
                  {expense.value}
                </p>
                <p className="flex justify-start items-center pl-4 p-2 ">
                  {!expense.type && moment(expense.date).format("DD/MM/YY")}
                  {expense.type === "monthly" &&
                    moment(expense.date).format("DD")}
                  {expense.type === "yearly" &&
                    moment(expense.date).format("MMM")}
                </p>
              </div>
            ) : null
          )
        ) : (
          <p className="h-[250px] flex justify-center items-center font-base text-2xl">
            {t("expenses.notFound")}
          </p>
        )}
      </>
    </div>
  );
};

export default ExpensesGrid;
