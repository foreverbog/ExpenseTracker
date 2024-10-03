import { useExpensesContext } from "../hooks/useExpensesContext";
import Loading from "./Loading";
const ExpensesGrid = () => {
  const { expenses, isLoading } = useExpensesContext();
  console.log(expenses);

  return (
    <div className=" relative border grid grid-cols-1  mx-auto mt-12 w-2/5  ">
      {isLoading && <Loading text="Loading..." />}
      {expenses.length > 0 ? (
        <>
          <div
            className="border grid grid-cols-4  w-full divide-x-2 "
            style={{ gridTemplateColumns: "100px auto 150px 150px" }}
          >
            <p className="text-center">Category</p>
            <p>Name</p>
            <p>Value</p>
            <p>Date</p>
          </div>
          {expenses?.map((expense) => (
            <div
              key={expense._id}
              className="relative border grid grid-cols-4  w-full divide-x even:bg-base odd:bg-base-100 "
              style={{ gridTemplateColumns: "100px auto 150px 150px" }}
            >
              <p className="text-center">{expense.icon}</p>
              <p>{expense.name}</p>
              <p>{expense.value}</p>
              <p>{expense.date}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No expenses found</p>
      )}
    </div>
  );
};

export default ExpensesGrid;
