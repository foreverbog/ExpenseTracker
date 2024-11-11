import { useTranslation } from "react-i18next";
import { useExpensesContext } from "../../hooks/useExpensesContext";
import { FaRegEdit } from "react-icons/fa";
import Loading from "../Loading/Loading";
import moment from "moment";
import useCategoriesIcons from "../../utils/categoryIcons";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useContext, useState } from "react";
import ExpenseEditModal from "./ExpenseEditModal";
import { AnimatePresence } from "framer-motion";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

type ExpenseGridProps = {
  activeExpenseType: string | "Daily";
};

export type ExpenseType = {
  _id: string;
  icon: string;
  name: string;
  type: "" | "monthly" | "yearly";
  value: number;
  date: string;
  day: string;
  month: string;
  year: string;
};

const ExpensesGrid: React.FC<ExpenseGridProps> = ({ activeExpenseType }) => {
  const deployedUrl = "https://extr-backend.onrender.com";
  // const local = "http://localhost:8080";

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }
  const { user } = authContext;

  const { categoryIcons } = useCategoriesIcons();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [t] = useTranslation("global");

  //*State for Modal open/closed
  const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);

  //*State to store the expenseID
  const [expenseId, setExpenseId] = useState<string>("");

  //* useFetch hook, custom hook for making get requests
  const { apiData: expense } = useFetch<ExpenseType>(
    `${expenseId && `${deployedUrl}/${user.id}/expenses/${expenseId}`}`
  );
  // console.log(expense);

  //* Destructure from expenseContext
  const { expenses, isLoading, setExpenseQueries, expenseQueries } =
    useExpensesContext();
  // console.log(expenses);

  //* Open Edit Modal
  const handleEditExpense = (id: string) => {
    // console.log("clicked");
    // console.log(`expenseId: ${id}`);
    setIsEditExpenseOpen(true);
    setExpenseId(id);
  };
  // console.log(expense);

  const handleSort = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.textContent === t("expenses.gridHeading.price")) {
      setExpenseQueries((prev) => ({
        ...prev,
        order: expenseQueries.order === "asc" ? "desc" : "asc",
        sortBy: "value",
      }));
    } else {
      setExpenseQueries((prev) => ({
        ...prev,
        order: expenseQueries.order === "asc" ? "desc" : "asc",
        sortBy: "date",
      }));
    }
  };

  return (
    <>
      <AnimatePresence>
        {isEditExpenseOpen && (
          <ExpenseEditModal
            setExpenseId={setExpenseId}
            expense={expense}
            isEditExpenseOpen={isEditExpenseOpen}
            setIsEditExpenseOpen={setIsEditExpenseOpen}
          />
        )}
      </AnimatePresence>
      <div
        className=" relative border grid grid-cols-1  mx-auto mt-12  md:w-auto  xl:w-3/5 max-h-[500px] overflow-y-scroll overflow-x-hidden "
        style={{ scrollbarWidth: "thin" }}
      >
        {isLoading && <Loading text={t("loading")} />}
        <>
          <div
            className="sticky top-0 left-0 right-0 border grid grid-cols-4 w-full divide-x text-primary-text font-semibold  bg-primary-lighter  z-20 text-xs "
            style={{
              gridTemplateColumns: isSmallScreen
                ? "40px 100px 80px 80px"
                : "50px auto 150px 150px",
            }}
          >
            <div className=" py-4 px-1 md:p-4  ">
              {t("expenses.gridHeading.category")}
            </div>
            <div className=" py-4 px-1 md:p-4  ">
              {t("expenses.gridHeading.name")}
            </div>
            <div
              onClick={handleSort}
              className="py-4 px-1  md:p-4 hover:cursor-pointer flex justify-between items-center"
            >
              <div>{t("expenses.gridHeading.price")}</div>
              {expenseQueries.order === "desc" &&
              expenseQueries.sortBy === "value" ? (
                <FaSortAmountUp />
              ) : (
                <FaSortAmountDown
                  className={`${
                    expenseQueries.sortBy !== "value" && "opacity-50"
                  }`}
                />
              )}
            </div>
            <div
              onClick={handleSort}
              className="py-4 px-1 md:p-4 hover:cursor-pointer flex justify-between items-center  "
            >
              <div>{t("expenses.gridHeading.date")}</div>
              {expenseQueries.order === "desc" &&
              expenseQueries.sortBy === "date" ? (
                <FaSortAmountUp />
              ) : (
                <FaSortAmountDown
                  className={`${
                    expenseQueries.sortBy !== "date" && "opacity-50"
                  }`}
                />
              )}
            </div>
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
                  style={{
                    gridTemplateColumns: isSmallScreen
                      ? "40px 100px 80px 80px"
                      : "50px auto 150px 150px",
                  }}
                >
                  <div
                    onClick={() => handleEditExpense(expense._id)}
                    className="absolute w-full h-full  hover:bg-base-300  hover:cursor-pointer opacity-60 group flex justify-center items-center"
                  >
                    <div className="hidden group-hover:block text-xl text-primary">
                      <FaRegEdit />
                    </div>
                  </div>
                  <div className="flex items-center justify-center text-lg md:p-2 md:text-2xl text-base-text ">
                    {categoryIcons[t(`expenses.categories.${expense.icon}`)]}
                  </div>
                  <p className=" p-1 text-md md:text-lg flex justify-start items-center md:pl-4 md:p-2 truncate ">
                    {expense.name}
                  </p>
                  <p className="p-1 text-md md:text-lg flex justify-start items-center md:pl-4 md:p-2  ">
                    {expense.value}
                  </p>
                  <p className="p-1 text-md md:text-lg flex justify-start items-center md:pl-4 md:p-2  ">
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
    </>
  );
};

export default ExpensesGrid;
