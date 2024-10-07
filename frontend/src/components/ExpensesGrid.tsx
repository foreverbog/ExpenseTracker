import { useTranslation } from "react-i18next";
import { useExpensesContext } from "../hooks/useExpensesContext";

import Loading from "./Loading";
import moment from "moment";

const ExpensesGrid = () => {
  const [t] = useTranslation("global");
  const { expenses, isLoading } = useExpensesContext();
  // console.log(expenses);

  return (
    <>
      {/* //!GRID START */}
      <div className=" relative border grid grid-cols-1  mx-auto mt-12 w-full xl:w-2/5 max-h-[700px] overflow-y-scroll overflow-x-hidden  ">
        {isLoading && <Loading text="Loading..." />}
        {expenses.length > 0 ? (
          <>
            <div
              className="sticky  top-0 left-0 right-0 border grid grid-cols-4 w-full divide-x text-primary-text font-semibold  bg-primary-lighter"
              style={{ gridTemplateColumns: "100px auto 150px 150px" }}
            >
              <p className=" p-4 ">{t("expenses.gridHeading.category")}</p>
              <p className=" p-4  ">{t("expenses.gridHeading.name")}</p>
              <p className=" p-4  ">{t("expenses.gridHeading.price")}</p>
              <p className=" p-4  ">{t("expenses.gridHeading.date")}</p>
            </div>
            {expenses?.map((expense) => (
              <div
                key={expense._id}
                className=" border grid grid-cols-4  w-full divide-x even:bg-base odd:bg-base-100 "
                style={{ gridTemplateColumns: "100px auto 150px 150px" }}
              >
                <p className="text-center">{expense.icon}</p>
                <p>{expense.name}</p>
                <p>{expense.value}</p>
                <p className="text-ellipsis">
                  {moment(expense.date).format("DD/MM/YY")}
                  {/* {expense.date} */}
                </p>
              </div>
            ))}
          </>
        ) : (
          <p>No expenses found</p>
        )}
      </div>
    </>
  );
};

export default ExpensesGrid;
